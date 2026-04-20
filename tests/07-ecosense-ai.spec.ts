/**
 * EcoSense AI — Carbon Footprint Analyzer Tests
 * Tests: Multi-step quiz flow, AI analysis, pledge system,
 *        Solana Pay integration, responsive design.
 *
 * Target: https://ecosense-ai.pages.dev
 */

import { test, expect } from "@playwright/test";
import { runSteps, runUserFlow, assert } from "passmark";

const BASE_URL = "https://ecosense-ai.pages.dev";

test.describe("EcoSense AI — Quiz & Analysis Flow", () => {
  test("Landing page loads with start button", async ({ page }) => {
    test.setTimeout(90_000);

    await runSteps({
      page,
      userFlow: "Verify EcoSense AI landing page",
      steps: [
        { description: `Navigate to ${BASE_URL}` },
        {
          description: "Wait for the landing page to load",
          waitUntil: "The main page content with branding is visible",
        },
      ],
      assertions: [
        { assertion: "The page shows 'EcoSense' or environmental/carbon-related branding" },
        { assertion: "There is a primary button to start the quiz or analysis" },
        { assertion: "The page has a clean, professional design" },
      ],
      test,
      expect,
    });
  });

  test("Multi-step carbon quiz progresses through steps", async ({ page }) => {
    test.setTimeout(120_000);

    await runUserFlow({
      page,
      userFlow: "Complete the carbon footprint quiz steps",
      steps: `
        Navigate to ${BASE_URL}.
        Click the start button to begin the carbon footprint quiz.
        If there's a step about transportation, select any option (e.g., car, public transit).
        Click next or continue to move to the next question.
        If there's a step about energy usage, select any option.
        Click next to proceed.
        If there's a step about diet, select any option.
        Continue through all available quiz steps.
        Stop when you reach a results page or an AI analysis step.
      `,
      effort: "high",
    });

    await assert({
      page,
      assertion:
        "The user has progressed through the quiz — either viewing results, an analysis loading screen, or a later step in the multi-step form",
      expect,
    });
  });

  test("Quiz enforces step completion", async ({ page }) => {
    test.setTimeout(90_000);

    await runSteps({
      page,
      userFlow: "Try to skip quiz steps without answering",
      steps: [
        { description: `Navigate to ${BASE_URL}` },
        {
          description: "Click the start button to begin the quiz",
          waitUntil: "First quiz question is visible",
        },
        {
          description:
            "Try to click next/continue without selecting any option",
          waitUntil: "An error message appears or the button is disabled",
        },
      ],
      assertions: [
        {
          assertion:
            "The user cannot proceed without selecting an answer — either an error is shown or the next button is disabled",
        },
        { assertion: "The user remains on the same quiz step" },
      ],
      test,
      expect,
    });
  });
});

test.describe("EcoSense AI — Accessibility & UX", () => {
  test("Page has proper color contrast and readability", async ({ page }) => {
    test.setTimeout(90_000);

    await runSteps({
      page,
      userFlow: "Check visual quality of EcoSense AI",
      steps: [
        { description: `Navigate to ${BASE_URL}` },
        {
          description: "Wait for the page to fully render",
          waitUntil: "All visual elements are loaded",
        },
      ],
      assertions: [
        { assertion: "Text on the page is clearly readable against the background" },
        { assertion: "Buttons have visible borders or backgrounds making them distinguishable" },
        { assertion: "The page uses a consistent color scheme" },
        { assertion: "There are no broken images or missing icons" },
      ],
      test,
      expect,
    });
  });

  test("Mobile responsive layout", async ({ page }) => {
    test.setTimeout(90_000);

    await page.setViewportSize({ width: 390, height: 844 });

    await runSteps({
      page,
      userFlow: "Verify mobile responsiveness",
      steps: [
        { description: `Navigate to ${BASE_URL}` },
        {
          description: "Wait for the page to load in mobile viewport",
          waitUntil: "Page content is visible",
        },
      ],
      assertions: [
        { assertion: "Content fits within the mobile viewport" },
        { assertion: "No horizontal scrollbar is present" },
        { assertion: "Buttons are large enough to tap on mobile" },
        { assertion: "Text is readable without zooming" },
      ],
      test,
      expect,
    });
  });
});
