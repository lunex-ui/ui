import type { getPresetOption } from "../theme-presets";

type ResolvedPresetOption = ReturnType<typeof getPresetOption>;

export function SystemSnapshot({
  activeColorPreset,
  activeRadiusPreset,
  missingThemeVariables,
  validationIssues
}: {
  activeColorPreset?: ResolvedPresetOption;
  activeRadiusPreset?: ResolvedPresetOption;
  missingThemeVariables: string[];
  validationIssues: string[];
}) {
  return (
    <div className="space-y-4 rounded-[1.5rem] border border-border bg-foreground p-6 text-background">
      <p className="text-sm uppercase tracking-[0.3em] text-white/60">
        System snapshot
      </p>
      <div className="grid gap-4">
        <div className="rounded-2xl bg-white/5 p-4">
          <p className="text-sm text-white/60">Active color preset</p>
          <p className="mt-2 text-lg font-medium">{activeColorPreset?.label}</p>
          <p className="mt-1 text-sm text-white/60">
            {activeColorPreset?.description}
          </p>
        </div>
        <div className="rounded-2xl bg-white/5 p-4">
          <p className="text-sm text-white/60">Active radius preset</p>
          <p className="mt-2 text-lg font-medium">{activeRadiusPreset?.label}</p>
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
  );
}
