import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

import { Plus, Trash } from "lucide-react";

import { FranjaHoraria } from "@/components/hour-picker";

/* 

Duración de citas?
Tiempo entre citas?

Configuración adicional:
-Permitir reservas en linea?
-Requerir confirmación manual?
-Bloquear horas pasadas?
*/

export const Disponibility = () => {
  return (
    <div>
      <DisponibilityHeader />
      <DisponibilityBlock initialCheck={true} day="lunes" />
      <DisponibilityBlock initialCheck={false} day="martes" />
      <DisponibilityBlock initialCheck={false} day="miércoles" />
      <DisponibilityBlock initialCheck={false} day="jueves" />
      <DisponibilityBlock initialCheck={false} day="viernes" />
      <DisponibilityBlock initialCheck={false} day="sábado" />
      <DisponibilityBlock initialCheck={false} day="domingo" />
    </div>
  );
};

const DisponibilityHeader = () => {
  return (
    <header className="mx-5 mt-5 bg-white p-3 rounded-md border">
      <h1 className="text-xl font-medium">Horario laboral</h1>
    </header>
  );
};

const DisponibilityBlock = ({
  day,
  initialCheck,
}: {
  day: string;
  initialCheck: boolean;
}) => {
  const [isChecked, setIsChecked] = useState(initialCheck);
  const [horarios, setHorarios] = useState(
    initialCheck ? [{ id: Date.now() }] : []
  );

  const handleAddHorario = () => {
    setHorarios([...horarios, { id: Date.now() }]);
  };

  const handleRemoveHorario = (id: number) => {
    setHorarios((prev) => {
      const updated = prev.filter((h) => h.id !== id);
      if (updated.length === 0) {
        setIsChecked(false);
      }
      return updated;
    });
  };

  const handleCheckboxChange = (checked: boolean | "indeterminate") => {
    const shouldBeChecked = Boolean(checked);
    setIsChecked(shouldBeChecked);
    if (shouldBeChecked && horarios.length === 0) {
      setHorarios([{ id: Date.now() }]);
    } else if (!shouldBeChecked) {
      setHorarios([]);
    }
  };

  return (
    <section className="my-2 p-5">
      <div className="bg-white p-5 space-y-3 rounded-md border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Checkbox
              id={`checkbox-${day}`}
              checked={isChecked}
              onCheckedChange={handleCheckboxChange}
            />
            <label
              htmlFor={`checkbox-${day}`}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {day}
            </label>
          </div>

          {isChecked && (
            <button
              onClick={handleAddHorario}
              className="cursor-pointer transition-all hover:text-blue-600 flex items-center text-sm font-medium text-blue-500 gap-1"
            >
              <Plus size={20} />
              Añadir horario
            </button>
          )}
        </div>

        {isChecked && horarios.length > 0 ? (
          horarios.map((horario) => (
            <HorariosBlock
              key={horario.id}
              onRemove={() => handleRemoveHorario(horario.id)}
            />
          ))
        ) : (
          <p className="text-sm text-slate-500">No disponible</p>
        )}
      </div>
    </section>
  );
};

const HorariosBlock = ({ onRemove }: { onRemove: () => void }) => {
  return (
    <div className="flex gap-3 items-center">
      <FranjaHoraria />
      <p className="text-slate-500">a</p>
      <FranjaHoraria />
      <button onClick={onRemove} className="cursor-pointer">
        <Trash size={18} className="text-slate-500" />
      </button>
    </div>
  );
};
