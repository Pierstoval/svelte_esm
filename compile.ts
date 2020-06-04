import {ensureDir, readFileStr, writeFileStr} from 'https://deno.land/std@0.55.0/fs/mod.ts';
import {compile} from './svelte/compiler.mjs';

const svelteImportsPath = '../svelte';

//
// The goal is to make this work without having to install Svelte as a dependency like with Pika:
//
// import {compile} from 'https://cdn.pika.dev/svelte@^3.23.0';
// const sveltePath = 'https://cdn.pika.dev/svelte';
//
// This is not for now since there are some issues regarding imports, but it's an ideal...

const sourceName = 'Deno.svelte';
const source = await readFileStr(`src/${sourceName}`);

const compiledSsr = compile(source, {
	filename: sourceName,
	generate: 'ssr',
	name: '_'+sourceName.replace('.svelte', '')+'Component',
	sveltePath: svelteImportsPath,
});

const compiledDom = compile(source, {
	filename: sourceName,
	generate: 'dom',
	name: '_'+sourceName.replace('.svelte', '')+'Component',
	sveltePath: svelteImportsPath,
});

const CSS = compiledSsr.css.code;
const JS_DOM = compiledDom.js.code;
/*
 /!\ Dirty fix
 */
const JS_SSR = compiledSsr.js.code.replace(
	'"../svelte/internal"',
	'"../svelte/internal/index.mjs"'
);

await ensureDir('output/');
await writeFileStr(`output/${sourceName}.css`, CSS);
await writeFileStr(`output/${sourceName}.ssr.ts`, JS_SSR);
await writeFileStr(`output/${sourceName}.dom.js`, JS_DOM);
