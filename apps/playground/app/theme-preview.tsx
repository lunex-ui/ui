"use client";

import { useEffect, useState } from "react";

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
  Checkbox,
  Input,
  Label,
  Select,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea
} from "@lunex-ui/react";
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
              <Button selected>Selected</Button>
            </div>
          </div>

          <div className="space-y-4 rounded-lg border border-border bg-background p-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">Labels</p>
              <p className="text-sm text-muted-foreground">
                Lightweight form labels that stay consistent with Lunex field
                sizing and required states.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="playground-email" required>
                  Email address
                </Label>
                <Input
                  id="playground-email"
                  placeholder="name@lunex.dev"
                  startContent={<span aria-hidden="true">@</span>}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="playground-team" size="lg">
                  Team name
                </Label>
                <Input id="playground-team" placeholder="Lunex Core" />
              </div>
            </div>
          </div>

          <div className="space-y-4 rounded-lg border border-border bg-background p-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">Checkboxes</p>
              <p className="text-sm text-muted-foreground">
                Foundational selection controls for forms, filters, and
                workspace preferences.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-start gap-3 rounded-md border border-border p-4">
                <Checkbox id="checkbox-launch" defaultChecked />
                <span className="space-y-1">
                  <Label htmlFor="checkbox-launch">Launch checklist</Label>
                  <span className="block text-sm text-muted-foreground">
                    Include this task in the current release review.
                  </span>
                </span>
              </div>
              <div className="flex items-start gap-3 rounded-md border border-border p-4">
                <Checkbox id="checkbox-terms" invalid />
                <span className="space-y-1">
                  <Label htmlFor="checkbox-terms" required>
                    Terms confirmation
                  </Label>
                  <span className="block text-sm text-muted-foreground">
                    This invalid state helps surface required consent.
                  </span>
                </span>
              </div>
              <div className="flex items-start gap-3 rounded-md border border-border p-4">
                <Checkbox id="checkbox-compact" size="sm" />
                <span className="space-y-1">
                  <Label htmlFor="checkbox-compact" size="sm">
                    Compact option
                  </Label>
                  <span className="block text-sm text-muted-foreground">
                    Smaller controls for dense filter lists.
                  </span>
                </span>
              </div>
              <div className="flex items-start gap-3 rounded-md border border-border p-4">
                <Checkbox id="checkbox-disabled" size="lg" disabled defaultChecked />
                <span className="space-y-1">
                  <Label htmlFor="checkbox-disabled">Disabled selection</Label>
                  <span className="block text-sm text-muted-foreground">
                    Preserves the checked state while indicating it cannot
                    change.
                  </span>
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4 rounded-lg border border-border bg-background p-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">Input states</p>
              <p className="text-sm text-muted-foreground">
                Foundational field styles, invalid states, and adornments under
                the active theme.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Input placeholder="Default input" />
              <Input
                variant="surface"
                placeholder="Surface input"
                startContent={<span aria-hidden="true">@</span>}
              />
              <Input
                invalid
                defaultValue="wrong@email"
                endContent={<span aria-hidden="true">!</span>}
              />
              <Input disabled placeholder="Disabled input" />
              <Input size="sm" placeholder="Small input" />
              <Input size="lg" placeholder="Large input" />
            </div>
          </div>

          <div className="space-y-4 rounded-lg border border-border bg-background p-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">Select states</p>
              <p className="text-sm text-muted-foreground">
                Foundational select field styles under the same token and state
                system as Lunex inputs.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Select placeholder="Choose a theme role">
                <option value="brand">Brand</option>
                <option value="surface">Surface</option>
                <option value="field">Field</option>
              </Select>
              <Select
                variant="surface"
                startContent={<span aria-hidden="true">@</span>}
                defaultValue="workspace"
              >
                <option value="workspace">Workspace</option>
                <option value="billing">Billing</option>
                <option value="notifications">Notifications</option>
              </Select>
              <Select invalid defaultValue="danger">
                <option value="success">Success</option>
                <option value="warning">Warning</option>
                <option value="danger">Danger</option>
              </Select>
              <Select disabled defaultValue="disabled">
                <option value="disabled">Disabled select</option>
              </Select>
            </div>
          </div>

          <div className="space-y-4 rounded-lg border border-border bg-background p-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">
                Textarea states
              </p>
              <p className="text-sm text-muted-foreground">
                Multi-line field styles under the same token and state system.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Textarea placeholder="Default textarea" />
              <Textarea
                variant="surface"
                placeholder="Surface textarea"
                defaultValue="A longer field for product notes and copy blocks."
              />
              <Textarea invalid defaultValue="This state needs attention." />
              <Textarea disabled placeholder="Disabled textarea" />
            </div>
          </div>

          <div className="space-y-4 rounded-lg border border-border bg-background p-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">Badges</p>
              <p className="text-sm text-muted-foreground">
                Lightweight status and label chips for metadata and system
                states.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Badge>Default</Badge>
              <Badge variant="surface">Surface</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="danger">Danger</Badge>
            </div>
          </div>

          <div className="space-y-4 rounded-lg border border-border bg-background p-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">Cards</p>
              <p className="text-sm text-muted-foreground">
                Content containers for summaries, settings, and dashboard
                surfaces.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Starter card</CardTitle>
                  <CardDescription>
                    Use Cards to group related content and actions.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    This card uses the default surface and spacing tokens from
                    Lunex.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button size="sm">Open</Button>
                </CardFooter>
              </Card>
              <Card variant="surface" radius="soft">
                <CardHeader>
                  <CardTitle>Surface card</CardTitle>
                  <CardDescription>
                    A softer content container for layered layouts.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  <Badge variant="success">Live</Badge>
                  <Badge variant="outline">Beta</Badge>
                </CardContent>
                <CardFooter>
                  <Button variant="secondary" size="sm">
                    Manage
                  </Button>
                </CardFooter>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Card radius="sharp" padding="sm">
                <CardHeader>
                  <CardTitle>Sharp</CardTitle>
                </CardHeader>
              </Card>
              <Card radius="soft" padding="sm">
                <CardHeader>
                  <CardTitle>Soft</CardTitle>
                </CardHeader>
              </Card>
            </div>
          </div>

          <div className="space-y-4 rounded-lg border border-border bg-background p-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">Dialog</p>
              <p className="text-sm text-muted-foreground">
                Modal surfaces for focused actions, confirmations, and short
                workflows.
              </p>
            </div>
            <Dialog>
              <DialogTrigger>
                <Button>Open dialog</Button>
              </DialogTrigger>
              <DialogOverlay />
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Share workspace</DialogTitle>
                  <DialogDescription>
                    Invite collaborators and keep the latest Lunex iteration
                    moving.
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-4 grid gap-3">
                  <Input placeholder="teammate@email.com" />
                  <Textarea
                    size="sm"
                    defaultValue="Adding you to the active Lunex workspace review."
                  />
                </div>
                <DialogFooter>
                  <DialogClose>
                    <Button variant="ghost">Cancel</Button>
                  </DialogClose>
                  <DialogClose>
                    <Button>Send invite</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-4 rounded-lg border border-border bg-background p-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">Tabs</p>
              <p className="text-sm text-muted-foreground">
                Structured views for settings, analytics, and grouped content.
              </p>
            </div>
            <Tabs defaultValue="overview">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="tokens">Tokens</TabsTrigger>
                <TabsTrigger value="usage">Usage</TabsTrigger>
              </TabsList>
              <TabsContent value="overview">
                <p className="text-sm text-muted-foreground">
                  Lunex is building theme-first primitives that adapt cleanly
                  across color and radius presets.
                </p>
              </TabsContent>
              <TabsContent value="tokens">
                <div className="flex flex-wrap gap-2">
                  <Badge>Brand</Badge>
                  <Badge variant="surface">Surface</Badge>
                  <Badge variant="outline">Border</Badge>
                </div>
              </TabsContent>
              <TabsContent value="usage">
                <p className="text-sm text-muted-foreground">
                  Use Tabs when users need to switch between related views
                  without leaving the current page context.
                </p>
              </TabsContent>
            </Tabs>
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
