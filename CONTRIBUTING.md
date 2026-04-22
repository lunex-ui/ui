# Contributing to Lunex UI

Lunex UI is being built in public and in phases.

The goal is to keep the project approachable for contributors while still protecting the quality bar of a UI library. Small, clear pull requests are strongly preferred over broad feature dumps.

## How We Work

The project is organized into major phases.

- `Phase 0`: foundation, positioning, and contributor workflow
- `Phase 1`: design tokens and theme core
- `Phase 2`: shared component standards
- `Phase 3`: core components
- `Phase 4`: docs and showcase
- `Phase 5`: quality, testing, and releases

When contributing, try to align your work with the current phase or with an accepted issue for a future phase.

## Before You Start

Before opening a pull request:

- check whether an issue or discussion already exists
- open an issue first for large API changes or new component proposals
- keep scope tight and focused on one problem
- confirm your work fits the current roadmap direction

Good early contributions:

- docs and examples
- accessibility improvements
- theme token polish
- playground improvements
- focused API improvements to existing components

## Branch Strategy

We use focused branches so roadmap work stays easy to review.

### Long-lived branches

These represent larger workstreams:

- `main`
- `v1/design-tokens`
- `v1/component-api`
- `v1/playground`

### Short-lived branches

Feature and documentation work should usually happen in short-lived branches such as:

- `v1/positioning`
- `v1/button-api`
- `v1/button-states`
- `v1/theme-api`
- `v1/docs-foundation`

Recommended naming patterns:

- `v1/<workstream>`
- `docs/<topic>`
- `fix/<topic>`

Keep names descriptive and avoid using one branch for unrelated changes.

## Pull Request Guidelines

Pull requests should be:

- small enough to review comfortably
- focused on one feature, fix, or documentation improvement
- explained clearly in the PR description
- tested in the playground when UI behavior changes

If your change is large, split it into follow-up PRs instead of trying to land everything at once.

## Suggested Contribution Flow

1. Sync from the current base branch.
2. Create a focused branch.
3. Make the smallest useful change that moves the current phase forward.
4. Run the relevant checks locally.
5. Open a PR with a clear summary and screenshots when UI is affected.

Example:

```bash
git fetch origin
git checkout origin/main -b v1/button-api
pnpm install
pnpm dev
git add .
git commit -m "feat: improve button variants and sizes"
git push -u origin v1/button-api
```

## Quality Expectations

For component work, contributors should think beyond the happy path.

Check for:

- keyboard behavior
- focus visibility
- disabled states
- loading or pending states where relevant
- theme compatibility
- mobile and desktop behavior in the playground

## Review Criteria

Changes are easier to merge when they:

- match the current phase of the project
- do not introduce unrelated refactors
- preserve or improve accessibility
- improve the library's consistency
- come with docs or examples when the API changes

## Communication

If you are unsure whether something fits the roadmap, open an issue or draft PR and start the conversation early.

Clear discussion is better than building a large contribution in isolation.
