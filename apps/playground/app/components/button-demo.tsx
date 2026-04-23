import { Button } from "@lunex-ui/react";

export function ButtonDemo() {
  return (
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
  );
}
