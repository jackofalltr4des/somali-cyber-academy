/**
 * Point values, matching the platform plan doc where an action maps
 * cleanly onto this app's real data model. A few doc actions don't have a
 * separate event in this codebase and were merged or adapted — noted
 * inline below.
 */
export const POINTS = {
  /**
   * "Complete a lesson" (10) and "Pass a quiz" (15 + score bonus) are
   * merged here: this app has no separate quiz-only completion event —
   * completeLesson() always includes the quiz result in the same row.
   * Awarded together as one action the first time a lesson is completed.
   */
  LESSON_BASE: 10,
  QUIZ_BASE: 15,
  /** Added on top of QUIZ_BASE: round(scorePercent * 10), e.g. 100% = +10. */
  quizScoreBonus(scorePercent: number): number {
    return Math.round(Math.max(0, Math.min(1, scorePercent)) * 10);
  },

  /**
   * Lab points vary by type. "Submit a lab report" (10, doc) is folded in
   * here too — this app requires a report to submit a lab at all, so
   * there's no separate no-report submission path to award differently.
   */
  LAB_QUIZ_STYLE: 30,
  LAB_COMMAND_TYPED: 35,
  LAB_TOOL_WORKFLOW: 35,
  LAB_REPORT_BONUS: 10,

  MODULE_COMPLETE_BONUS: 25,
  PATH_COMPLETE_BONUS: 150,

  /** Not in the original doc — exams didn't exist yet when it was written. */
  EXAM_PASSED: 50,

  CERTIFICATE_EARNED: 100,

  /** Awarded once per unique calendar day with a completed lesson. */
  DAILY_ACTIVITY: 5,
  /** Small scaling bonus added to DAILY_ACTIVITY, capped so it can't run away. */
  streakDayBonus(streakLength: number): number {
    return Math.min(streakLength, 20);
  },

  STREAK_MILESTONE_7: 50,
  STREAK_MILESTONE_30: 200,
  STREAK_MILESTONE_100: 500,

  /** Doc says $2+20pts; payout is now $3 (pricing.ts) but points unchanged. */
  REFERRAL_EARNED: 20,
} as const;

export function labPoints(taskType: "quiz" | "command" | "tool" | undefined): number {
  if (taskType === "command") return POINTS.LAB_COMMAND_TYPED;
  if (taskType === "tool") return POINTS.LAB_TOOL_WORKFLOW;
  return POINTS.LAB_QUIZ_STYLE;
}

export type PointsLedgerRow = {
  action_type: string;
  reference_slug: string;
  points: number;
  created_at?: string | null;
};

export function totalPoints(rows: PointsLedgerRow[]): number {
  return rows.reduce((n, r) => n + r.points, 0);
}
