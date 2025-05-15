import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { directories } from "@/lib/directorios";
import { ArrowRight, Clock } from "lucide-react";
import { Link } from "react-router";

export const NextDates = () => {
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
        <div className="gap-0 p-1 space-y-4 border-l-4 border-l-blue-700">
          <CardHeader className="gap-0">
            <h3>Laura Martinez</h3>
            <h5 className="text-sm text-slate-500">
              Terapia individual - Primera consulta
            </h5>
          </CardHeader>
          <CardFooter className="flex items-center">
            <Clock color="gray" className="w-4 mr-1" />
            <p className="text-sm text-slate-500">10:30 - 11:30</p>
          </CardFooter>
        </div>

        <div className="gap-0 p-1 space-y-4 border-l-4 border-l-blue-700">
          <CardHeader className="gap-0">
            <h3>Laura Martinez</h3>
            <h5 className="text-sm text-slate-500">
              Terapia individual - Primera consulta
            </h5>
          </CardHeader>
          <CardFooter className="flex items-center">
            <Clock color="gray" className="w-4 mr-1" />
            <p className="text-sm text-slate-500">10:30 - 11:30</p>
          </CardFooter>
        </div>

        <div className="gap-0 p-1 space-y-4 border-l-4 border-l-blue-700">
          <CardHeader className="gap-0">
            <h3>Laura Martinez</h3>
            <h5 className="text-sm text-slate-500">
              Terapia individual - Primera consulta
            </h5>
          </CardHeader>
          <CardFooter className="flex items-center">
            <Clock color="gray" className="w-4 mr-1" />
            <p className="text-sm text-slate-500">10:30 - 11:30</p>
          </CardFooter>
        </div>

      </CardContent>
    </Card>
  );
};
