# Maintaining Paper Atlas

Use `web/` as the reader project when invoking the skill:

```text
Use the paper-reader skill to read this paper and add it to the web/ library.
Write natural Chinese translation and a 13-chapter report with mentor explanations.
Before a public commit, verify the exact paper version's reuse license.
```

## Adding a paper

1. Resolve the paper identity/version and official code/venue evidence.
2. Add its entry to `content-licenses.json` and the reader's matching
   `web/app/data/content-rights.ts`; unknown rights default to report-only.
3. For permitted sources, add aligned original/Chinese data and real figures.
   For sources without confirmed redistribution permission, keep the original
   privately, publish only independent analysis and source links, and label the
   left reader as a source notice rather than pretending it is the full paper.
4. Add paper data, report, route and library card. Preserve existing IDs and marks.
5. Update `readings/<slug>/report.md`, optional permitted `paper.md`, and notices.
6. Run `node scripts/check-public-release.mjs`, then tests/typecheck/build in `web`.
7. Commit only intended source/data files and push. Do not force-push history.
8. Confirm the GitHub commit and CI result before calling publication complete.

## Keep the checkout small

Do not commit `node_modules`, `dist`, `.vinext`, `.wrangler`, `.openai`, secrets,
temporary source archives, extracted dependency runtimes, personal paths, or old
project Git history. Use GitHub's web editor for text-only changes or a cloud
development environment for builds. Cloud development may have separate billing.

Keep unique notes and source artifacts until their intended backup has been
verified. Rebuildable outputs can be removed after a run; never assume moving
files to Trash has already returned disk space.

## Publishing versus hosting

The source repository lives on github.com; the public reader lives at
https://sk-yan.github.io/paper-reader/. Main-branch application/content changes
run Pages tests and static-export checks before automatic deployment. Documentation
changes do not need to rebuild the website. The original private Site stays separate.
Reading marks remain browser-local and do not automatically migrate between origins.

## Copyright and academic integrity

Free access on arXiv is not a blanket license to redistribute a translated copy.
Use the exact source version's license or written permission, keep author/title/
source attribution, identify translations/crops as adaptations, and preserve NC,
SA or other conditions. Third-party items separately credited inside a paper may
have their own rights. Do not imply the authors endorse this reader.

Reports must distinguish source facts, evaluation, inference and uncertainty.
If a claim, formula or figure cannot be verified, label it rather than invent it.
