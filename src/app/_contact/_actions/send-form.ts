"use server";

import { resend } from "@/app/_mail";
import { ContactFormInputs, formSchema } from "../_schemas/contact-form";
import { EmailTemplate } from "../_components/email-template";

export async function sendForm(input: ContactFormInputs) {
  try {
    const validatedData = formSchema.safeParse(input);

    if (!validatedData.success) {
      return {
        success: false,
        message: "Les données du formulaire sont invalides",
      };
    }

    const { error } = await resend.emails.send({
      from: "Noreply <noreply@klondikegroup.fr>",
      to: ["events.klondikegroup@gmail.com"],
      subject: "The Castle - Demande d'inscription",
      react: await EmailTemplate({
        email: validatedData.data.email,
        firstName: validatedData.data.firstName,
        lastName: validatedData.data.lastName,
      }),
      attachments: validatedData.data.attachments.map((attachment) => ({
        filename: attachment.fileName,
        content: attachment.content,
      })),
    });

    if (error) {
      throw error;
    }

    return {
      success: true,
      message: "Message envoyé avec succès",
    };
  } catch (e) {
    console.error(e);

    // todo: envoyer message custom selon le code de l'erreur
    return {
      success: false,
      message: "Une erreur s'est produite lors de l'envoi du message",
    };
  }
}
