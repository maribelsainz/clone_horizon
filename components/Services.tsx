import {
  Building2,
  FileText,
  type LucideIcon,
  Users,
  DollarSign,
} from "lucide-react";
import Link from "next/link";

type Service = {
  icon: LucideIcon;
  text: string;
};

const services: Service[] = [
  {
    icon: Users,
    text: "Diseñamos la cartera de inversiones de acuerdo a las características particulares de cada cliente. Asesoramos en la selección de instrumentos de inversión en base al perfil de riesgo, horizontes de inversión y rentabilidad esperadas. Evaluamos las distintas alternativas de mercado considerando optimización tributaria, rentabilidades y costos.",
  },
  {
    icon: DollarSign,
    text: "Gestionamos de forma continua el patrimonio financiero de nuestros clientes. Definimos su Asset Allocation objetivo y optimizamos la implementación considerando costos, aspectos tributarios y necesidades de liquidez.",
  },
  {
    icon: Building2,
    text: "Nuestro modelo de Arquitectura abierta nos permite ser independientes y ofrecerle a nuestros clientes los mejores productos de las instituciones financieras nacionales y extranjeras.",
  },
  {
    icon: FileText,
    text: "Nuestra plataforma le entrega a nuestros clientes una visión global de su patrimonio con información actualizada periódicamente. Ha sido diseñada para solucionar las necesidades de información de nuestros clientes.",
  },
];

export default function Services() {
  return (
    <section id="servicios" className="bg-white">
      <div className="mx-auto max-w-[1360px] px-5 py-14 md:px-6 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-normal tracking-wide text-horizon-heading uppercase md:text-[2rem]">
            Nuestros servicios
          </h2>
          <p className="mt-4 text-base leading-7 text-horizon-muted md:text-lg">
            Te ofrecemos una solución integral en todo lo relacionado con tus
            finanzas, ahorro e inversiones, comparando por ti las distintas
            alternativas que nos ofrece el mercado.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 px-4 pb-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-[15px] lg:px-[15px]">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <Link
              key={service.text.slice(0, 40)}
              href="/nuestros-servicios"
              className="group flex min-h-[420px] flex-col items-center bg-white px-6 py-12 text-center text-horizon-muted shadow-[inset_0_0_0_1px_rgba(31,40,61,0.06)] transition-colors duration-300 hover:bg-horizon-navy hover:text-white hover:shadow-none md:min-h-[500px] md:px-8"
            >
              <Icon
                className="mb-8 h-[55px] w-[55px] stroke-[1.25] text-current"
                aria-hidden
              />
              <p className="text-[15px] leading-7">{service.text}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
