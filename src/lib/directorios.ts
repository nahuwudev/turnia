import { House, ChartLine, CalendarDays, Receipt, Users, UserRoundPen, Clock, Mail, LogIn, Sigma } from "lucide-react";

export const directories = {
  /* homepage */
  home: {
    url: "/",
    title: "Inicio",
    icon: House,
    section: "homepage"
  },
  login: {
    url: "/login",
    title: 'iniciar-sesion',
    icon: LogIn,
    section: "homepage"
  },
  register: {
    url: "/register",
    title: 'registrarse',
    icon: Sigma,
    section: "homepage"
  },

  /* Menú */
  dashboard: {
    url: "/dashboard",
    title: "Panel",
    icon: House,
    section: "menu"
  },
  calendario: {
    url: "/dashboard/calendario",
    title: "Calendario",
    icon: CalendarDays,
    section: "menu"
  },
  clientes: {
    url: "/dashboard/clientes",
    title: "Clientes",
    icon: Users,
    section: "menu"
  },
  informes: {
    url: "/dashboard/informes",
    title: "Informes",
    icon: ChartLine,
    section: "menu"
  },
  facturacion: {
    url: "/dashboard/facturacion",
    title: "Facturación",
    icon: Receipt,
    section: "menu"
  },

  /* Configuración */
  profile: {
    url: "/dashboard/perfil",
    title: "Perfil",
    icon: UserRoundPen,
    section: "configuracion"
  },
  notification: {
    url: "/dashboard/notifacaciones",
    title: "Notificaciones",
    icon: Mail,
    section: "configuracion"
  },
  disponibility: {
    url: "/dashboard/horarios-y-disponibilidad",
    title: "Horarios y Disponibilidad",
    icon: Clock,
    section: "configuracion"
  }
};

