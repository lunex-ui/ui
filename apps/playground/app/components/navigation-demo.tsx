import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Pagination,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationList,
  PaginationNext,
  PaginationPrevious,
  Stepper,
  StepperContent,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@lunex-ui/react";

import { ShowcaseSection } from "./showcase-section";

export function NavigationDemo() {
  return (
    <>
      <ShowcaseSection
        title="Breadcrumb and pagination"
        description="Navigation primitives for docs, dashboards, tables, and nested app surfaces."
      >
        <div className="space-y-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Docs</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Components</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Navigation</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <Pagination>
            <PaginationList>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" active>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">8</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationList>
          </Pagination>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Stepper"
        description="Guided multi-step progress for onboarding, checkout, and setup flows."
      >
        <Stepper currentStep={2}>
          <StepperItem step={1}>
            <div className="flex gap-3">
              <StepperIndicator step={1} />
              <StepperContent>
                <StepperTitle>Create workspace</StepperTitle>
                <StepperDescription>
                  Name the workspace and choose the initial theme preset.
                </StepperDescription>
              </StepperContent>
            </div>
            <StepperSeparator />
          </StepperItem>
          <StepperItem step={2}>
            <div className="flex gap-3">
              <StepperIndicator step={2} />
              <StepperContent>
                <StepperTitle>Invite the team</StepperTitle>
                <StepperDescription>
                  Add collaborators and assign the first review flow.
                </StepperDescription>
              </StepperContent>
            </div>
            <StepperSeparator />
          </StepperItem>
          <StepperItem step={3}>
            <div className="flex gap-3">
              <StepperIndicator step={3} />
              <StepperContent>
                <StepperTitle>Ship the first screen</StepperTitle>
                <StepperDescription>
                  Publish the branded preview and collect product feedback.
                </StepperDescription>
              </StepperContent>
            </div>
          </StepperItem>
        </Stepper>
      </ShowcaseSection>

      <ShowcaseSection
        title="Accordion and tabs"
        description="Expandable content and structured views for docs, settings, and grouped panels."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Accordion defaultValue="tokens">
            <AccordionItem value="tokens">
              <AccordionTrigger>How do Lunex tokens work?</AccordionTrigger>
              <AccordionContent>
                Lunex uses semantic tokens first, then maps components onto those
                roles so themes can shift the whole product feel.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="components">
              <AccordionTrigger>What ships in the React package?</AccordionTrigger>
              <AccordionContent>
                Core primitives, form controls, feedback surfaces, overlays, and
                layout helpers live in the same package.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="tokens">Tokens</TabsTrigger>
              <TabsTrigger value="usage">Usage</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <p className="text-sm text-muted-foreground">
                Lunex primitives adapt cleanly across color and radius presets.
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
                Use Tabs when users switch between related views in one context.
              </p>
            </TabsContent>
          </Tabs>
        </div>
      </ShowcaseSection>
    </>
  );
}
