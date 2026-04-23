import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Code,
  Kbd,
  Separator,
  Stat,
  StatDescription,
  StatLabel,
  StatTrend,
  StatValue,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@lunex-ui/react";

import { ShowcaseSection } from "./showcase-section";

export function DataDemo() {
  return (
    <>
      <ShowcaseSection
        title="Badges, avatars, keyboard, and separators"
        description="Small primitives for metadata, identity, shortcuts, and section structure."
      >
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <Badge>Default</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="danger">Danger</Badge>
            <Separator orientation="vertical" className="h-6" />
            <Kbd>Ctrl</Kbd>
            <Kbd>K</Kbd>
          </div>
          <AvatarGroup>
            <Avatar>
              <AvatarFallback>LN</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>UI</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>KT</AvatarFallback>
            </Avatar>
            <AvatarGroupCount>+4</AvatarGroupCount>
          </AvatarGroup>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Stats"
        description="Dashboard metric cards for product analytics, usage, and release health."
      >
        <div className="grid gap-4 md:grid-cols-3">
          <Stat>
            <StatLabel>Components</StatLabel>
            <StatValue>42</StatValue>
            <StatDescription>
              <StatTrend>+8 this week</StatTrend>
            </StatDescription>
          </Stat>
          <Stat variant="surface">
            <StatLabel>Preview installs</StatLabel>
            <StatValue>1.8k</StatValue>
            <StatDescription>Across internal test apps</StatDescription>
          </Stat>
          <Stat variant="brand">
            <StatLabel>Theme health</StatLabel>
            <StatValue>98%</StatValue>
            <StatDescription>Semantic tokens resolving</StatDescription>
          </Stat>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Cards and code"
        description="Content containers and developer-facing snippets."
      >
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
                This card uses the default surface and spacing tokens from Lunex.
              </p>
            </CardContent>
            <CardFooter>
              <Button size="sm">Open</Button>
            </CardFooter>
          </Card>
          <Code variant="block">
            {`import { Button } from "@lunex-ui/react";

export function App() {
  return <Button>Launch Lunex</Button>;
}`}
          </Code>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Table"
        description="Structured data display for release history, tokens, reviewers, and admin surfaces."
      >
        <Table>
          <TableCaption>Recent preview releases for the active workspace.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Release</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Branch</TableHead>
              <TableHead className="text-right">Reviewers</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">v0.3.0-alpha</TableCell>
              <TableCell>
                <Badge variant="success">Live</Badge>
              </TableCell>
              <TableCell>v3/core-components</TableCell>
              <TableCell className="text-right">4</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">v0.2.9</TableCell>
              <TableCell>
                <Badge variant="surface">Preview</Badge>
              </TableCell>
              <TableCell>main</TableCell>
              <TableCell className="text-right">2</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ShowcaseSection>
    </>
  );
}
