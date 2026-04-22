import { presetConfig, type PresetCategory } from "./theme-presets";

const requiredThemeVariables = [
  "--background",
  "--foreground",
  "--border",
  "--focus",
  "--brand",
  "--brand-foreground",
  "--surface",
  "--surface-foreground",
  "--muted",
  "--muted-foreground",
  "--radius-sm",
  "--radius-md",
  "--radius-lg"
] as const;

export function validatePresetConfig() {
  const issues: string[] = [];
  const entries = Object.entries(presetConfig) as [
    PresetCategory,
    (typeof presetConfig)[PresetCategory]
  ][];

  for (const [category, config] of entries) {
    const values = config.options.map((option) => option.value);
    const uniqueValues = new Set(values);

    if (!values.includes(config.defaultValue)) {
      issues.push(
        `${category} preset default "${config.defaultValue}" is not defined in options.`
      );
    }

    if (uniqueValues.size !== values.length) {
      issues.push(`${category} preset options contain duplicate values.`);
    }

    for (const option of config.options) {
      if (!option.label.trim()) {
        issues.push(`${category} preset "${option.value}" is missing a label.`);
      }

      if (!option.description.trim()) {
        issues.push(
          `${category} preset "${option.value}" is missing a description.`
        );
      }
    }
  }

  return issues;
}

export function validateResolvedTheme(root: HTMLElement) {
  const styles = getComputedStyle(root);
  const missingVariables = requiredThemeVariables.filter((variable) => {
    const value = styles.getPropertyValue(variable).trim();
    return value.length === 0;
  });

  return {
    missingVariables,
    requiredCount: requiredThemeVariables.length
  };
}
