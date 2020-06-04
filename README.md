Svelte, ESM and Deno
====================

This is a proof of concept of using Svelte with Deno.

First, I suggest you read [the associated blog post](https://www.orbitale.io/2020/06/04/an-attempt-to-use-sveltejs-with-deno.html) in which I give more information on the research behind.

## How to use?

TL;DR:

* Run `make help` to see available commands.
* Run `make init serve` to set up the project and launch the web server.

The server-side rendering works! But not yet frontend-side, which needs adjustments.

### Svelte itself

Svelte is built-in, provided as a Git Submodule.

The provided Svelte version is a fork of mine which has only one change you can [check here](https://github.com/sveltejs/svelte/commit/3e638656b6a47749afc48aa960c9006a58290509), TL;DR: it allows to build Svelte's compiler into an `.mjs` file so Deno can use it.

The `make init` command should initialize the git submodule and build Svelte as an <abbr title="ECMAScript Module">ESM</abbr> so you can use it.

### Svelte compiler

The Svelte compiler is used in [compile.ts](./compile.ts) in order to generate the files that are stored in [output/](./output/). You can recompile the files using `make compile` if you need.

The generated Javascript file throws an error when used with Deno. This is probably caused by the fact that importing `from 'svelte/internal';` isn't possible, maybe because of a [native Typescript issue](https://github.com/microsoft/TypeScript/issues/18442), but not sure.

This is the reason why you will find a "dirty fix" in [compile.ts line 36](./compile.ts#L36).

The generated DOM must include features that allow `import {...} from "../svelte/internal";` to work, which is not the case now.

This means that somehow, we might have to include the compiled `internal.mjs` file in the build (maybe I'll find a way to do it further).
