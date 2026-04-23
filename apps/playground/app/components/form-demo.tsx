import {
  Checkbox,
  Combobox,
  Field,
  Input,
  Label,
  OtpInput,
  RadioGroup,
  RadioGroupItem,
  Select,
  Slider,
  Switch,
  Textarea
} from "@lunex-ui/react";

import { ShowcaseSection } from "./showcase-section";

export function FormDemo() {
  return (
    <>
      <ShowcaseSection
        title="Form foundation"
        description="Labels, fields, validation copy, and field controls under the same token system."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Field
            htmlFor="field-workspace"
            label="Workspace name"
            description="This name appears in invites and project sharing."
            required
          >
            <Input id="field-workspace" placeholder="Lunex Launch Team" />
          </Field>
          <Field
            htmlFor="field-domain"
            label="Verified domain"
            error="This domain is already connected to another workspace."
          >
            <Input id="field-domain" invalid defaultValue="lunex-ui.dev" />
          </Field>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Selection controls"
        description="Checkboxes, switches, and radio groups for product settings and preference flows."
      >
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
            <Switch id="switch-live" defaultChecked />
            <span className="space-y-1">
              <Label htmlFor="switch-live">Live preview</Label>
              <span className="block text-sm text-muted-foreground">
                Update the playground instantly while tokens change.
              </span>
            </span>
          </div>
        </div>
        <RadioGroup
          name="plan"
          defaultValue="pro"
          orientation="horizontal"
          className="mt-4"
        >
          <RadioGroupItem
            value="starter"
            label="Starter"
            description="For early previews and individual experiments."
          />
          <RadioGroupItem
            value="pro"
            label="Pro"
            description="For product teams building branded interfaces."
          />
        </RadioGroup>
      </ShowcaseSection>

      <ShowcaseSection
        title="Text entry"
        description="Input, textarea, select, combobox, OTP input, and slider examples."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Input placeholder="Default input" />
          <Select placeholder="Choose a theme role">
            <option value="brand">Brand</option>
            <option value="surface">Surface</option>
            <option value="field">Field</option>
          </Select>
          <Combobox
            placeholder="Search a team"
            options={[
              { label: "Core UI", value: "Core UI" },
              { label: "Design Systems", value: "Design Systems" },
              { label: "Growth", value: "Growth" }
            ]}
          />
          <Slider defaultValue={48} showValue />
          <div className="space-y-2">
            <Label htmlFor="otp-default">One-time code</Label>
            <OtpInput id="otp-default" defaultValue="2814" length={6} />
          </div>
          <Textarea placeholder="Write product notes" />
        </div>
      </ShowcaseSection>
    </>
  );
}
