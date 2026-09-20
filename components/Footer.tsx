import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

const interestLinks = [
  { label: "Preguntas frecuentes", href: "/contacto" },
  { label: "Links de interés", href: "/nuestra-diferencia" },
  { label: "Datos útiles", href: "/quienes-somos" },
];

export default function Footer() {
  return (
    <footer className="relative border-b-[10px] border-black bg-horizon-navy text-white">
      <div className="mx-auto grid max-w-[1360px] gap-10 px-5 py-14 md:grid-cols-2 md:px-6 md:py-16 lg:grid-cols-4 lg:gap-8">
        <div>
          <Link href="/">
            <Image
              src="/images/logo-white.png"
              alt="Horizon Capital"
              width={169}
              height={106}
              className="h-auto w-[140px] object-contain"
            />
          </Link>
        </div>

        <div>
          <h4 className="mb-4 text-xl font-normal">Somos</h4>
          <p className="text-[15px] leading-7 text-white/85">
            Te ofrecemos una solución integral en todo lo relacionado con tus
            finanzas, ahorro e inversiones, comparando por ti las distintas
            alternativas que nos ofrece el mercado.
          </p>
        </div>

        <div>
          <h4 className="mb-4 text-xl font-normal">Links de interés</h4>
          <ul className="space-y-2 text-[15px] text-white/85">
            {interestLinks.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="transition-colors hover:text-horizon-gold">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-xl font-normal">Datos de contacto</h4>
          <ul className="space-y-3 text-[15px] text-white/85">
            <li>
              <a
                href="tel:+56998264923"
                className="inline-flex items-center gap-2 transition-colors hover:text-horizon-gold"
              >
                <Phone className="h-4 w-4" strokeWidth={1.75} />
                +56 9 9826 4923
              </a>
            </li>
            <li>
              <a
                href="mailto:contacto@horizoncapital.cl"
                className="inline-flex items-center gap-2 transition-colors hover:text-horizon-gold"
              >
                <Mail className="h-4 w-4" strokeWidth={1.75} />
                contacto@horizoncapital.cl
              </a>
            </li>
            <li className="inline-flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.75} />
              Alcántara 200, Las Condes
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
