import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Contacto - Horizon Propiedades",
  description:
    "Contáctanos para comenzar a buscar las mejores opciones para tu bienestar financiero.",
};

export default function ContactoPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero title="Contacto" />

        <section className="bg-white">
          <div className="mx-auto max-w-[760px] px-5 py-14 text-center md:px-6 md:py-16">
            <p className="text-base leading-7 text-horizon-muted md:text-lg">
              Estamos listos para mostrarte las soluciones que estas buscando
              para tus finanzas, ahorro e inversiones. Contáctanos para comenzar
              a buscar las mejores opciones para tu bienestar.
            </p>
          </div>

          <div className="mx-auto grid max-w-[1100px] gap-12 px-5 pb-16 md:grid-cols-2 md:gap-16 md:px-6 md:pb-24">
            <ContactForm />

            <div>
              <h4 className="mb-6 text-xl font-normal text-horizon-heading">
                Datos de contacto
              </h4>
              <ul className="space-y-6">
                <li>
                  <a
                    href="tel:+56998264923"
                    className="flex items-center gap-4 text-horizon-heading transition-colors hover:text-horizon-gold"
                  >
                    <Phone className="h-8 w-8 shrink-0" strokeWidth={1.25} />
                    <span className="text-xl">+56 9 9826 4923</span>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:contacto@horizoncapital.cl"
                    className="flex items-center gap-4 text-horizon-heading transition-colors hover:text-horizon-gold"
                  >
                    <Mail className="h-8 w-8 shrink-0" strokeWidth={1.25} />
                    <span className="text-xl break-all">
                      contacto@horizoncapital.cl
                    </span>
                  </a>
                </li>
                <li className="flex items-center gap-4 text-horizon-heading">
                  <MapPin className="h-8 w-8 shrink-0" strokeWidth={1.25} />
                  <span className="text-xl">Alcántara 200, Las Condes</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
