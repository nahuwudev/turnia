import { CalendarCheck } from "lucide-react";
import { Link } from "react-router";


/* 
Crear objeto con las distintas posibildiades
Aceptar cita
Rechazar cita
Nueva cita programada

iconos, textos, links, colors.
*/

export const Notification = () => {
  return (
    <div>
      <NotificationBlock moment="Hoy" />
      <NotificationBlock moment="Ayer" />
      <NotificationBlock moment="Anteriores" />
    </div>
  );
};

const NotificationBlock = ({ moment }: { moment: string }) => {
  return (
    <section className="p-5 space-y-5">
      <h2 className="text-xl font-bold">{moment}</h2>

      <div className="p-5  space-y-3 bg-blue-100 border-l-4  border-l-blue-500">
        <div className="space-y-1">
          <h3 className="flex items-center gap-3">
            <CalendarCheck size={17} className="text-blue-700" />
            Nueva cita programada
          </h3>
          <p className="text-slate-500 text-sm">
            Carlos Sánchez ha confirmado su cita para hoy a las 12:00
          </p>
        </div>
        <Link
          to="/"
          className="hover:bg-blue-300 transition-all bg-blue-200 text-blue-700 text-sm  rounded-full px-5"
        >
          Ver detalles
        </Link>
      </div>
    </section>
  );
};
