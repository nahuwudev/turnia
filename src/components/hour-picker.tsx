import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { addHours, format, startOfDay } from "date-fns";

export const FranjaHoraria = () => {
    const generateHourlyOptions = () => {
      const start = startOfDay(new Date());
      return Array.from({ length: 24 }, (_, i) => {
        const hour = addHours(start, i);
        return format(hour, "HH:mm");
      });
    };
  
    const options = generateHourlyOptions();
  
    return (
      <Select>
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="08:00 AM" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup className="h-48">
            <SelectLabel>Horario</SelectLabel>
            {options.map((time) => (
              <SelectItem key={time} value={time}>
                {time}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  };