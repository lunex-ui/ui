import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuDescription,
  DropdownMenuFooter,
  DropdownMenuGroup,
  DropdownMenuHeader,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuLink,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTitle,
  DropdownMenuTrigger,
  Input,
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
  Textarea,
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@lunex-ui/react";

import { ShowcaseSection } from "./showcase-section";

export function OverlayDemo() {
  return (
    <>
      <ShowcaseSection
        title="Anchored overlays"
        description="Dropdown menus, tooltips, and popovers for compact contextual UI."
      >
        <div className="flex flex-wrap items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="outline">Open menu</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-64">
              <DropdownMenuHeader>
                <DropdownMenuTitle>Workspace</DropdownMenuTitle>
                <DropdownMenuDescription>
                  Manage preview actions and review flow.
                </DropdownMenuDescription>
              </DropdownMenuHeader>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem>
                  Open preview
                  <DropdownMenuShortcut>OP</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Duplicate theme
                  <DropdownMenuShortcut>DT</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuLink href="https://github.com/lunex-ui/ui">
                  View repository
                  <DropdownMenuShortcut>GH</DropdownMenuShortcut>
                </DropdownMenuLink>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuFooter>
                <DropdownMenuItem className="text-danger hover:bg-danger/10">
                  Archive workspace
                </DropdownMenuItem>
              </DropdownMenuFooter>
            </DropdownMenuContent>
          </DropdownMenu>

          <Tooltip>
            <TooltipTrigger>
              <Button size="sm" variant="outline">
                Hover me
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Explain a small action without taking over the layout.
            </TooltipContent>
          </Tooltip>

          <Popover>
            <PopoverTrigger>
              <Button variant="secondary">Open popover</Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverHeader>
                <PopoverTitle>Quick workspace note</PopoverTitle>
                <PopoverDescription>
                  Capture short feedback without opening a full dialog.
                </PopoverDescription>
              </PopoverHeader>
              <div className="mt-4 grid gap-3">
                <Input placeholder="Add a short note" />
                <Button size="sm">Save note</Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Dialog"
        description="Modal surfaces for focused actions, confirmations, and short workflows."
      >
        <Dialog>
          <DialogTrigger>
            <Button>Open dialog</Button>
          </DialogTrigger>
          <DialogOverlay />
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Share workspace</DialogTitle>
              <DialogDescription>
                Invite collaborators and keep the latest Lunex iteration moving.
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
      </ShowcaseSection>
    </>
  );
}
