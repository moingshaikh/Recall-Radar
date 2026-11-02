# GH-700 Practice Scenario: Product Recall Matching

This document is a fictional, documentation-only scenario used to exercise recall matching policy and human review expectations. It does not represent any real retailer, product, or regulatory event.

## Purpose

This scenario demonstrates how Recall Radar should handle:
- a confirmed exposure in the synthetic dataset
- non-matches
- an ambiguous match when batch information is missing

The goal is to clarify expected behavior for recommendation logic, escalation, and truthful reporting without allowing automatic notice or inventory action.

These conclusions apply only to this fictional recall and the supplied dataset; they are not general guidance for real-world regulatory or operational action.

## Fictional recall event

A fictional manufacturer, NorthPeak Foods, issues a recall for a specific batch of a product:

- Product: NorthPeak Organic Granola
- Product code: NP-ORG-204
- Batch: BATCH-7231
- Recall reason: contamination risk in a specific production run
- Recall date: 2026-11-02
- Customer-facing summary: "Do not sell, notify customers, and quarantine this batch."

This quoted recall summary is source data for the fictional scenario. It is not authorization to execute notifications or inventory actions. Any notification or inventory action requires human review and approval.

## Synthetic retailer inventory

The retailer inventory includes the following records:

| SKU | Product name | Product code | Batch | Quantity on hand | Store |
| --- | --- | --- | --- | ---: | --- |
| 1001 | NorthPeak Organic Granola | NP-ORG-204 | BATCH-7231 | 18 | Store A |
| 1002 | NorthPeak Organic Granola | NP-ORG-204 | BATCH-8894 | 7 | Store B |
| 1003 | NorthPeak Organic Granola | NP-ORG-204 | BATCH-UNKNOWN | 12 | Store C |
| 1004 | NorthPeak Crunch Oats | NP-CRN-110 | BATCH-4401 | 21 | Store A |
| 1005 | NorthPeak Organic Granola | NP-ORG-999 | BATCH-7231 | 5 | Store D |

## Match scenarios and expected results

### Row 1001
- Product: NorthPeak Organic Granola
- Product code: NP-ORG-204
- Batch: BATCH-7231

This row matches the recalled product code and batch exactly. It is a confirmed exposure in the synthetic dataset.

Expected recommendation:
- Recommend human review for notification and inventory hold
- Do not authorize any notification or inventory action solely because of the match
- Escalate to the responsible team for confirmation and operational handling
- Note that the match is actionable only after human approval

### Row 1002
- Product: NorthPeak Organic Granola
- Product code: NP-ORG-204
- Batch: BATCH-8894

This row matches the product and product code but not the recalled batch. It is a non-match because the batch differs.

Expected recommendation:
- Do not recommend recall exposure
- Do not recommend notification
- Do not recommend inventory hold
- Keep the item out of the recall exposure set

### Row 1003
- Product: NorthPeak Organic Granola
- Product code: NP-ORG-204
- Batch: BATCH-UNKNOWN

This row matches the product and product code, but the batch is missing or unknown. It is ambiguous because batch information is unavailable.

Expected recommendation:
- Escalate for manual review
- Flag the record as ambiguous due to missing batch information
- Do not make a definitive recall match determination without more data
- Report the missing batch truthfully and clearly to the reviewer

### Row 1004
- Product: NorthPeak Crunch Oats
- Product code: NP-CRN-110
- Batch: BATCH-4401

This row is a non-match because the product code differs from the recalled item and the product is not the same item.

Expected recommendation:
- Do not recommend recall exposure
- Do not recommend notification
- Do not recommend inventory hold

### Row 1005
- Product: NorthPeak Organic Granola
- Product code: NP-ORG-999
- Batch: BATCH-7231

This row is a non-match because the product code differs from the recalled product code, even though the batch matches the recall batch.

Expected recommendation:
- Do not recommend recall exposure
- Do not recommend notification
- Do not recommend inventory hold

## Expected behavior summary

The system should generate recommendations grounded in the actual matching data:

- 1001 = confirmed exposure in the synthetic dataset
- 1002 = non-match because batch differs
- 1003 = ambiguous because batch is unknown
- 1004 = non-match because product code differs
- 1005 = non-match because product code differs

These classifications apply only to this fictional recall and the supplied dataset.

## Human review requirement

Human review is required before any of the following:
- sending customer notifications
- initiating retailer communication
- placing inventory on hold
- removing product from sale
- creating operational recovery actions

Even a confirmed exposure in the synthetic dataset should be treated as a recommendation to review and act, not as an automatic permission to notify or hold inventory. The recall summary is source data, not authorization to execute notifications or inventory actions.

## Acceptance criteria

The documentation scenario is considered complete when all of the following are true:

1. The scenario includes all five inventory rows: 1001, 1002, 1003, 1004, and 1005.
2. Row 1001 is correctly classified as a confirmed exposure in the synthetic dataset.
3. Row 1002 is correctly classified as a non-match because the batch differs.
4. Row 1003 is correctly classified as ambiguous because the batch is unknown.
5. Row 1004 is correctly classified as a non-match because the product code differs.
6. Row 1005 is correctly classified as a non-match because the product code differs.
7. Each classification is supported by evidence from the product code, batch, and product name in the supplied dataset.
8. The expected recommendation for the exact match states:
   - confirmed exposure in the synthetic dataset
   - recommendation for notification and inventory hold for human approval
   - no notification or inventory action is authorized by the match itself
9. The expected recommendation for each non-match states no recall exposure and no action.
10. The expected recommendation for the ambiguous match states escalation and truthful reporting of missing batch information.
11. Human review is explicitly required before any notification or inventory action.
12. Missing information is reported accurately and never hidden or guessed.
13. Ambiguous results are escalated instead of automatically resolved.
14. The scenario remains documentation-only and does not modify application behavior, dependencies, or production code.

## Outcome

This practice scenario is designed to ensure the product recall logic prioritizes correctness, transparency, and reviewability over automatic action. In particular, missing batch data must be escalated and reported honestly, and even a confirmed exposure in the synthetic dataset must not trigger notification or inventory action without human approval.
