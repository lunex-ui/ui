export const presetConfig = {
  color: {
    label: "Color preset",
    datasetKey: "colorPreset",
    defaultValue: "blue",
    options: [
      {
        value: "blue",
        label: "Blue",
        description: "Crisp and familiar product blues."
      },
      {
        value: "red",
        label: "Red",
        description: "Warmer, louder brand energy."
      },
      {
        value: "black",
        label: "Black",
        description: "High-contrast, editorial surfaces."
      },
      {
        value: "natural",
        label: "Natural",
        description: "Softer earth-toned neutrals."
      }
    ]
  },
  radius: {
    label: "Radius preset",
    datasetKey: "radiusPreset",
    defaultValue: "soft",
    options: [
      {
        value: "sharp",
        label: "Sharp",
        description: "Crisp corners and harder geometry."
      },
      {
        value: "soft",
        label: "Soft",
        description: "Balanced default rounding."
      },
      {
        value: "rounded",
        label: "Rounded",
        description: "Friendly pill-shaped geometry."
      }
    ]
  }
} as const;

export type PresetCategory = keyof typeof presetConfig;

export type PresetValue<TCategory extends PresetCategory> =
  (typeof presetConfig)[TCategory]["options"][number]["value"];

export type ActivePresetState = {
  [TCategory in PresetCategory]: PresetValue<TCategory>;
};

export const defaultPresetState: ActivePresetState = {
  color: presetConfig.color.defaultValue,
  radius: presetConfig.radius.defaultValue
};

export function getPresetOption<TCategory extends PresetCategory>(
  category: TCategory,
  value: PresetValue<TCategory>
) {
  return presetConfig[category].options.find((option) => option.value === value);
}
