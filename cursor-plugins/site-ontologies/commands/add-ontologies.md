---
name: add-ontologies
description: Install the global ontology kit and wire Schema.org + SKOS on this project
---

Run the **add-site-ontologies** skill on the current repository.

Copy `packages/ontology-kit` from DrGeneBoyle.com if missing, bind `OntologySiteConfig`, embed `#ontology` in the root layout, and expose `/ontology.json`, `/ontology/skos.json`, and `/ontologies`.
