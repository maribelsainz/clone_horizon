"use client";

import { useState } from "react";
import {
  CheckCircle2,
  ChevronDown,
  FunctionSquare,
  Users,
  XCircle,
} from "lucide-react";

const items = [
  {
    id: "mejores",
    title: "TRABAJAMOS CON LOS MEJORES",
    icon: CheckCircle2,
    body: "Hay muchas empresas en el mercado nacional e internacional que quieren que pongas tu dinero a crecer con ellos. Pero es muy poco probable que una empresa sea buena en todo. Nuestro trabajo es mostrarte los mejores productos de las mejores empresas.",
  },
  {
    id: "acompanamos",
    title: "TE ACOMPAÑAMOS",
    icon: Users,
    body: "Nos ponemos a tu lado para que cumplas tus metas financieras, poniendo en marcha un plan concreto, el cual se va monitoreando periódicamente para ir haciendo las modificaciones que se requieran",
  },
  {
    id: "servicio",
    title: "SERVICIO EFECTIVO, SIMPLE Y EFICIENTE",
    icon: FunctionSquare,
    body: "Diseñamos estrategias de inversión disciplinadas a la medida del cliente, usando la metodología que utilizan los grandes inversores, usando Ingeniería Financiera, Matemáticas y Estadística, entregando un servicio efectivo, eficiente y simple.",
  },
  {
    id: "no-hacemos",
    title: "LO QUE NO HACEMOS",
    icon: XCircle,
    body: "No apostamos al corto plazo, si una acción va a subir o bajar (no predecimos el futuro y creemos que no es posible hacerlo), no garantizamos retornos ni vendemos productos propios para garantizar nuestra independencia.",
  },
];

export default function DifferenceAccordion() {
  const [openId, setOpenId] = useState(items[0].id);

  return (
    <div className="mx-auto w-full max-w-3xl">
      {items.map((item) => {
        const Icon = item.icon;
        const open = openId === item.id;

        return (
          <div key={item.id} className="border border-horizon-navy/80 -mt-px first:mt-0">
            <button
              type="button"
              aria-expanded={open}
              onClick={() => setOpenId(open ? "" : item.id)}
              className="flex w-full items-center gap-3 px-4 py-4 text-left text-[15px] font-bold uppercase tracking-wide text-horizon-heading transition-colors hover:text-horizon-gold md:text-xl"
            >
              <Icon className="h-5 w-5 shrink-0 text-horizon-navy" strokeWidth={1.75} />
              <span className="flex-1">{item.title}</span>
              <ChevronDown
                className={`h-5 w-5 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
              />
            </button>

            {open && (
              <div className="border-t border-horizon-navy/20 px-5 py-6 md:px-8">
                <p className="text-center text-[15px] leading-7 text-horizon-muted">
                  {item.body}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
