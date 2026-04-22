"use client";

import { useEffect, useState } from "react";

import { Button } from "@lunex-ui/react";
import {
  defaultPresetState,
  getPresetOption,
  presetConfig,
  type ActivePresetState,
  type PresetCategory
} from "./theme-presets";
import { validatePresetConfig, validateResolvedTheme } from "./theme-validation";

export function ThemePreview() {
  const [activePresets, setActivePresets] =
    useState<ActivePresetState>(defaultPresetState);
  const [validationIssues, setValidationIssues] = useState<string[]>([]);
  const [missingThemeVariables, setMissingThemeVariables] = useState<string[]>(
    []
  );

  useEffect(() => {
    const root = document.documentElement;
    const entries = Object.entries(presetConfig) as [
      PresetCategory,
      (typeof presetConfig)[PresetCategory]
    ][];

    for (const [category, config] of entries) {
      root.dataset[config.datasetKey] = activePresets[category];
    }

    return () => {
      for (const [, config] of entries) {
        delete root.dataset[config.datasetKey];
      }
    };
  }, [activePresets]);

  useEffect(() => {
    const configIssues = validatePresetConfig();
    const { missingVariables } = validateResolvedTheme(document.documentElement);
    const nextIssues = [...configIssues];

    if (missingVariables.length > 0) {
      nextIssues.push(
        `Missing resolved theme variables: ${missingVariables.join(", ")}`
      );
    }

    setMissingThemeVariables(missingVariables);
    setValidationIssues(nextIssues);

    if (process.env.NODE_ENV !== "production" && nextIssues.length > 0) {
      console.warn("[Lunex UI] Theme validation issues detected:", nextIssues);
    }
  }, [activePresets]);

  function setPreset<TCategory extends PresetCategory>(
    category: TCategory,
    value: ActivePresetState[TCategory]
  ) {
    setActivePresets((current) => ({
      ...current,
      [category]: value
    }));
  }

  const activeColorPreset = getPresetOption("color", activePresets.color);
  const activeRadiusPreset = getPresetOption("radius", activePresets.radius);

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
            {(Object.entries(presetConfig) as [
              PresetCategory,
              (typeof presetConfig)[PresetCategory]
            ][]).map(([category, config]) => (
              <div key={category} className="space-y-3">
                <p className="text-sm font-medium text-foreground">
                  {config.label}
                </p>
                <div className="flex flex-wrap gap-3">
                  {config.options.map((option) => {
                    const isActive = activePresets[category] === option.value;

                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setPreset(category, option.value)}
                        className={`rounded-md border px-3 py-2 text-sm transition-colors ${
                          isActive
                            ? "border-brand bg-brand text-brand-foreground"
                            : "border-border bg-background text-foreground hover:bg-muted"
                        }`}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <Button>Default Button</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="surface">Surface</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link Button</Button>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="xs">Extra small</Button>
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
              <Button size="icon" aria-label="Favorite" startContent="*" />
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Button startContent={<span aria-hidden="true">+</span>}>
                Start content
              </Button>
              <Button endContent="->">End content</Button>
              <Button loading loadingText="Saving">
                Save changes
              </Button>
              <Button disabled>Disabled</Button>
            </div>
          </div>
        </div>

        <div className="space-y-4 rounded-[1.5rem] border border-border bg-foreground p-6 text-background">
          <p className="text-sm uppercase tracking-[0.3em] text-white/60">
            System snapshot
          </p>
          <div className="grid gap-4">
            <div className="rounded-2xl bg-white/5 p-4">
              <p className="text-sm text-white/60">Active color preset</p>
              <p className="mt-2 text-lg font-medium">
                {activeColorPreset?.label}
              </p>
              <p className="mt-1 text-sm text-white/60">
                {activeColorPreset?.description}
              </p>
            </div>
            <div className="rounded-2xl bg-white/5 p-4">
              <p className="text-sm text-white/60">Active radius preset</p>
              <p className="mt-2 text-lg font-medium">
                {activeRadiusPreset?.label}
              </p>
              <p className="mt-1 text-sm text-white/60">
                {activeRadiusPreset?.description}
              </p>
            </div>
            <div className="rounded-2xl bg-white/5 p-4">
              <p className="text-sm text-white/60">Lunex promise</p>
              <p className="mt-2 text-lg font-medium">Branded UI, faster</p>
            </div>
            <div className="rounded-2xl bg-white/5 p-4">
              <p className="text-sm text-white/60">Theme validation</p>
              <p className="mt-2 text-lg font-medium">
                {validationIssues.length === 0 ? "Healthy" : "Needs attention"}
              </p>
              <p className="mt-1 text-sm text-white/60">
                {validationIssues.length === 0
                  ? "Preset config and required theme variables are resolving correctly."
                  : `${validationIssues.length} issue(s) detected in the current theme setup.`}
              </p>
              {missingThemeVariables.length > 0 ? (
                <p className="mt-2 text-xs text-white/50">
                  Missing: {missingThemeVariables.join(", ")}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
