.PHONY: dev-front dev-back install-front install-back install help

# ──────────────────────────────────────────────
# Development
# ──────────────────────────────────────────────

dev-front: install-front ## Start frontend dev server (port 5173)
	cd client && npm run dev

dev-back: install-back ## Start backend dev server (port 8000)
	cd server && uvicorn app.main:app --reload

# ──────────────────────────────────────────────
# Setup
# ──────────────────────────────────────────────

install-front: client/node_modules ## Install frontend dependencies

client/node_modules: client/package.json
	cd client && npm install
	@touch $@

install-back: server/.venv/pyvenv.cfg ## Install backend dependencies

server/.venv/pyvenv.cfg: server/pyproject.toml
	cd server && python3 -m venv .venv && .venv/bin/pip install -e ".[dev]"

install: install-front install-back ## Install all dependencies

# ──────────────────────────────────────────────
# Help
# ──────────────────────────────────────────────

help: ## Show available commands
	@grep -E '^[a-zA-Z_-]+:.*?## ' $(MAKEFILE_LIST) | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'
