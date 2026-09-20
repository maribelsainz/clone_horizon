import Image from "next/image";

export default function CtaBanner() {
  return (
    <section className="relative flex min-h-[280px] items-center justify-center overflow-hidden md:min-h-[420px]">
      <Image
        src="/images/parallax.jpg"
        alt=""
        fill
        className="scale-110 object-cover object-[80%_40%]"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-horizon-navy/45" />
      <div className="relative z-10 px-5 py-16 text-center md:px-6">
        <h2 className="text-[1.75rem] font-bold leading-tight tracking-wide text-white uppercase drop-shadow-md md:text-[70px] md:leading-[1.15]">
          Asesoría personalizada
          <br />e independiente
        </h2>
      </div>
    </section>
  );
}
