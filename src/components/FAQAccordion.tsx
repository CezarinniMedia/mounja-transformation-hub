import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, index) => (
        <div
          key={index}
          className="bg-card rounded-xl border border-border overflow-hidden"
        >
          <button
            onClick={() => toggleItem(index)}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-surface/50 transition-colors"
          >
            <span className="font-medium text-foreground pr-4">{item.question}</span>
            <ChevronDown
              className={cn(
                "w-5 h-5 text-muted-foreground transition-transform duration-200 flex-shrink-0",
                openIndex === index && "rotate-180"
              )}
            />
          </button>
          
          <div
            className={cn(
              "overflow-hidden transition-all duration-300",
              openIndex === index ? "max-h-96" : "max-h-0"
            )}
          >
            <div className="px-4 pb-4 text-muted-foreground">
              {item.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
