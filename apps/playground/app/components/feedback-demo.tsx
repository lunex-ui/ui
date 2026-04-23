import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Card,
  CardContent,
  CardHeader,
  EmptyState,
  EmptyStateActions,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
  Progress,
  Skeleton,
  Spinner,
  Toast,
  ToastAction,
  ToastDescription,
  ToastTitle
} from "@lunex-ui/react";

import { ShowcaseSection } from "./showcase-section";

export function FeedbackDemo() {
  return (
    <>
      <ShowcaseSection
        title="Alerts and toasts"
        description="Inline and transient feedback surfaces for product states."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Alert>
            <AlertTitle>Workspace updated</AlertTitle>
            <AlertDescription>
              Your theme tokens were saved and published to the preview environment.
            </AlertDescription>
          </Alert>
          <Toast variant="success">
            <ToastTitle>Invite sent</ToastTitle>
            <ToastDescription>
              Three collaborators were added to the workspace review.
            </ToastDescription>
            <ToastAction>View team</ToastAction>
          </Toast>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Loading states"
        description="Progress, skeleton, and spinner primitives for async product flows."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-4">
            <Progress value={48} showValue />
            <Progress value={82} variant="success" size="lg" showValue />
            <div className="inline-flex items-center gap-2 rounded-md bg-foreground px-3 py-2 text-background">
              <Spinner variant="inverse" />
              <span className="text-sm">Publishing</span>
            </div>
          </div>
          <Card padding="sm">
            <CardHeader className="space-y-3">
              <Skeleton variant="circle" className="h-10 w-10" />
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-4 w-28" />
            </CardHeader>
            <CardContent className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-24 w-full" />
            </CardContent>
          </Card>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Empty state"
        description="Fallback UI for empty lists, dashboards, search results, and first-run flows."
      >
        <EmptyState>
          <EmptyStateIcon>+</EmptyStateIcon>
          <EmptyStateTitle>No releases yet</EmptyStateTitle>
          <EmptyStateDescription>
            Start your first Lunex release to track feedback, publish previews,
            and share changes.
          </EmptyStateDescription>
          <EmptyStateActions>
            <Button size="sm">Create release</Button>
            <Button size="sm" variant="ghost">
              Learn more
            </Button>
          </EmptyStateActions>
        </EmptyState>
      </ShowcaseSection>
    </>
  );
}
