import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

export function RadioList() {
  return (
    <RadioGroup className="flex" defaultValue="comfortable">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="default" id="r1" />
        <Label className="font-normal text-slate-600" htmlFor="r1">
          Presencial
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="comfortable" id="r2" />
        <Label className="font-normal text-slate-600" htmlFor="r2">
          Videollamada
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="compact" id="r3" />
        <Label className="font-normal text-slate-600" htmlFor="r3">
          Teléfono
        </Label>
      </div>
    </RadioGroup>
  );
}
