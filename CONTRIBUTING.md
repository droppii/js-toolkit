# Contributing

We recommend that you use an [example](./example) or external app when
developing and testing changes to this library.

You can install all the dependencies in the root directory. Since the monorepo
uses Turborepo and pnpm Workspaces, npm CLI is not supported (only pnpm).

```sh
pnpm install
```

This will install all dependencies in each project, build them, and symlink them
via Turbo

## Development workflow

Because react-toolkit is a multi-package monorepo, one can work on multiple
packages at the same time or on a single package within the larger set. All
commands made from the root directory of the repo will execute that command in
each of its packages.

This will launch and watch all packages within react-toolkit.

```sh
pnpm start:app
```

It is most often the case that developers are interesting in making changes in a
single package within the monorepo. For those cases, it is faster to cd into the
packages directory and behave as if you were working within a single project
repository.

```sh
cd packages/hooks
pnpm start
```

Each package builds into it's `<packages>/<package>/dist` directory and runs the
project in watch mode so any edits you save inside `<packages>/<package>/src`
cause a rebuild to `<packages>/<package>/dist`. The results will stream to to
the terminal.

### Using the example/playground

You can play with local packages in the Parcel-powered example/playground.

```sh
cd example
pnpm
pnpm dev
```

This will start the example/playground on `localhost:3000`. If you have Turbo
running watch in parallel mode in one terminal, and then you run parcel, your
playground will hot reload when you make changes to any imported module whose
source is inside of `packages/*/src/*`.

Important Safety Tip: When adding/altering packages in the playground, use
`alias` object in package.json. This will tell Parcel to resolve them to the
filesystem instead of trying to install the package from NPM. It also fixes
duplicate React errors you may run into.

#### pnpm link

https://pnpm.io/cli/link `pnpm link` is a command that helps during the
development of npm packages. It links a local npm package to an existing project
that uses pnpm package manager. This will be helpful to make local changes to
react-toolkit reflected on other packages seamlessly

## Link

1. cd to the package you want to link (for example, `./packages/hooks`), then
   run:

```sh
pnpm link
```

notice the package name on package.json, it should be `@droppii/*`. In this case
we have `@droppii/react-hooks`

2. cd to the repository you want to link `@droppii/react-hooks` with, then run

```sh
pnpm link @droppii/react-hooks
```

now `./packages/hooks` will be linked to `{YOUR_REPO}/node_modules` and changes
to `./packages/hooks/dist` will affect that repository instantly

## Unlink

If you don't want to use the local package anymore, run

```sh
pnpm unlink @droppii/react-hooks
pnpm install --force
```

to use the remote package

## Unlink all

To clear all the linked packages in the current directory, run

```sh
pnpm unlink
pnpm install --force
```

## Release

We use [Changesets](https://github.com/changesets/changesets) and Github Pull
Requests to manage releases. Any PR which makes changes to behaviour of a
released package should create a changeset before posting the PR for review.

```sh
pnpm changeset
```

When a PR with a changeset is merged to master, an automated process will handle
creating a subsequent PR which can be used to release that new change publicly.
