import { z } from "zod";

export const fileSchema = z.object({
  fileName: z.string(),
  content: z.any(),
});

export const formSchema = z.object({
  firstName: z
    .string()
    .min(3, {
      message: "Votre prénom doit contenir au moins 3 caractères",
    })
    .max(30),
  lastName: z
    .string()
    .min(3, { message: "Votre nom doit contenir au moins 3 caractères" })
    .max(30),
  email: z
    .string()
    .email({ message: "Veuillez entrer une adresse mail valide" }),
  attachments: z.array(fileSchema),
});

export type ContactFormInputs = z.infer<typeof formSchema>;
