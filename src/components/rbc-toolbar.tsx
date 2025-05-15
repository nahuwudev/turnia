import { ToolbarProps } from "react-big-calendar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback } from "react";
import { format, isSameDay } from "date-fns";
import { es } from "date-fns/locale/es";
import { MyEvent } from "@/lib/rbc";

export const CustomToolbar = ({
  date,
  onNavigate,
  onView,
  view,
}: ToolbarProps<MyEvent, object>) => {
  const goToBack = useCallback(() => onNavigate("PREV"), [onNavigate]);
  const goToNext = useCallback(() => onNavigate("NEXT"), [onNavigate]);
  const goToToday = useCallback(() => onNavigate("TODAY"), [onNavigate]);
  const goToMonth = useCallback(() => onView("month"), [onView]);
  const goToWeek = useCallback(() => onView("week"), [onView]);
  const goToDay = useCallback(() => onView("day"), [onView]);

  const monthYear = format(date, "MMMM yyyy", { locale: es });
  const isToday = isSameDay(date, new Date());

  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-4 p-2">
      <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
        <span className="text-lg font-semibold capitalize">{monthYear}</span>
        <div className="flex space-x-2">
          <button
            onClick={goToBack}
            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            <ChevronLeft strokeWidth={1} />
          </button>
          <button
            onClick={goToNext}
            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            <ChevronRight strokeWidth={1} />
          </button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mt-2 md:mt-0">
        <button
          onClick={goToToday}
          className={`px-3 py-1 rounded ${
            isToday ? "bg-blue-200 text-blue-700" : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Hoy
        </button>
        <button
          onClick={goToMonth}
          className={`px-3 py-1 rounded ${
            view === "month"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Mes
        </button>
        <button
          onClick={goToWeek}
          className={`px-3 py-1 rounded ${
            view === "week"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Semana
        </button>
        <button
          onClick={goToDay}
          className={`px-3 py-1 rounded ${
            view === "day"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Día
        </button>
      </div>
    </div>
  );
};