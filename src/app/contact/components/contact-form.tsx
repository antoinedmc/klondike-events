"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ContactFormInputs, formSchema } from "../schemas/contact-form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState, useTransition } from "react";
import { sendForm } from "../actions/send-form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function ContactForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, startTransition] = useTransition();
  const form = useForm<ContactFormInputs>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
  });

  const onSubmit = (data: ContactFormInputs) => {
    startTransition(async () => {
      const response = await sendForm(data);

      if (response.success) {
        setIsSuccess(true);
        form.reset();
      } else {
        setIsSuccess(false);
        form.setError("root.serverError", {
          message: response.message,
          type: "500",
        });
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Demande de participation</CardTitle>
      </CardHeader>
      {isSuccess ? (
        <CardContent>Votre message a été envoyé</CardContent>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-8">
              {form.formState.errors?.root?.serverError && (
                <Alert variant="destructive">
                  <AlertTitle>Erreur</AlertTitle>
                  <AlertDescription>
                    {form.formState.errors?.root?.serverError?.message}
                  </AlertDescription>
                </Alert>
              )}
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom</FormLabel>
                    <FormControl>
                      <Input placeholder="Nom" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prénom</FormLabel>
                    <FormControl>
                      <Input placeholder="Prénom" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input placeholder="E-mail" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="attachments"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Photo en tenue</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        onChange={(e) => {
                          const files = e.target.files;
                          if (files) {
                            Promise.all(
                              Array.from(files).map(async (file) => ({
                                fileName: file.name,
                                content: Buffer.from(
                                  await file.arrayBuffer()
                                ).toString("base64"),
                              }))
                            ).then((filesArray) => {
                              field.onChange(filesArray);
                            });
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button type="submit" disabled={isSubmitting} className="mt-5">
                {isSubmitting ? "Envoi..." : "S'inscrire"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      )}
    </Card>
  );
}
