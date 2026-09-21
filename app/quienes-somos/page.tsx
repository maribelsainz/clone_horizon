import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Quienes somos - Horizon Capital",
  description:
    "Somos el family office de nuestros clientes. Servicio independiente y transparente.",
};

export default function QuienesSomosPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero title="Quienes somos" />

        <section className="bg-white">
          <div className="mx-auto max-w-[760px] px-5 py-16 text-center md:px-6 md:py-24">
            <h2 className="text-2xl font-bold leading-tight tracking-wide text-horizon-heading uppercase md:text-[2rem]">
              Somos el family office
              <br />
              de nuestros clientes
            </h2>
            <p className="mt-6 text-base leading-7 text-horizon-muted md:text-lg">
              Les ofrecemos una solución integral en todo lo relacionado con sus
              finanzas, ahorro e inversiones, comparando por ellos las distintas
              alternativas que nos ofrece el mercado.
              <br />
              Como cada Cliente es único, la solución es personalizada.
              <br />
              Y lo más importante: Damos un servicio independiente, transparente
              y en ausencia de cualquier conflicto de interés.
            </p>
          </div>
        </section>

        <section className="relative min-h-[320px] overflow-hidden md:min-h-[480px]">
          <Image
            src="/images/parallax-quienes.jpg"
            alt=""
            fill
            className="object-cover object-[90%_60%]"
            sizes="100vw"
          />
        </section>
      </main>
      <Footer />
    </>
  );
}
