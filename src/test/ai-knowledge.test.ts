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
    expect(res).toContain("Digital Marketing Intern");
    expect(res).toContain("AION 2K26");
  });

  it("answers contact requests with valid email, phone, and LinkedIn links", () => {
    const res = answerQuestion("How can I contact Sahaya?");
    expect(res).toContain("contact@sahayasavari.dev");
    expect(res).not.toContain("sahayasavari.info@gmail.com");
    expect(res).toContain("6385648514");
    expect(res).toContain("linkedin.com/in/sahaya-savari");
  });

  it("answers education requests including all 3 verified academic levels", () => {
    const res = answerQuestion("Tell me about your education background");
    expect(res).toContain("St. Joseph's College (Autonomous), Tiruchirappalli");
    expect(res).toContain("Thiagarajar College");
    expect(res).toContain("St. Mary's Higher Secondary School");
  });

  it("answers skills requests with LinkedIn top skills", () => {
    const res = answerQuestion("What are your technical skills?");
    expect(res).toContain("PostgreSQL");
    expect(res).toContain("Node.js");
    expect(res).toContain("React.js");
  });

  it("provides non-empty suggestions list", () => {
    expect(SUGGESTIONS.length).toBeGreaterThanOrEqual(4);
  });

  it("verifies public/llms.txt and public/llms-full.txt contain no unverified trainee roles", async () => {
    const fs = await import("node:fs");
    const path = await import("node:path");

    const llms = fs.readFileSync(path.resolve(process.cwd(), "public/llms.txt"), "utf-8");
    const llmsFull = fs.readFileSync(path.resolve(process.cwd(), "public/llms-full.txt"), "utf-8");

    // Must not contain speculative / unverified trainee roles
    expect(llms).not.toContain("Web Development Trainee");
    expect(llmsFull).not.toContain("Web Development Trainee");

    // Must contain verified LinkedIn data
    expect(llms).toContain("Digital Marketing Intern");
    expect(llms).toContain("contact@sahayasavari.dev");
    expect(llms).not.toContain("sahayasavari.info@gmail.com");
    expect(llms).toContain("6385648514");
    expect(llms).toContain("PostgreSQL, Node.js, React.js");

    expect(llmsFull).toContain("Digital Marketing Intern");
    expect(llmsFull).toContain("contact@sahayasavari.dev");
    expect(llmsFull).not.toContain("sahayasavari.info@gmail.com");
    expect(llmsFull).toContain("6385648514");
  });
});
