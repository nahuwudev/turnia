import { MyEvent } from "@/lib/rbc";
import { format } from "date-fns";
import { View } from "react-big-calendar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Componente para eventos en vistas de Semana y Día (detallado)
export const DetailedEvent = ({ event }: { event: MyEvent }) => {
  const { title, categorie, start, end } = event;
  const colors = {
    terapia: "bg-blue-100",
    consulta: "bg-red-100",
  };
  const className =
    "rounded-none border-l-4 p-2 space-y-1 border-l-blue-600 h-full text-blue-600 " +
    colors[categorie];
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={className}>
            <h3 className="font-bold text-sm">{title}</h3>
            <p className="text-blue-500 text-xs">
              {format(start, "HH:mm")} - {format(end, "HH:mm")}
            </p>
            <p className="text-gray-500 text-xs">{categorie}</p>
          </div>
        </TooltipTrigger>
        <TooltipContent className="space-y-2">
          <p className="capitalize">
            {title} - {categorie}
          </p>
          <p>
            {format(start, "HH:mm")} - {format(end, "HH:mm")}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

// Componente para eventos en la vista de Mes (compacto)
export const MonthEvent = ({ event }: { event: MyEvent }) => {
  const { title, categorie } = event;
  const colors = {
    terapia: "bg-blue-100",
    consulta: "bg-red-100",
  };
  return (
    <div
      className={`border-l-blue-600 text-blue-600 p-1 text-xs font-bold truncate ${colors[categorie]}`}
    >
      {title + "-" + categorie}
    </div>
  );
};

// Componente envolvente que decide qué componente de evento usar
export const EventWrapper = ({
  event,
  currentView,
}: {
  event: MyEvent;
  currentView: View;
}) => {
  if (currentView === "month") {
    return <MonthEvent event={event} />;
  }
  return <DetailedEvent event={event} />;
};
