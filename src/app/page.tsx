import localFont from "next/font/local";

import ContactForm from "./contact/components/contact-form";

const authenticSignatureFont = localFont({
  src: "./fonts/Authentic Signature.otf",
});

export default function Home() {
  return (
    <main className="h-screen w-screen flex flex-col items-center justify-center">
      <div className="header">
        <h1 className={`${authenticSignatureFont.className}`}>The Castle</h1>
        <div className="flex justify-center">
          <span className="subtitle">KLONDIKE GROUP</span>
        </div>
      </div>
      <ContactForm />
    </main>
  );
}
