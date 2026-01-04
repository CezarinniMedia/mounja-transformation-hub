import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { AppHeader } from '../components/AppHeader';
import { BottomNav } from '../components/BottomNav';
import { useApp } from '../context/AppContext';
import { format, subDays, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const filterOptions = [
  { label: '7 dias', days: 7 },
  { label: '14 dias', days: 14 },
  { label: '30 dias', days: 30 },
  { label: 'Todos', days: 365 },
];

export function Historico() {
  const navigate = useNavigate();
  const { profile, checkins, weightLost, calculateStreak } = useApp();
  const [filterDays, setFilterDays] = useState(30);

  const filteredCheckins = useMemo(() => {
    const cutoff = subDays(new Date(), filterDays);
    return checkins
      .filter(c => parseISO(c.data) >= cutoff)
      .sort((a, b) => parseISO(a.data).getTime() - parseISO(b.data).getTime());
  }, [checkins, filterDays]);

  const chartData = useMemo(() => {
    return filteredCheckins.map(c => ({
      date: format(parseISO(c.data), 'dd/MM'),
      peso: c.peso,
      fullDate: c.data,
    }));
  }, [filteredCheckins]);

  const stats = useMemo(() => {
    if (filteredCheckins.length === 0) return null;

    const weights = filteredCheckins.map(c => c.peso);
    const firstWeight = weights[0];
    const lastWeight = weights[weights.length - 1];
    const totalLost = firstWeight - lastWeight;
    const avgPerDay = filteredCheckins.length > 1 ? totalLost / (filteredCheckins.length - 1) : 0;
    
    const protocolItems = filteredCheckins.reduce((acc, c) => {
      return acc + [c.infusao, c.cafe, c.esperou_30min, c.agua_2l].filter(Boolean).length;
    }, 0);
    const adherence = (protocolItems / (filteredCheckins.length * 4)) * 100;

    return {
      totalLost,
      avgPerDay,
      daysRegistered: filteredCheckins.length,
      adherence,
    };
  }, [filteredCheckins]);

  const projection = useMemo(() => {
    if (!profile || checkins.length < 3) return null;
    
    const currentWeight = checkins[0]?.peso || profile.peso_inicial;
    const toGoal = currentWeight - profile.meta_peso;
    
    if (toGoal <= 0) return { reached: true };
    
    const avgLoss = weightLost / Math.max(checkins.length, 1);
    if (avgLoss <= 0) return null;
    
    const daysToGoal = Math.ceil(toGoal / avgLoss);
    return { daysToGoal };
  }, [profile, checkins, weightLost]);

  const humorEmojis = ['', '😫', '😐', '🙂', '😊', '🤩'];

  return (
    <div className="min-h-screen bg-background pb-20">
      <AppHeader title="Seu Progresso" showBack />

      <div className="max-w-lg mx-auto px-6 py-6 space-y-6">
        {/* Filter */}
        <div className="flex gap-2">
          {filterOptions.map(opt => (
            <button
              key={opt.days}
              onClick={() => setFilterDays(opt.days)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterDays === opt.days
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-surface text-muted-foreground'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Stats Card */}
        {stats && (
          <div className="bg-surface rounded-2xl p-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Total perdido</p>
                <p className={`text-2xl font-bold ${stats.totalLost > 0 ? 'text-primary' : 'text-foreground'}`}>
                  {stats.totalLost > 0 ? '-' : ''}{Math.abs(stats.totalLost).toFixed(1)} kg
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Média/dia</p>
                <p className="text-2xl font-bold text-foreground">
                  {stats.avgPerDay.toFixed(2)} kg
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Dias registrados</p>
                <p className="text-2xl font-bold text-foreground">{stats.daysRegistered}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Aderência</p>
                <p className="text-2xl font-bold text-foreground">{stats.adherence.toFixed(0)}%</p>
              </div>
            </div>
          </div>
        )}

        {/* Chart */}
        {chartData.length > 0 && (
          <div className="bg-surface rounded-2xl p-5">
            <h3 className="text-sm font-medium text-foreground mb-4">Evolução do peso</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <XAxis 
                    dataKey="date" 
                    stroke="#666" 
                    fontSize={10}
                    tickLine={false}
                  />
                  <YAxis 
                    domain={['dataMin - 1', 'dataMax + 1']}
                    stroke="#666" 
                    fontSize={10}
                    tickLine={false}
                    width={40}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1a1a1a', 
                      border: '1px solid #333',
                      borderRadius: '8px'
                    }}
                    labelStyle={{ color: '#fff' }}
                  />
                  {profile && (
                    <ReferenceLine 
                      y={profile.meta_peso} 
                      stroke="#f39c12" 
                      strokeDasharray="5 5"
                      label={{ value: 'Meta', fill: '#f39c12', fontSize: 10 }}
                    />
                  )}
                  <Line 
                    type="monotone" 
                    dataKey="peso" 
                    stroke="#2ecc71" 
                    strokeWidth={2}
                    dot={{ fill: '#2ecc71', strokeWidth: 0, r: 4 }}
                    activeDot={{ r: 6, fill: '#2ecc71' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Projection */}
        {projection && !projection.reached && projection.daysToGoal && (
          <div className="bg-surface rounded-2xl p-5 border-l-4 border-primary">
            <p className="text-sm text-muted-foreground mb-1">Se continuar assim...</p>
            <p className="text-foreground">
              Você atinge sua meta em aproximadamente{' '}
              <span className="text-primary font-bold">{projection.daysToGoal} dias</span>
            </p>
          </div>
        )}

        {projection?.reached && (
          <div className="bg-surface rounded-2xl p-5 border-l-4 border-warning">
            <p className="text-lg font-bold text-warning">🎉 Parabéns!</p>
            <p className="text-foreground">Você atingiu sua meta!</p>
          </div>
        )}

        {/* History List */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Registros</h3>
          {[...filteredCheckins].reverse().map((checkin, i, arr) => {
            const prevCheckin = arr[i + 1];
            const diff = prevCheckin ? prevCheckin.peso - checkin.peso : 0;
            const protocolCount = [checkin.infusao, checkin.cafe, checkin.esperou_30min, checkin.agua_2l].filter(Boolean).length;

            return (
              <div key={checkin.id} className="bg-surface rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-foreground">
                    {format(parseISO(checkin.data), "EEEE, d 'de' MMMM", { locale: ptBR })}
                  </p>
                  {checkin.humor && (
                    <span className="text-lg">{humorEmojis[checkin.humor]}</span>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-xl font-bold text-foreground">{checkin.peso.toFixed(1)} kg</p>
                  {diff !== 0 && (
                    <span className={`text-sm font-medium ${diff > 0 ? 'text-primary' : 'text-warning'}`}>
                      {diff > 0 ? '📉 -' : '📈 +'}{Math.abs(diff).toFixed(1)} kg
                    </span>
                  )}
                  <span className="text-xs text-muted-foreground">
                    {protocolCount}/4 protocolo
                  </span>
                </div>
                {checkin.anotacao && (
                  <p className="text-sm text-muted-foreground mt-2 italic">
                    "{checkin.anotacao}"
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {filteredCheckins.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Nenhum registro neste período</p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
