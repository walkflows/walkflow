import type { Metadata } from "next";
import { Demonstration } from "@/components/sections/home/Demonstration";
import { FAQ } from "@/components/sections/home/FAQ";
import { FinalCta } from "@/components/sections/home/FinalCta";
import { Hero } from "@/components/sections/home/Hero";
import { Industries } from "@/components/sections/home/Industries";
import { Problem } from "@/components/sections/home/Problem";
import { WhatWeBuild } from "@/components/sections/home/WhatWeBuild";
import { WhyAndProcess } from "@/components/sections/home/WhyAndProcess";
import { homeSeo } from "@/content/home";

export const metadata: Metadata = {
  title: homeSeo.title,
  description: homeSeo.description,
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Problem />
      <WhatWeBuild />
      <Industries />
      <Demonstration />
      <WhyAndProcess />
      <FAQ />
      <FinalCta />
    </>
  );
}
