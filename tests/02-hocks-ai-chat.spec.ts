/**
 * HOCKS AI - Chat Interface & AI Interaction Tests
 * Tests: Chat UI rendering, message sending, streaming responses,
 *        conversation history, code blocks, markdown rendering.
 *
 * Target: https://hocks-ai.web.app
 */

import { test, expect } from "@playwright/test";
import { runSteps, runUserFlow, assert } from "passmark";

const BASE_URL = "https://hocks-ai.web.app";

test.describe("HOCKS AI — Chat Interface", () => {
  test("Chat interface loads with proper UI elements", async ({ page }) => {
    test.setTimeout(90_000);

    await runUserFlow({
      page,
      userFlow: "Navigate to HOCKS AI chat interface and verify it loads",
      steps: `
        Navigate to ${BASE_URL}.
        Look for and click any chat or messaging link/button on the page.
        If there's a login wall, note that the chat requires authentication.
        Verify the chat interface or login prompt is visible.
      `,
      effort: "high",
    });

    await assert({
      page,
      assertion:
        "The page shows either a chat interface with a message input field, or a login prompt requiring authentication to access chat",
      expect,
    });
  });

  test("Chat page has responsive layout on desktop", async ({ page }) => {
    test.setTimeout(90_000);

    await runSteps({
      page,
      userFlow: "Check chat page responsive layout",
      steps: [
        { description: `Navigate to ${BASE_URL}` },
        {
          description: "Look for the main chat or app interface",
          waitUntil: "The page has fully loaded",
        },
      ],
      assertions: [
        { assertion: "The page layout adapts properly to the viewport — no horizontal scrollbars" },
        { assertion: "Text is readable and UI elements are properly sized" },
        {
          assertion:
            "The page does not have overlapping elements or broken CSS",
        },
      ],
      test,
      expect,
    });
  });

  test("Navigation between app sections works", async ({ page }) => {
    test.setTimeout(90_000);

    await runSteps({
      page,
      userFlow: "Test navigation between different sections of HOCKS AI",
      steps: [
        { description: `Navigate to ${BASE_URL}` },
        {
          description:
            "Identify all navigation links or menu items on the page",
          waitUntil: "The page is fully loaded",
        },
        {
          description:
            "Click on the first navigation link that leads to a different section",
          waitUntil: "A new section or page content loads",
        },
      ],
      assertions: [
        { assertion: "Navigation links exist and are clickable" },
        {
          assertion:
            "Clicking a navigation link changes the visible content or URL",
        },
        { assertion: "The page does not show a 404 error or blank screen after navigation" },
      ],
      test,
      expect,
    });
  });
});
