import { describe, expect, it } from "vitest";
import { answerQuestion, SUGGESTIONS } from "../lib/sahayaKnowledge";

describe("AI Knowledge Engine", () => {
  it("answers greetings with assistant introduction and suggested questions", () => {
    const res = answerQuestion("Hello!");
    expect(res).toContain("Sahaya Savari F's AI Portfolio Assistant");
    expect(res).toContain("NelSync AI");
  });

  it("answers hackathon inquiries with NelSync AI championship details", () => {
    const res = answerQuestion("Tell me about NelSync AI hackathon");
    expect(res).toContain("Overall Champion (AIxcelerate 2026 Hackathon)");
    expect(res).toContain("66 competing teams");
    expect(res).toContain("Python");
  });

  it("answers VibeCraft questions with dual app breakdown", () => {
    const res = answerQuestion("What did you build in VibeCraft?");
    expect(res).toContain("VibeCraft 2026 (NeuraGenZers)");
    expect(res).toContain("Attendance Predictor");
    expect(res).toContain("Free Class Locator");
    expect(res).toContain("Gemini API");
  });

  it("answers recruiter inquiries with clear hiring arguments", () => {
    const res = answerQuestion("Why should we hire Sahaya?");
    expect(res).toContain("Why Hire Sahaya Savari F");
    expect(res).toContain("Proven Hackathon Champion");
    expect(res).toContain("Rigorous Academic Base");
  });

  it("answers work experience questions accurately", () => {
    const res = answerQuestion("What was your work experience at HodoLabs?");
    expect(res).toContain("HodoLabs");
    expect(res).toContain("AION 2K26");
  });

  it("answers contact requests with valid email and LinkedIn links", () => {
    const res = answerQuestion("How can I contact Sahaya?");
    expect(res).toContain("contact@sahayasavari.dev");
    expect(res).toContain("linkedin.com/in/sahaya-savari");
  });

  it("provides non-empty suggestions list", () => {
    expect(SUGGESTIONS.length).toBeGreaterThanOrEqual(4);
  });
});
