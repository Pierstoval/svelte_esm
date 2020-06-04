SHELL := /bin/bash

##
## Testing Svelte as an ESM with Deno
## ----------------------------------
##

.DEFAULT_GOAL := help
help: ## Show this help.
	@printf "\n Available commands:\n\n"
	@grep -E '(^[a-zA-Z_-]+:.*?##.*$$)|(^##)' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[32m%-15s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m## */[33m/'
.PHONY: help

init: ## Sets up the proof of concept
	git submodule init
	$(MAKE) build-svelte
.PHONY: build-svelte

build-svelte: ## Build Svelte in the "svelte/" directory
	(cd svelte && npm install && cd -)
	(cd svelte && PUBLISH=1 npm run build && cd -)
.PHONY: build-svelte

compile: ## Compile the Svelte Component in "src/" to the "output/" directory
	deno run --unstable --allow-read --allow-write compile.ts
.PHONY: compile

serve: ## Run an HTTP server to try using the generated Svelte component in frontend.
	deno run -c tsconfig.json --allow-read --allow-net --unstable server.ts
.PHONY: compile
