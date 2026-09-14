# Zetta translation and evidence notes

## Source and scope
- arXiv 2608.16590v1, HTML + 47-page selectable-text PDF, CC BY 4.0. arXiv submission metadata is 17 August; the PDF header prints 18 August. This reader identifies the arXiv version, not a conference acceptance.
- Complete main text, acknowledgments and Appendices A–D; 185 prose blocks, 85 headings, 15 figure captions, 5 tables, 16 numbered equations, 3 algorithm/listing blocks, 126 bibliography items.
- Chinese prose was directly authored against each English block, not produced by a translation service or term-replacement pipeline. Reference items preserve original author, title and venue information for reliable search and are explicitly labeled as untranslated bibliography; no body or appendix prose is omitted.
- Bibliographic English is kept verbatim. Mathematical expressions, table values, citations, identifiers and algorithm branches are preserved.
- HTML source anchors are exact. PDF pages are supplied only when text matching or inspected figure/table placement confirms them; unmatched blocks point to the exact HTML anchor rather than an invented page number.
- The HTML source's main-table bold styling is not encoded in reconstructed Markdown cells; original table crops retain it.

## Terminology
| English | Chinese |
|---|---|
| harness | 执行框架 |
| runtime critic | 运行时检查器 |
| recovery skill | 恢复技能 |
| promotion | 晋级 |
| held-out | 留出 |
| re-entry | 重新接入基础策略 |
| rollout | 一次环境执行／执行轨迹，依语境 |
| medoid | 簇内代表样本（不是虚构的平均轨迹） |

## Source ambiguities retained, not silently repaired
1. §2.2 calls VLA/WAM open-loop; §2.3 calls the pure-VLA baseline closed-loop. Report distinguishes sensor feedback from explicit failure governance.
2. Three timescale loops and three phases are different organizational concepts; original labels overlap.
3. Eq. 6 defines a set of seeds; later text treats the same set as trajectories. Eq. 11 is conceptual and lacks a numeric scoring definition. Stability in Eq. 12 lacks a complete implementation and sign convention.
4. §2.6's 100% originating-cluster requirement and §4.1's LIBERO development ≥50% stopping statement are not fully reconciled.
5. §2.1/algorithms require online Orchestrator approvals, whereas §4.6 says Agent calls only happen offline. No invented resolution.
6. Abstract's 90.8% is Goal-only; the full 40-setting average is 71.13%. Long-suite zeros are included in the report.
7. Figure 4 Goal-S6 baseline differs from accompanying prose (0% vs 5%). Selected Goal-T8 intermediate 60% is not automatically a contradiction with final-table 80%.
8. Figure 8 source panel explicitly uses 5 episodes, not 20.
9. Figures 10–11 say “Projected transfer checkpoint”; meaning and complete raw measurement status are not clarified by the article. The report labels the uncertainty.
10. Figure 9 intermediate means do not follow the fixed 18×50 denominator grid; actual intermediate aggregation is unspecified. This does not establish fabrication.
11. 11.1×, 11.9×, 20.6× and matched-concurrency throughput gains measure different or insufficiently reconciled comparisons.
12. No full independent-evolution variance, complete cost-normalized timeline, or all-module ablation is reported. Figure 7/8 do contain fixed-seed comparisons and Wilson confidence intervals; these are not omitted or mischaracterized.

## Figure/table handling
All 15 original figures and all 5 original table crops are available. Figure 6 panels are shown as a tight crop from PDF page 23; remaining figures use original arXiv PNG/SVG assets. Formula text is kept in Markdown/LaTeX for the site's KaTeX renderer. Figures appear in source context and again where substantively discussed in the report.

## Reproduction boundary
The current official repository is linked and its current example is clearly separated from paper experiment settings. This ingestion did not install or run Zetta, use the user's A100 server, or verify the reported robot success rates experimentally.
