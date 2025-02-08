"use client";

import { useRef } from "react";
import BlurFade from "@/components/ui/blur-fade";
import AnimatedShinyText from "@/components/ui/animated-shiny-text";
import { Button } from "@/components/ui/button";
import { useLogin } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
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
      <div className="relative mx-auto px-4 pb-6 pt-12 text-center md:px-6 lg:px-8 md:pb-12 md:pt-16">
        <div className="mx-auto max-w-6xl">
          <BlurFade delay={0.3}>
            <div className="pointer-events-none select-none">
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
            </div>
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

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: [20, -5, 0],
            }}
            transition={{
              duration: 0.4,
              ease: [0.4, 0.0, 0.2, 1],
              delay: 0.8,
            }}
            className="mx-auto mt-8 px-4 sm:px-6 lg:px-8"
          >
            <div className="relative rounded-lg w-full mx-auto overflow-hidden">
              <div className="aspect-[16/9] w-full">
                <Image
                  src="/assets/fund-flow-banner-v2.png"
                  width={1920}
                  height={1080}
                  alt="Fund Flow Banner"
                  className="w-full h-full rounded-3xl object-cover"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
