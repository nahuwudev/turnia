import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { DatePicker } from "./date-picker";
import { FranjaHoraria } from "./hour-picker";
import { RadioList } from "./radio-group";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";

export const NewDate = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="bg-blue-500 text-white font-bold hover:bg-blue-600">
          <Plus strokeWidth={3} />
          Nueva cita
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Agrega una nueva cita</SheetTitle>
          <SheetDescription>
            Completa los campos para programar una nueva cita.
          </SheetDescription>
        </SheetHeader>

        <form className="space-y-5" action="">
          <div className="flex flex-col ml-5 gap-2">
            <SelectClient />
          </div>

          <div className=" ml-5 space-y-2">
            <p className=" text-xs text-slate-500"> Fecha y hora</p>

            <div className="grid grid-cols-2 gap-2">
              <DatePicker />
              <FranjaHoraria />
            </div>
          </div>

          <div className="flex flex-col ml-5 gap-2">
            <p className=" text-xs text-slate-500">Tipo de cita</p>
            <RadioList />
          </div>

          <div className="flex flex-col mx-5 gap-2">
            <p className=" text-xs text-slate-500">Notas</p>
            <Textarea  className="max-h-40" />
          </div>

          <div className="flex mx-5 gap-2">
            <Checkbox />
            <p className="text-xs text-gray-600">
              Enviar recordatorio al cliente 24h antes
            </p>
          </div>

          <SheetFooter>
            <SheetClose>
              <Button
                className="bg-blue-500 w-full  hover:bg-blue-600 text-slate-50"
                type="submit"
              >
                Guardar cita
              </Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export function SelectClient() {
  return (
    <>
      <p className=" text-xs text-slate-500">Selecciona un cliente</p>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="blueberry">Blueberry</SelectItem>
            <SelectItem value="grapes">Grapes</SelectItem>
            <SelectItem value="pineapple">Pineapple</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}
