import { useCallback, useState } from "react";
import {
  Calendar,
  dateFnsLocalizer,
  View,
  EventProps,
} from "react-big-calendar";
import withDragAndDrop, {
  EventInteractionArgs,
} from "react-big-calendar/lib/addons/dragAndDrop";

import { format, parse, startOfWeek, getDay } from "date-fns";
import { es } from "date-fns/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { data, MyEvent } from "@/lib/rbc";
import { EventWrapper } from "./rbc-events";
import { CustomToolbar } from "./rbc-toolbar";

const locales = { es };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const DragAndDropCalendar = withDragAndDrop<MyEvent>(Calendar);

export const Turnia = () => {
  const [events, setEvents] = useState<MyEvent[]>(data);

  const [view, setView] = useState<View>("month");
  const [date, setDate] = useState<Date>(new Date());

  const moveEvent = useCallback(
    ({ event, start, end, isAllDay }: EventInteractionArgs<MyEvent>) => {
      setEvents((prev) =>
        prev.map((e) =>
          e.id === event.id
            ? { ...e, start: start as Date, end: end as Date, allDay: isAllDay }
            : e
        )
      );
    },
    []
  );

  const resizeEvent = useCallback(
    ({ event, start, end }: EventInteractionArgs<MyEvent>) => {
      setEvents((prev) =>
        prev.map((e) =>
          e.id === event.id
            ? { ...e, start: start as Date, end: end as Date }
            : e
        )
      );
    },
    []
  );

  const handleNavigate = useCallback((newDate: Date) => {
    setDate(newDate);
  }, []);

  const minTime = new Date();
  minTime.setHours(6, 0, 0); // 06:00 AM

  return (
    <div style={{ padding: "20px" }}>
      <DragAndDropCalendar
        localizer={localizer}
        events={events}
        view={view}
        views={["month", "week", "day"]}
        scrollToTime={minTime}
        onView={setView}
        date={date}
        onNavigate={handleNavigate}
        onEventDrop={moveEvent}
        onEventResize={resizeEvent}
        resizable
        culture="es"
        style={{ height: 800 }}
        messages={{
          today: "Hoy",
          previous: "<",
          next: ">",
          month: "Mes",
          week: "Semana",
          day: "Día",
        }}
        components={{
          event: (props: EventProps<MyEvent>) => (
            <EventWrapper event={props.event} currentView={view} />
          ),
          toolbar: CustomToolbar,
        }}
      />
    </div>
  );
};
