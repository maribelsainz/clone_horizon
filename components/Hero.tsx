import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section id="inicio" className="relative min-h-[480px] w-full md:min-h-[800px]">
      <Image
        src="/images/hero-businesswoman.png"
        alt=""
        fill
        priority
        className="object-cover object-[70%_center]"
        sizes="100vw"
      />
      <Image
        src="/images/rect-banner.png"
        alt=""
        fill
        priority
        className="object-cover object-left"
        sizes="100vw"
      />

      <div className="relative z-10 mx-auto flex min-h-[480px] max-w-[1360px] flex-col justify-center px-5 py-28 md:min-h-[800px] md:px-6 md:py-32 lg:pl-[200px]">
        <h1 className="max-w-[760px] text-[1.7rem] font-bold leading-[1.15] tracking-wide text-white uppercase sm:text-4xl md:text-[60px] md:leading-[1.05]">
          Asesoría personalizada e
          <br />
          independiente en la planificación
          <br />
          de sus finanzas
        </h1>

        <Link
          href="/contacto"
          className="mt-8 inline-flex w-fit items-center gap-3 text-xl font-bold text-white transition-colors hover:text-horizon-gold md:mt-12 md:text-[30px]"
        >
          NECESITO ASESORÍA
          <ArrowRight className="h-5 w-5 md:h-6 md:w-6" strokeWidth={2.5} />
        </Link>
      </div>
    </section>
  );
}
