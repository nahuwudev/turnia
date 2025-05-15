import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { directories } from "@/lib/directorios";
import { ArrowRight, CalendarPlus2, Check, FileText, X } from "lucide-react";
import { Link } from "react-router";

export const LastActivity = () => {
  return (
    <Card className="lg:h-[30rem]">
      <CardHeader className="flex justify-between">
        <h1 className="font-bold">Próximas citas</h1>
        <div className="flex items-center text-sm text-blue-600">
          <Link to={directories.notification.url}>Ver todas</Link>
          <ArrowRight className="w-4 mr-3 ml-1" />
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-4  ">
          <CardContent className="gap-5 flex items-center">
            <div className="bg-green-200 rounded-full p-2">
              <Check color="green" size={20} />
            </div>
            <div>
              <h3 className="font-medium">Nueva reserva confirmada</h3>
              <h5 className="text-sm text-slate-600">
                Laura Martinez ha confirmado su cita para hoy a las 10:30
              </h5>
              <p className="text-sm text-slate-400">Hace 35 minutos</p>
            </div>
          </CardContent>
        </div>

        <div className="space-y-4  ">
          <CardContent className="gap-5 flex items-center">
            <div className="bg-blue-200 rounded-full p-2">
              <CalendarPlus2 color="blue" size={20} />
            </div>
            <div>
              <h3 className="font-medium">Nueva cita programada</h3>
              <h5 className="text-sm text-slate-600">
                Has programado una cita con Javier Rodriguez para el 10/05/2025
              </h5>
              <p className="text-sm text-slate-400">Hace 2 horas</p>
            </div>
          </CardContent>
        </div>

        <div className="space-y-4  ">
          <CardContent className="gap-5 flex items-center">
            <div className="bg-yellow-200 rounded-full p-2">
              <FileText color="orange" size={20} />
            </div>
            <div>
              <h3 className="font-medium">Formulario completado</h3>
              <h5 className="text-sm text-slate-600">
                María González ha completado el formulario de seguimiento
              </h5>
              <p className="text-sm text-slate-400">Ayer</p>
            </div>
          </CardContent>
        </div>

        <div className="space-y-4  ">
          <CardContent className="gap-5 flex items-center">
            <div className="bg-red-200 rounded-full p-2">
              <X color="red" size={20} />
            </div>
            <div>
              <h3 className="font-medium">Cita cancelada</h3>
              <h5 className="text-sm text-slate-600">
                Carlos Sánchez ha cancelado su cita del 05/05/2025
              </h5>
              <p className="text-sm text-slate-400">Ayer</p>
            </div>
          </CardContent>
        </div>
      </CardContent>
    </Card>
  );
};
