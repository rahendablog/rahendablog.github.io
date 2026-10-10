# Accuracy analysis — "Why AI users must understand AI mechanisms"

Review of the theory presented in `_posts/2026-10-10-ai-users.md`, as explained to a non-technical audience. Grammar was reviewed and fixed directly in the article; this file covers the *technical/conceptual accuracy* of the explanation itself.

## Verdict

**Mostly sound as a layman simplification**, with one internal contradiction, one confusing/incorrect illustration, and a couple of simplifications worth a caveat. Nothing here requires scrapping the article's core thesis (classic software = deterministic, GenAI = probabilistic next-token prediction) — it holds up.

## Findings

| # | Severity | Location | Issue |
|---|----------|----------|-------|
| 1 | 🔴 High | "stacked filters" analogy (¶ starting "Put simply, AI's dictionary...") vs. "probabilistic" section below it | **Internal contradiction.** The article first says each filter narrows possibilities down "to the point that there is only **one possible answer** that passes all of the filters" — i.e. a deterministic sieve with a single output. A few lines later it says AI's answer to the same question can differ each time ("The weather is sunny" vs. "The weather is cold but sunny") *because* of this same filtering process. Both can't be true: if filtering always converges on one answer, outputs would be identical every time. What actually happens is that the model produces a *probability distribution* over possible next words, and then **samples** from it (sometimes picking the top choice, sometimes not) — it doesn't filter down to a single deterministic answer. The sieve/filter metaphor is a reasonable way to explain narrowing down *likely* candidates, but as written it overclaims determinism and then needs the opposite claim to explain real-world behavior. |
| 2 | 🟡 Medium | Binary table (Blue / Black / White / Three) | **Mixes two unrelated encoding schemes without saying so, and the numbers don't even match each other.** Black (24 zeros) and White (24 ones) look like a 24‑bit RGB color code (0,0,0 and 255,255,255) — consistent with each other. But Blue should then be `00000000 00000000 11111111` (R=0,G=0,B=255); the value given, `0010 1111 1000 0000 1110 1101`, doesn't correspond to blue (or to anything recognizable) under that scheme. Meanwhile "Three" is given as `0011`, a 4-bit binary integer (3) — a completely different encoding (number encoding, not color encoding, and not word/text encoding like ASCII/UTF-8, which is what "how words are represented" would actually imply). Readers have no way to tell that "Blue/Black/White" are being encoded as colors while "Three" is encoded as a number, nor that the Blue value is simply wrong. This table either needs matching, correct RGB values for colors (or a note that it's RGB, not text encoding) plus a separate, consistent example for a number — or it should be dropped in favor of one clean, correct example. |
| 3 | 🟢 Low | "AI guesses the next item that would most logically follow it" | Accurate at a conceptual level — this is a fair plain-language description of next-token prediction, which is genuinely how most generative language models work. No change needed. |
| 4 | 🟢 Low (simplification, not an error) | "there is no guarantee of getting the same result in each execution" | True for how most people experience GenAI by default (sampling enabled), but it's a simplification: determinism can be restored (e.g. temperature set to 0 / greedy decoding, fixed random seed), and some production systems do this intentionally for reproducibility. Not wrong for the article's purpose, but worth one caveat sentence if the author wants precision over simplicity. |
| 5 | 🟢 Low | "AI is probabilistic because it guesses rather than thinks, unlike a human" | Reasonable simplification for a lay audience. Technically humans also do a fair amount of "guessing" / probabilistic inference (and the comparison to human cognition is itself debated), but as a rhetorical device to contrast deterministic software vs. probabilistic AI, it works and doesn't need correction for this audience. |
| 6 | 🟢 Low / housekeeping | Line "Source: TODO - anthropic article" | Left as a placeholder in the draft — not a grammar issue, but flagging it since it's unresolved: the article cites no actual source yet. Fill in the real Anthropic article/source before publishing. |

## Recommended next step (not applied — content decision, left to the author)

- Decide whether to fix finding #1 by softening the filter metaphor (e.g., "narrows down to the *most likely* answers, not always the same one each time") so it no longer contradicts the probabilistic section.
- Decide whether to replace or caption the binary table (finding #2) so Blue/Black/White and Three aren't implied to use the same encoding scheme.
- Fill in the real source link (finding #6).

Everything else in the article (grammar, punctuation, missing image embed, empty placeholder table rows) was corrected directly in `2026-10-10-ai-users.md`.
