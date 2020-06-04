import { serve } from "https://deno.land/std@0.55.0/http/server.ts";
import { readFileStr } from 'https://deno.land/std@0.55.0/fs/mod.ts';
import _DenoComponent from './output/Deno.svelte.ssr.ts';

const PORT = 8000;

const s = serve({ port: PORT });
console.log(`http://127.0.0.1:${PORT}/`);

for await (const req of s) {
    const renderedComponent = _DenoComponent.render();
    const JS = await readFileStr('./output/Deno.svelte.dom.js');
    const CSS = renderedComponent.css.code;
    const HTML = renderedComponent.html;

    const body = `
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
    pre{display:block;border-radius:3px;font-size:87.5%;color:#212529;background-color:#f8f9fa;padding:10px 15px;margin:0;border:solid 1px #ddd;}
    #svelte{border-radius:3px;border:solid 1px #fcc;padding:15px;}
    </style>
    <style>${CSS}</style>
</head>
<body>
<h1>This is a test for Svelte as an ESM.</h1>

<p>Here is the output script:</p>
<pre>${JS}</pre>

<p>And here is the output CSS:</p>
<pre>${CSS}</pre>

<hr>

<div id="svelte">
    ${HTML}
</div>

<script type="module">
${JS}
</script>
</body>
</html>
`;

    req.respond({ body });
}
