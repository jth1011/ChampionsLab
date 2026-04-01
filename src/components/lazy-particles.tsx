"use client";

import dynamic from "next/dynamic";

const PokeballParticles = dynamic(
  () => import("@/components/pokeball-particles").then(m => m.PokeballParticles),
  { ssr: false }
);

export function LazyParticles() {
  return <PokeballParticles />;
}
