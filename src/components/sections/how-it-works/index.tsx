import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import heroImage from "@/assets/illustrations/heroIMAGE.webp";
import type { MessagesProps } from "@/types/MessagesProps";

export function HowItWorks({ messages }: MessagesProps) {
  const { howItWorks } = messages;

  return (
    <section className="section bg-teal-light" id="como-funciona" aria-labelledby="how-title">
      <div className="container">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-10 lg:gap-16">
          <Reveal className="w-full lg:w-[380px]">
            <Image
              src={heroImage}
              alt="Cómo funciona TechToJob"
              width={600}
              height={450}
              className="w-full h-auto rounded-2xl"
            />
          </Reveal>

          <div className="lg:max-w-[640px]">
            <Reveal stagger={0.12}>
              <span className="section-eyebrow">{howItWorks.eyebrow}</span>
              <h2 id="how-title" className="section-title">
                {howItWorks.titleLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h2>
            </Reveal>
          </div>
        </div>

        <Reveal stagger={0.12} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {howItWorks.steps.map((step) => (
            <article key={step.number} className="card bg-white">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-teal text-dark text-sm font-bold">
                {step.number}
              </span>
              <h3 className="text-lg font-bold mt-4">{step.title}</h3>
              <p className="text-sm text-dark leading-relaxed mt-2">
                {step.description}
              </p>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}