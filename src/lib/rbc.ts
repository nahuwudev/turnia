import { Event } from "react-big-calendar";

export interface MyEvent extends Event {
  id: number;
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  categorie: "terapia" | "consulta";
}

export const data = [
  {
    id: 1,
    title: "Javier",
    start: new Date(2025, 4, 6, 9, 0),
    end: new Date(2025, 4, 6, 10, 0),
    categorie: "consulta",
  },
  {
    id: 2,
    title: "Carlos",
    start: new Date(2025, 4, 6, 10, 0),
    end: new Date(2025, 4, 6, 11, 0),
    categorie: "terapia",
  },
  {
    id: 3,
    title: "Carlos",
    start: new Date(2025, 4, 6, 10, 0),
    end: new Date(2025, 4, 6, 11, 0),
    categorie: "terapia",
  },
  {
    id: 4,
    title: "Carlos",
    start: new Date(2025, 4, 6, 10, 0),
    end: new Date(2025, 4, 6, 11, 0),
    categorie: "terapia",
  },
  {
    id: 8,
    title: "Carlos",
    start: new Date(2025, 4, 6, 10, 0),
    end: new Date(2025, 4, 6, 11, 0),
    categorie: "terapia",
  },
] as MyEvent[]