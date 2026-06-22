/**
 * Dynamic suggestion pills from verdict, reasoning, and next actions.
 */
(function (global) {
  const VERDICT_DEFAULTS = {
    approved: ['EMI breakdown', 'Purchase timeline', 'Loan comparison'],
    caution: ['Reduce vehicle budget', 'Increase down payment', 'Build emergency fund'],
    rejected: ['Affordable alternatives', 'Improve financial readiness', 'Recalculate purchase'],
    wait: ['Build financial runway', 'Timeline to readiness', 'What would change the verdict?'],
  };

  /** Match problem signals in reasoning — not positive statements */
  const REASON_RULES = [
    {
      match: /emergency fund covers only|emergency fund below|insufficient emergency|runway covers only|months of expense/i,
      pills: ['Build emergency fund', 'Emergency fund target', 'Savings plan'],
    },
    {
      match: /emi (is |would |exceeds?)|affordability threshold|too high.*income|income threshold|cash flow negative/i,
      pills: ['Reduce vehicle budget', 'Increase down payment', 'What can I afford?'],
    },
    {
      match: /debt burden|debt.?to.?income|liabilit.*high|exceeds.*debt/i,
      pills: ['Debt reduction plan', 'Improve debt ratio', 'Recalculate affordability'],
    },
    {
      match: /down payment reduces|down payment.*below|insufficient down/i,
      pills: ['Increase down payment', 'Down payment timeline', 'Lower purchase price'],
    },
    {
      match: /goal.*derail|savings goal.*at risk|timeline extension|wait \d+ month/i,
      pills: ['Adjust savings timeline', 'Goal impact breakdown', 'Reprioritize goals'],
    },
    {
      match: /income not confirmed|job offer|quit|runway|career/i,
      pills: ['Income scenario model', 'Runway calculator', 'When can I make this move?'],
    },
    {
      match: /insurance gap|health cover|benefits gap/i,
      pills: ['Close coverage gap', 'Benefits comparison', 'Cost of waiting'],
    },
  ];

  function normalizeVerdict(verdict) {
    const v = String(verdict || '').toLowerCase();
    if (/reject|do not|don't|denied/.test(v)) return 'rejected';
    if (/caution|review|wait|reconsider|worth reviewing/.test(v)) return 'caution';
    if (/approv|proceed|yes|go ahead/.test(v)) return 'approved';
    return 'caution';
  }

  function uniquePills(pills, limit = 3) {
    const seen = new Set();
    const out = [];
    for (const pill of pills) {
      const key = pill.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        out.push(pill);
      }
      if (out.length >= limit) break;
    }
    return out;
  }

  function pillsFromReasons(reasons) {
    const text = (reasons || []).join(' ');
    const scored = new Map();

    for (const rule of REASON_RULES) {
      if (rule.match.test(text)) {
        rule.pills.forEach((pill, i) => {
          scored.set(pill, (scored.get(pill) || 0) + (REASON_RULES.length - i));
        });
      }
    }

    return [...scored.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([pill]) => pill);
  }

  /**
   * @param {object} decision
   * @param {string} decision.verdict
   * @param {string[]} [decision.reasons]
   * @param {string[]} [decision.actions]
   * @param {string} [decision.nextAction]
   */
  function generateSuggestionPills(decision) {
    const bucket = normalizeVerdict(decision.verdict);
    const fromReasons = pillsFromReasons(decision.reasons);
    const fromVerdict = VERDICT_DEFAULTS[bucket] || VERDICT_DEFAULTS.caution;
    const extras = [
      ...(decision.actions || []),
      ...(decision.nextAction ? [decision.nextAction] : []),
    ].filter(Boolean);

    // Approved with no risk signals: verdict defaults only
    if (bucket === 'approved' && fromReasons.length === 0) {
      return uniquePills([...fromVerdict, ...extras], 3);
    }

    // Caution/rejected, or approved with risk signals: reason pills first
    return uniquePills([...fromReasons, ...fromVerdict, ...extras], 3);
  }

  global.generateSuggestionPills = generateSuggestionPills;
})(typeof window !== 'undefined' ? window : globalThis);
