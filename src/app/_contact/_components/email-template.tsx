import * as React from "react";

interface EmailTemplateProps {
  email: string;
  firstName: string;
  lastName: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  email,
  firstName,
  lastName,
}) => (
  <div>
    <h1>{`Demande d'inscription`}</h1>
    <p>Email: {email}</p>
    <p>Prénom: {firstName}</p>
    <p>Nom: {lastName}</p>
  </div>
);
