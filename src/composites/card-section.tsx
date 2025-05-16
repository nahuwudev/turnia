import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  getMonthlyIncome,
} from "@/lib/api.dashboard";
import { directories } from "@/lib/directorios";
import { useStoreAppointments } from "@/store/appointments-store";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { es } from "date-fns/locale/es";
import {
  AlertCircle,
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Calendar,
  ChartLine,
  Clock,
  Coins,
  DollarSign,
  Hourglass,
  Plus,
  Receipt,
  UserCog,
  UserRoundCheck,
  UserRoundPlus,
  Users,
  Users2,
} from "lucide-react";
import { Link } from "react-router";

export const CardSectionDashboard = () => {
  const { getTodayAppointments, getPendingAppointments, loading, error } = useStoreAppointments();
  const todayAppointments = getTodayAppointments();
  const pendingAppointments = getPendingAppointments();

  const { data: monthlyIncome, isLoading: loadingIncome } = useQuery({
    queryKey: ['monthlyIncome'],
    queryFn: getMonthlyIncome,
  });

  if (loading || loadingIncome) {
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="h-36 p-4">
            <Skeleton className="h-4 w-1/3 mb-2" />
            <Skeleton className="h-10 w-1/4 mb-4" />
            <Skeleton className="h-4 w-1/2" />
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const isNegativePercentage = monthlyIncome?.percentageChange
    ?.toFixed(1)
    .includes('-');

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card className="bg-cyan-200 m-0 p-0 gap-0 h-36 flex flex-col justify-center">
        <CardHeader className="mt-2">
          <h3 className="text-sm text-slate-600">Citas de hoy</h3>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <h3 className="text-5xl mb-2">{todayAppointments.count}</h3>
          <UserCog className="mb-2" color="#744bd2" size={50} />
        </CardContent>
        <CardFooter className="text-sm text-slate-600">
          <p>
            {todayAppointments.next
              ? `Próxima ${format(new Date(todayAppointments.next), 'HH:mm', {
                  locale: es,
                })}`
              : 'Sin más citas'}
          </p>
        </CardFooter>
      </Card>

      <Card className="bg-green-100 m-0 p-0 gap-0 h-36 flex flex-col justify-center">
        <CardHeader className="mt-2">
          <h3 className="text-sm text-slate-600">Por confirmar</h3>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <h3 className="text-5xl mb-2">{pendingAppointments}</h3>
          <Hourglass className="mb-2" color="#74d24b" size={50} />
        </CardContent>
        <CardFooter className="text-sm text-slate-600 flex items-center">
          <Link
            className="text-green-600 font-medium flex items-center"
            to={directories.notification.url}
          >
            <p>Revisar ahora</p>
            <ArrowRight className="ml-1 w-5" />
          </Link>
        </CardFooter>
      </Card>

      <Card className="bg-red-100 m-0 p-0 gap-0 h-36 flex flex-col justify-center">
        <CardHeader className="mt-2">
          <h3 className="text-sm text-red-500">Ingresos del mes</h3>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <h3 className="text-5xl mb-2">
            ${monthlyIncome?.current.toLocaleString() || 0}
          </h3>
          <ChartLine className="mb-2" color="#e4535a" size={50} />
        </CardContent>
        <CardFooter className="text-sm text-red-500 flex items-center">
          {isNegativePercentage ? (
            <ArrowDown className="w-4 mr-1" />
          ) : (
            <ArrowUp className="w-4 mr-1" />
          )}
          <p>{monthlyIncome?.percentageChange.toFixed(1)}% vs. mes anterior</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export const CardSectionInformes = () => {
  return (
    <div className="w-[90%] mx-auto mt-5 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="py-5 gap-2">
        <CardHeader>
          <div className="p-2 w-12 rounded-full bg-blue-300">
            <DollarSign size={30} color="cyan" />
          </div>
        </CardHeader>
        <CardContent className="space-y-1">
          <h3 className="text-sm text-slate-700">Ingresos</h3>
          <h1 className="text-4xl font-bold text-slate-900">$15,840</h1>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-slate-500">$3960 senanales</p>
        </CardFooter>
      </Card>

      <Card className="py-5 gap-2">
        <CardHeader>
          <div className="p-2 w-12 rounded-full bg-green-200">
            <Calendar size={30} color="green" />
          </div>
        </CardHeader>
        <CardContent className="space-y-1">
          <h3 className="text-sm text-slate-700">Citas completadas</h3>
          <h1 className="text-4xl font-bold text-slate-900">286</h1>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-slate-500">92% tasa de asistencia</p>
        </CardFooter>
      </Card>

      <Card className="py-5 gap-2">
        <CardHeader>
          <div className="p-2 w-12 rounded-full bg-green-200">
            <Users2 size={30} color="green" />
          </div>
        </CardHeader>
        <CardContent className="space-y-1">
          <h3 className="text-sm text-slate-700">Total clientes</h3>
          <h1 className="text-4xl font-bold text-slate-900">142</h1>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-slate-500">18 nuevos este mes</p>
        </CardFooter>
      </Card>

      <Card className="py-5 gap-2">
        <CardHeader>
          <div className="p-2 w-12 rounded-full bg-red-200">
            <Clock size={30} color="red" />
          </div>
        </CardHeader>
        <CardContent className="space-y-1">
          <h3 className="text-sm text-slate-700">Horas facturadas</h3>
          <h1 className="text-4xl font-bold text-slate-900">315</h1>
        </CardContent>
        <CardFooter className="text-blue-600">
          <p className="text-sm text-slate-500">78 horas semanales</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export const CardSectionFacturacion = () => {
  return (
    <div className="w-[90%] mx-auto mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="py-5 gap-2">
        <CardHeader>
          <div className="p-2 w-12 rounded-full bg-blue-300">
            <Coins size={30} color="cyan" />
          </div>
        </CardHeader>
        <CardContent className="space-y-1">
          <h1 className="text-4xl font-bold text-slate-900">$3,250 </h1>
          <h3 className="text-sm text-slate-700">Ingresos totales</h3>
        </CardContent>
        <CardFooter className="text-blue-600">
          <ArrowUp className="w-4 mr-1" />
          <p>12% vs mes anterior</p>
        </CardFooter>
      </Card>

      <Card className="py-5 gap-2">
        <CardHeader>
          <div className="p-2 w-12 rounded-full bg-green-200">
            <Receipt size={30} color="green" />
          </div>
        </CardHeader>
        <CardContent className="space-y-1">
          <h1 className="text-4xl font-bold text-slate-900">35</h1>
          <h3 className="text-sm text-slate-700">Facturas emitidas</h3>
        </CardContent>
        <CardFooter className="text-blue-600">
          <ArrowUp className="w-4 mr-1" />
          <p>4 más que el mes anterior</p>
        </CardFooter>
      </Card>

      <Card className="py-5 gap-2">
        <CardHeader>
          <div className="p-2 w-12 rounded-full bg-green-200">
            <Users2 size={30} color="green" />
          </div>
        </CardHeader>
        <CardContent className="space-y-1">
          <h1 className="text-4xl font-bold text-slate-900">42</h1>
          <h3 className="text-sm text-slate-700">Nuevos clientes</h3>
        </CardContent>
        <CardFooter className="text-blue-600">
          <Plus className="w-4 mr-1" />
          <p>3 nuevos este mes</p>
        </CardFooter>
      </Card>

      <Card className="py-5 gap-2">
        <CardHeader>
          <div className="p-2 w-12 rounded-full bg-red-200">
            <Clock size={30} color="red" />
          </div>
        </CardHeader>
        <CardContent className="space-y-1">
          <h1 className="text-4xl font-bold text-slate-900">5</h1>
          <h3 className="text-sm text-slate-700">Facturas pendientes</h3>
        </CardContent>
        <CardFooter className="text-blue-600">
          <AlertCircle className="w-4 mr-1 text-red-500" />
          <p>$750</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export const CardSectionClients = () => {
  const fecha = new Date();
  const date = format(fecha, "MMMM yyyy", { locale: es });
  return (
    <div className="w-[90%] mx-auto mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="py-5 gap-2">
        <CardHeader>
          <div className="p-2 w-12 rounded-full bg-blue-300">
            <Users size={30} color="cyan" />
          </div>
        </CardHeader>
        <CardContent className="space-y-1">
          <h1 className="text-4xl font-bold text-slate-900">42</h1>
          <h3 className="text-sm text-slate-700">Total clientes</h3>
        </CardContent>
        <CardFooter className="text-blue-600">
          <ArrowUp className="w-4 mr-1" />
          <p>8% este mes</p>
        </CardFooter>
      </Card>

      <Card className="py-5 gap-2">
        <CardHeader>
          <div className="p-2 w-12 rounded-full bg-green-200">
            <UserRoundCheck size={30} color="green" />
          </div>
        </CardHeader>
        <CardContent className="space-y-1">
          <h1 className="text-4xl font-bold text-slate-900">35</h1>
          <h3 className="text-sm text-slate-700">Clientes activos</h3>
        </CardContent>
        <CardFooter className="text-blue-600">
          <ArrowUp className="w-4 mr-1" />
          <p>83% tasa de retención</p>
        </CardFooter>
      </Card>

      <Card className="py-5 gap-2">
        <CardHeader>
          <div className="p-2 w-12 rounded-full bg-green-200">
            <Coins size={30} color="green" />
          </div>
        </CardHeader>
        <CardContent className="space-y-1">
          <h1 className="text-4xl font-bold text-slate-900">$180</h1>
          <h3 className="text-sm text-slate-700">Valor promedio</h3>
        </CardContent>
        <CardFooter className="text-blue-600">
          <ArrowUp className="w-4 mr-1" />
          <p>$15 vs mes anterior</p>
        </CardFooter>
      </Card>

      <Card className="py-5 gap-2">
        <CardHeader>
          <div className="p-2 w-12 rounded-full bg-red-200">
            <UserRoundPlus size={30} color="red" />
          </div>
        </CardHeader>
        <CardContent className="space-y-1">
          <h1 className="text-4xl font-bold text-slate-900">7</h1>
          <h3 className="text-sm text-slate-700">Nuevos este mes</h3>
        </CardContent>
        <CardFooter className="text-blue-600">
          <Calendar className="w-4 mr-1" />
          <p>{date}</p>
        </CardFooter>
      </Card>
    </div>
  );
};
