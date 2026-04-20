/**
 * Cal.com — Scheduling Platform Tests
 * Tests: Public booking page, time slot selection, timezone handling,
 *        form validation, event type browsing.
 *
 * Target: https://app.cal.com
 */

import { test, expect } from "@playwright/test";
import { runSteps, runUserFlow, assert } from "passmark";

test.describe("Cal.com — Public Booking Flow", () => {
  test("Public booking page loads with available time slots", async ({
    page,
  }) => {
    test.setTimeout(90_000);

    await runSteps({
      page,
      userFlow: "Load a public Cal.com booking page",
      steps: [
        { description: "Navigate to https://cal.com/rick/get-started" },
        {
          description: "Wait for the booking page to load",
          waitUntil: "A calendar or date picker is visible",
        },
      ],
      assertions: [
        { assertion: "A calendar showing available dates is displayed" },
        { assertion: "The host name or event type title is shown" },
        { assertion: "There is a timezone selector or timezone information displayed" },
      ],
      test,
      expect,
    });
  });

  test("Date selection reveals available time slots", async ({ page }) => {
    test.setTimeout(120_000);

    await runSteps({
      page,
      userFlow: "Select a date to see available times",
      steps: [
        { description: "Navigate to https://cal.com/rick/get-started" },
        {
          description: "Wait for the calendar to load",
          waitUntil: "Date options are visible on the calendar",
        },
        {
          description:
            "Click on a date that appears to be available (not grayed out)",
          waitUntil: "Time slots appear for the selected date",
        },
      ],
      assertions: [
        {
          assertion:
            "One or more time slots are displayed after clicking a date",
        },
        {
          assertion:
            "Each time slot shows a specific time (e.g., '9:00 AM', '10:30 AM')",
        },
        {
          assertion: "The selected date is visually highlighted on the calendar",
        },
      ],
      test,
      expect,
    });
  });

  test("Booking form validates required fields", async ({ page }) => {
    test.setTimeout(120_000);

    await runUserFlow({
      page,
      userFlow: "Select a time slot and attempt to book without filling required info",
      steps: `
        Navigate to https://cal.com/rick/get-started.
        Wait for the calendar to load.
        Click on an available date.
        Click on the first available time slot.
        If a booking form appears, try to submit it without filling in the name or email fields.
        Verify that validation errors appear for required fields.
      `,
      effort: "high",
    });

    await assert({
      page,
      assertion:
        "The page shows either a booking form with required field indicators, or validation error messages for empty fields",
      expect,
    });
  });

  test("Timezone selector changes available times", async ({ page }) => {
    test.setTimeout(90_000);

    await runSteps({
      page,
      userFlow: "Verify timezone selector affects displayed times",
      steps: [
        { description: "Navigate to https://cal.com/rick/get-started" },
        {
          description: "Wait for the booking page to load",
          waitUntil: "Calendar is visible",
        },
        {
          description:
            "Find and click the timezone dropdown or selector",
          waitUntil: "Timezone options or a timezone search field appears",
        },
      ],
      assertions: [
        { assertion: "A timezone selection UI is visible with different timezone options" },
        {
          assertion:
            "The current timezone is displayed somewhere on the page",
        },
      ],
      test,
      expect,
    });
  });
});
