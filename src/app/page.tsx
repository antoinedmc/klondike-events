import ContactForm from "./_contact/_components/contact-form";

export default function Home() {
  return (
    <main className="h-screen w-screen flex flex-col items-center justify-center">
      <div className="header">
        <h1>The Castle</h1>
        <div className="flex justify-center">
          <span className="subtitle">KLONDIKE GROUP</span>
        </div>
      </div>
      <ContactForm />
    </main>
  );
}
