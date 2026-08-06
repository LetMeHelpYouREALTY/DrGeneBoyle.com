# site-ontologies

Cursor plugin that makes research/service **ontologies global across all LMHY projects**.

## What it provides

| Component | Purpose |
|-----------|---------|
| Rule `global-ontologies` | Always-on checklist: portable kit, layout embed, endpoints |
| Skill `add-site-ontologies` | Install/copy `@lmhy/ontology-kit` and wire a site |
| Command `/add-ontologies` | Shortcut to run the skill |

## Install

### Local (immediate)

```bash
cp -R cursor-plugins/site-ontologies ~/.cursor/plugins/local/site-ontologies
```

Or symlink:

```bash
ln -sfn "$PWD/cursor-plugins/site-ontologies" ~/.cursor/plugins/local/site-ontologies
```

Restart Cursor or reload plugins. The plugin appears under **Settings → Rules / Plugins**.

### Reference implementation

Canonical kit + wired example: [DrGeneBoyle.com](https://github.com/LetMeHelpYouREALTY/DrGeneBoyle.com) → `packages/ontology-kit`.

## Usage

In any project chat:

- “Add ontologies” / `/add-ontologies`
- Agent copies the kit, binds `OntologySiteConfig`, adds `/ontology.json`, `/ontology/skos.json`, `/ontologies`, and root-layout `#ontology` script.
