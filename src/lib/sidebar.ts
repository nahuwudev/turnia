import { directories } from "./directorios";

export const navMain = Object.entries(directories)
  .filter(([, value]) => value.section === "menu")
  .map(([, value]) => value);

export const navConf = Object.entries(directories)
  .filter(([, value]) => value.section === "configuracion")
  .map(([, value]) => value);

