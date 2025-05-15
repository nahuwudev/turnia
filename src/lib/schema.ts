import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Por favor, ingresa un email válido." }),
  password: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres." }),
});

export const registerSchema = z
.object({
  email: z.string().email({ message: "Ingresa un correo electrónico válido" }),
    password: z
      .string()
      .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
    confirmPassword: z
      .string()
      .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
})
.refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coincden',
  path: ["confirmPassword"]
})

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;