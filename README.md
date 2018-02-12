
# README

## Requirement

```bash
Angular CLI: 1.5.4
Node: 8.6.0
Angular: 5.2.1
... animations, common, compiler, compiler-cli, core, forms
... http, language-service, platform-browser
... platform-browser-dynamic, router

@angular/cli: 1.5.4
@angular-devkit/build-optimizer: 0.0.41
@angular-devkit/core: 0.0.28
@angular-devkit/schematics: 0.0.51
@ngtools/json-schema: 1.1.0
@ngtools/webpack: 1.8.4
@schematics/angular: 0.1.16
typescript: 2.4.2
webpack: 3.8.1
```

## Project structure

```bash
+--/src/app
|   |
|   +--/core
|   |   |
|   |   +--/services
|   |   |
|   |   +--/store
|   |   |   |
|   |   |   +--/STATE-ONE
|   |   |   |   |
|   |   |   |   +--/actions
|   |   |   |   |
|   |   |   |   +--/reducers
|   |   |   |   |
|   |   |   |   +--/effects
|   |   |   |   |
|   |   |   |   +--/services
|   |   |   |
|   |   |   +--/STATE-TWO
|   |   |   |
|   |   |   +--reducers.ts (or index.ts)
|   |   |
|   |   +--core.module.ts
|   |
|   +--/features
|   |   |
|   |   +--/FEATURE-MODULE1
|   |   |
|   |   +--/FEATURE-MODULE2
|   |
|   +--/shared
|   |   |
|   |   +--/components
|   |   |
|   |   +--/directives
|   |   |
|   |   +--/pipes
|   |   |
|   |   +--/utils
|   |   |
|   |   +--shared.module.ts
|   |
|   +--app-routing.module.ts
|   |
|   +--app.module.ts

```

## How to run

```bash
git clone https://github.com/returnonclick/spacenow_client_v5

yarn

# Create .env at project root and fill up firebase account setting
# Update environment.ts by running
npm run config

ng serve --open
```

## Git commit & change log update

When doing `git commit` make sure to update CHANGELOG file by using [standard-version](https://github.com/conventional-changelog/standard-version)

**Example**

```bash
git add .
git commit -a -m "feat(NEW FEATURE): New feature description"
npm run release -- --prerelease alpha
git push --follow-tags origin master
```



