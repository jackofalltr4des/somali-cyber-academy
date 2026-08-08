import { describe, it, expect } from "vitest";
import { POINTS, labPoints, totalPoints } from "./points";

describe("labPoints", () => {
  it("returns the value for each task type", () => {
    expect(labPoints("command")).toBe(POINTS.LAB_COMMAND_TYPED);
    expect(labPoints("tool")).toBe(POINTS.LAB_TOOL_WORKFLOW);
    expect(labPoints("quiz")).toBe(POINTS.LAB_QUIZ_STYLE);
  });

  it("defaults to the quiz-style value when task type is unknown", () => {
    expect(labPoints(undefined)).toBe(POINTS.LAB_QUIZ_STYLE);
  });
});

describe("POINTS.quizScoreBonus", () => {
  it("scales linearly with score percent", () => {
    expect(POINTS.quizScoreBonus(1)).toBe(10);
    expect(POINTS.quizScoreBonus(0.5)).toBe(5);
    expect(POINTS.quizScoreBonus(0)).toBe(0);
  });

  it("clamps out-of-range input instead of returning a negative or inflated bonus", () => {
    expect(POINTS.quizScoreBonus(1.5)).toBe(10);
    expect(POINTS.quizScoreBonus(-1)).toBe(0);
  });
});

describe("POINTS.streakDayBonus", () => {
  it("is capped at 20 regardless of streak length", () => {
    expect(POINTS.streakDayBonus(5)).toBe(5);
    expect(POINTS.streakDayBonus(1000)).toBe(20);
  });
});

describe("totalPoints", () => {
  it("sums every ledger row's points", () => {
    expect(
      totalPoints([
        { action_type: "a", reference_slug: "x", points: 10 },
        { action_type: "b", reference_slug: "y", points: 5 },
      ]),
    ).toBe(15);
  });

  it("returns 0 for an empty ledger", () => {
    expect(totalPoints([])).toBe(0);
  });
});
