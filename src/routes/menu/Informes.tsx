import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CardSectionInformes } from "@/composites/card-section";
import { BarChartSection, LineChartSection } from "@/composites/charts-section";
import { format } from "date-fns";
import { es } from "date-fns/locale/es";

export const Informes = () => {
  const startDate = new Date(2025, 3, 1);
  const endDate = new Date(2025, 4, 1);

  const formattedStart = format(startDate, "d MMMM", { locale: es });
  const formattedEnd = format(endDate, "d MMMM", { locale: es });

  const formattedYear = format(endDate, "yyyy", { locale: es });

  const dateRange = `Mostrando datos del: ${formattedStart} - ${formattedEnd}, ${formattedYear}`;

  return (
    <>
      <header className="p-5 mt-5">
        <Card className="w-[90%] mx-auto p-0 flex">
          <CardContent className="p-3 flex items-center justify-between">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Último mes" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Mes</SelectLabel>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <div>
              <p className="text-sm text-slate-500">{dateRange}</p>
            </div>
          </CardContent>
        </Card>

        <CardSectionInformes />
      </header>

      <section className="w-[90%] mx-auto p-5 grid lg:grid-cols-2 gap-7">
        <BarChartSection />
        <LineChartSection />
      </section>
    </>
  );
};
