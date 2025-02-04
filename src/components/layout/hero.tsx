"use client";

import { useRef } from "react";
import BlurFade from "@/components/ui/blur-fade";
import AnimatedShinyText from "@/components/ui/animated-shiny-text";
import { Button } from "@/components/ui/button";
import { useLogin } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";

const Hero = () => {
  const productRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { login } = useLogin({
    onComplete: async () => {
      router.push("/dashboard");
    },
  });

  return (
    <section className="relative pt-[5.75rem]" ref={productRef}>
      {/* Content */}
      <div className="relative mx-auto max-w-screen-xl px-6 pb-6 pt-12 text-center md:pb-8 md:pt-16">
        <div className="mx-auto max-w-3xl">
          <BlurFade delay={0.3} className="pointer-events-none select-none">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-muted/80 px-4 py-1.5 shadow-lg backdrop-blur-sm">
              <span className="text-sm font-medium text-primary">
                No Fuss, Just Flow 💰
              </span>
            </div>

            <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Your Personal <br />
              <AnimatedShinyText className="inline">
                <span>Onchain Copilot</span>
              </AnimatedShinyText>
            </h1>

            <p className="mt-4 text-lg text-muted-foreground">
              Build your onchain portfolio effortlessly with AI-powered
              multi-agent insights
            </p>
          </BlurFade>

          <BlurFade delay={0.4}>
            <div className="mt-8">
              <Button
                className="h-12 min-w-[180px] text-base transition-all duration-300 hover:scale-105 rounded-2xl"
                onClick={login}
              >
                Get Started
              </Button>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
};

export default Hero;
