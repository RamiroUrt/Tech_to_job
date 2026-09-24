import Image from "next/image";
import es from "@/messages/es.json";
import heroImage from "@/assets/illustrations/heroIMAGE.webp";
import { LogoSymbol } from "@/components/brand/logo-symbol";

const stepIcons = [
  <svg
    key="discord"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className="h-[1.8cqw] w-[1.8cqw]"
  >
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>,
  <svg
    key="message"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className="h-[1.8cqw] w-[1.8cqw]"
  >
    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
  </svg>,
  <svg
    key="linkedin"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className="h-[1.8cqw] w-[1.8cqw]"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>,
  <svg
    key="briefcase"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className="h-[1.8cqw] w-[1.8cqw]"
  >
    <path d="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6 0h-4V4h4v2z" />
  </svg>,
];

export function HeroPreview() {
  const { howItWorks } = es;

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-[var(--color-gray-50)] px-[6cqw] py-[5cqw] text-dark">
      <div className="flex items-start justify-between gap-[4cqw]">
        <div className="w-[34cqw] shrink-0">
          <Image
            src={heroImage}
            alt="Cómo funciona TechToJob"
            width={600}
            height={450}
            className="w-full h-auto rounded-[1.1cqw]"
          />
        </div>

        <div className="max-w-[52cqw]">
          <h2 className="text-[2.8cqw] font-bold leading-[1.1] tracking-tight">
            {howItWorks.titleLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
        </div>
      </div>

      <div className="mt-[4cqw] grid grid-cols-4 gap-[2.4cqw]">
        {howItWorks.steps.map((step, i) => (
          <div
            key={step.number}
            className="hero-card relative flex flex-col overflow-hidden rounded-[1.1cqw] bg-white p-[1.8cqw] shadow-sm"
          >
            <LogoSymbol className="absolute top-[1.2cqw] right-[1.2cqw] w-[2cqw] h-[2cqw]" />
            <span className="flex h-[3.6cqw] w-[3.6cqw] items-center justify-center rounded-full bg-teal text-dark">
              {stepIcons[i] ?? step.number}
            </span>
            <h3 className="mt-[1.3cqw] text-[1.4cqw] font-bold leading-tight">{step.title}</h3>
            <p className="mt-[0.9cqw] line-clamp-4 text-[1.05cqw] leading-snug text-gray-500">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
