"use client";

import { useEffect, useState } from "react";

import { Button } from "@lunex-ui/react";

const colorPresets = ["blue", "red", "black", "natural"] as const;
const radiusPresets = ["sharp", "soft", "rounded"] as const;

type ColorPreset = (typeof colorPresets)[number];
type RadiusPreset = (typeof radiusPresets)[number];

export function ThemePreview() {
  const [colorPreset, setColorPreset] = useState<ColorPreset>("blue");
  const [radiusPreset, setRadiusPreset] = useState<RadiusPreset>("soft");

  useEffect(() => {
    document.documentElement.dataset.colorPreset = colorPreset;
    return () => {
      delete document.documentElement.dataset.colorPreset;
    };
  }, [colorPreset]);

  useEffect(() => {
    document.documentElement.dataset.radiusPreset = radiusPreset;
    return () => {
      delete document.documentElement.dataset.radiusPreset;
    };
  }, [radiusPreset]);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl items-center px-6 py-16">
      <section className="grid w-full gap-10 rounded-[2rem] border border-border bg-field p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)] md:grid-cols-[1.2fr_0.8fr] md:p-12">
        <div className="space-y-8">
          <div className="space-y-6">
            <span className="inline-flex items-center rounded-full bg-brand-soft px-3 py-1 text-sm font-medium text-brand-soft-foreground">
              Theme-first preview
            </span>
            <div className="space-y-3">
              <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
                Build a branded interface, not a generic one.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
                Lunex UI is a theme-first component system. Switch the palette
                and radius presets to see how the same primitives adapt to a
                different product feel in real time.
              </p>
            </div>
          </div>

          <div className="grid gap-6 rounded-lg border border-border bg-background p-6 md:grid-cols-2">
            <div className="space-y-3">
              <p className="text-sm font-medium text-foreground">Color preset</p>
              <div className="flex flex-wrap gap-3">
                {colorPresets.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setColorPreset(preset)}
                    className={`rounded-md border px-3 py-2 text-sm capitalize transition-colors ${
                      colorPreset === preset
                        ? "border-brand bg-brand text-brand-foreground"
                        : "border-border bg-background text-foreground hover:bg-muted"
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium text-foreground">Radius preset</p>
              <div className="flex flex-wrap gap-3">
                {radiusPresets.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setRadiusPreset(preset)}
                    className={`rounded-md border px-3 py-2 text-sm capitalize transition-colors ${
                      radiusPreset === preset
                        ? "border-brand bg-brand text-brand-foreground"
                        : "border-border bg-background text-foreground hover:bg-muted"
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <Button>Default Button</Button>
            <Button variant="surface">Surface</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
        </div>

        <div className="space-y-4 rounded-[1.5rem] border border-border bg-foreground p-6 text-background">
          <p className="text-sm uppercase tracking-[0.3em] text-white/60">
            System snapshot
          </p>
          <div className="grid gap-4">
            <div className="rounded-2xl bg-white/5 p-4">
              <p className="text-sm text-white/60">Active color preset</p>
              <p className="mt-2 text-lg font-medium capitalize">{colorPreset}</p>
            </div>
            <div className="rounded-2xl bg-white/5 p-4">
              <p className="text-sm text-white/60">Active radius preset</p>
              <p className="mt-2 text-lg font-medium capitalize">{radiusPreset}</p>
            </div>
            <div className="rounded-2xl bg-white/5 p-4">
              <p className="text-sm text-white/60">Lunex promise</p>
              <p className="mt-2 text-lg font-medium">
                Branded UI, faster
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
