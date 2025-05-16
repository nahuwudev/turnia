import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { directories } from "@/lib/directorios";
import { useStoreAppointments } from "@/store/appointments-store"; 
import { ArrowRight, Clock } from "lucide-react";
import { Link } from "react-router";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export const NextDates = () => {
  const { getTodayAppointments, loading, error } = useStoreAppointments();
  const todayAppointments = getTodayAppointments();

  // Skeleton mientras carga
  if (loading) {
    return (
      <Card className="lg:h-[30rem]">
        <CardHeader className="flex justify-between">
          <h1 className="font-bold">Próximas citas</h1>
          <div className="flex items-center text-sm text-blue-600">
            <Link to={directories.calendario.url}>Ver todas</Link>
            <ArrowRight className="w-4 mr-3 ml-1" />
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="gap-0 p-1 space-y-4 border-l-4 border-l-blue-700 animate-pulse"
            >
              <CardHeader className="gap-0">
                <div className="h-4 w-1/3 bg-gray-200 rounded" />
                <div className="h-3 w-2/3 bg-gray-200 rounded mt-2" />
              </CardHeader>
              <CardFooter className="flex items-center">
                <Clock color="gray" className="w-4 mr-1" />
                <div className="h-3 w-1/4 bg-gray-200 rounded" />
              </CardFooter>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  // Manejo de errores
  if (error) {
    return (
      <Card className="lg:h-[30rem]">
        <CardHeader className="flex justify-between">
          <h1 className="font-bold">Próximas citas</h1>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-red-500">Error: {error}</p>
        </CardContent>
      </Card>
    );
  }

  // Mostrar citas o mensaje si no hay citas
  return (
    <Card className="lg:h-[30rem]">
      <CardHeader className="flex justify-between">
        <h1 className="font-bold">Próximas citas</h1>
        <div className="flex items-center text-sm text-blue-600">
          <Link to={directories.calendario.url}>Ver todas</Link>
          <ArrowRight className="w-4 mr-3 ml-1" />
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        {todayAppointments.list.length === 0 ? (
          <p className="text-sm text-slate-500">No hay citas para el día de hoy</p>
        ) : (
          todayAppointments.list.map((appointment) => (
            <div
              key={appointment.appointment_id}
              className="gap-0 p-1 space-y-4 border-l-4 border-l-blue-700"
            >
              <CardHeader className="gap-0">
                <h3>{appointment.full_name || "Sin nombre"}</h3>
                <h5 className="text-sm text-slate-500">
                  {appointment.email || "Sin email"}
                </h5>
              </CardHeader>
              <CardFooter className="flex items-center">
                <Clock color="gray" className="w-4 mr-1" />
                <p className="text-sm text-slate-500">
                  {appointment.appointment_date
                    ? format(
                        new Date(appointment.appointment_date),
                        "HH:mm",
                        { locale: es }
                      )
                    : "Hora no disponible"}{" "}
                  -{" "}
                  {appointment.appointment_date
                    ? format(
                        new Date(
                          new Date(appointment.appointment_date).getTime() +
                            60 * 60 * 1000 // Asume 1 hora de duración
                        ),
                        "HH:mm",
                        { locale: es }
                      )
                    : "Hora no disponible"}
                </p>
              </CardFooter>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};