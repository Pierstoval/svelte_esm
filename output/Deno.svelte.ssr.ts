/* Deno.svelte generated by Svelte v3.23.0 */
import { create_ssr_component, escape } from "../svelte/internal/index.mjs";

const css = {
	code: "p.svelte-sj837c{color:teal}",
	map: "{\"version\":3,\"file\":\"Deno.svelte\",\"sources\":[\"Deno.svelte\"],\"sourcesContent\":[\"\\n<script>\\n\\texport let someone = 'World';\\n</script>\\n\\n<style>\\n\\tp { color: teal; }\\n</style>\\n\\n<p>Hello {someone}!</p>\\n\\n\"],\"names\":[],\"mappings\":\"AAMC,CAAC,cAAC,CAAC,AAAC,KAAK,CAAE,IAAI,AAAE,CAAC\"}"
};

const _DenoComponent = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { someone = "World" } = $$props;
	if ($$props.someone === void 0 && $$bindings.someone && someone !== void 0) $$bindings.someone(someone);
	$$result.css.add(css);
	return `<p class="${"svelte-sj837c"}">Hello ${escape(someone)}!</p>`;
});

export default _DenoComponent;