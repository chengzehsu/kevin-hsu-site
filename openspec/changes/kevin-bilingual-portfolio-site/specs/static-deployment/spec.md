## ADDED Requirements

### Requirement: Static export build

`pnpm build` SHALL produce a fully static `out/` directory containing `out/index.html` and `out/en/index.html`, with no server runtime required, using `output: 'export'`, `trailingSlash: true`, and `images.unoptimized: true` in `next.config.ts`. Type checking (`tsc --noEmit`) MUST pass before the build.

#### Scenario: Build output

- **WHEN** `pnpm build` completes
- **THEN** `out/index.html` and `out/en/index.html` exist and `pnpm dlx serve out` serves `/` and `/en/` correctly

#### Scenario: Temporary lab route removed

- **WHEN** the production build runs
- **THEN** no `out/lab/` directory exists

### Requirement: Zeabur static configuration

The repository root SHALL contain `zbpack.json` with `build_command` set to `pnpm build` and `output_dir` set to `out`, so that Zeabur hosts the site as a static website instead of a Node service. Dependency installation MUST work inside the sandbox through a project-local pnpm store configured in `.npmrc`, with the store, cache, and state directories git-ignored.

#### Scenario: Zeabur build

- **WHEN** Zeabur builds the project from the repository
- **THEN** it runs `pnpm build` and serves the `out` directory as static files

#### Scenario: Local install

- **WHEN** `pnpm install` runs in the sandbox
- **THEN** it succeeds using the project-local store and writes nothing outside the repository

### Requirement: Deployment verification

After deployment the live site SHALL serve `/`, `/en/`, and deep links such as `/#cases` over HTTPS on the generated `*.zeabur.app` domain, and the language switch SHALL work on the live site.

#### Scenario: Live smoke test

- **WHEN** the deployed URL is opened at `/`, `/en/`, and `/#cases`
- **THEN** each renders the expected locale and section, and switching language on the live site navigates to the other locale with the hash retained
