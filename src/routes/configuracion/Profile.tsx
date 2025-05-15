import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Camera } from "lucide-react";
import { useState } from "react";

export const Profile = () => {
  const [address, setAddress] = useState("Av. Corrientes 1234, Buenos Aires");

  const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
    address
  )}&z=15&output=embed`;

  return (
    <section className="gap-6 p-4 space-y-10">
      <div className="flex flex-col items-center bg-white p-5 rounded-md border">
        <Avatar className="rounded-full relative">
          <AvatarImage
            className="rounded-full w-32"
            src="https://github.com/shadcn.png"
          />
          <AvatarFallback>CN</AvatarFallback>
          <button className="cursor-pointer absolute right-0 bottom-0 bg-blue-500 p-2 rounded-full">
            <Camera className="text-cyan-100" />
          </button>
        </Avatar>
        <div className="mt-2 text-center">
          <h3 className="font-bold text-xl text-slate-900">Daniel Méndez</h3>
          <p className="text-slate-600 font-light">Psicólogo</p>
        </div>
      </div>

      <div className="border p-5 rounded-md bg-white">
        <form action="" className="space-y-7">
          <div className="grid gap-2">
            <Label className="text-xs text-slate-500" htmlFor="full-name">
              Nombre completo / empresa
            </Label>
            <Input
              id="full-name"
              type="text"
              placeholder="Juan Pérez o MiEmpresa S.A."
              required
            />
          </div>

          <div className="grid gap-2">
            <Label className="text-xs text-slate-500" htmlFor="specialty">
              Especialidad / Servicio
            </Label>
            <Input
              id="specialty"
              type="text"
              placeholder="Diseño gráfico, Carpintería, etc."
              required
            />
          </div>

          <div className="grid gap-2">
            <Label className="text-xs text-slate-500" htmlFor="email">
              Correo electrónico
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label className="text-xs text-slate-500" htmlFor="phone">
              Teléfono
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+54 9 11 1234-5678"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label className="text-xs text-slate-600" htmlFor="message">
              Descripción
            </Label>
            <Textarea placeholder="Escribe aqui." id="message" />
          </div>

          <div className="grid gap-2">
            <Label className="text-xs text-slate-600" htmlFor="location">
              Dirección (se actualizará el mapa)
            </Label>
            <Input
              id="location"
              type="text"
              placeholder="Ej: Av. Rivadavia 1000, CABA"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <iframe
              title="Ubicación en Google Maps"
              src={mapUrl}
              width="100%"
              height="100%"
              loading="lazy"
              allowFullScreen
              className=" w-full h-full rounded-md border"
            />
          </div>

          <Button className="w-full">Completar</Button>
        </form>
      </div>
    </section>
  );
};
