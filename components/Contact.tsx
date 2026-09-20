import ContactForm from "@/components/ContactForm";

export default function Contact() {
  return (
    <section id="contacto" className="bg-white">
      <div className="mx-auto max-w-[900px] px-5 py-16 md:px-6 md:py-24">
        <h2 className="text-center text-xl font-bold leading-snug tracking-wide text-horizon-heading uppercase md:text-[2rem]">
          Envíanos un mensaje
          <br />y te contactaremos a la brevedad
        </h2>

        <ContactForm className="mt-10 md:mt-12" />
      </div>
    </section>
  );
}
