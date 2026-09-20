import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import DifferenceAccordion from "@/components/DifferenceAccordion";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Nuestra diferencia - Horizon Propiedades",
  description:
    "Trabajamos con los mejores, te acompañamos y ofrecemos un servicio independiente.",
};

export default function NuestraDiferenciaPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero title="Nuestra diferencia" />

        <section className="bg-white">
          <div className="mx-auto max-w-[760px] px-5 py-14 text-center md:px-6 md:py-20">
            <p className="text-base leading-7 text-horizon-muted md:text-lg">
              Les ofrecemos una solución integral en todo lo relacionado con sus
              finanzas, ahorro e inversiones, comparando por ellos las distintas
              alternativas que nos ofrece el mercado.
            </p>
          </div>

          <div className="mx-auto max-w-[1360px] px-5 pb-16 md:px-6 md:pb-24">
            <DifferenceAccordion />
          </div>
        </section>

        <section className="relative min-h-[320px] overflow-hidden md:min-h-[480px]">
          <Image
            src="/images/parallax-diferencia.jpg"
            alt=""
            fill
            className="object-cover object-[80%_40%]"
            sizes="100vw"
          />
        </section>
      </main>
      <Footer />
    </>
  );
}
