/**
 * Documenso — Open-Source Document Signing Platform Tests
 * Tests: Landing page, pricing, sign-up flow, feature verification,
 *        responsive design, accessibility.
 *
 * Target: https://documenso.com
 */

import { test, expect } from "@playwright/test";
import { runSteps, runUserFlow, assert } from "passmark";

const BASE_URL = "https://documenso.com";

test.describe("Documenso — Landing Page & Marketing", () => {
  test("Homepage loads with clear value proposition", async ({ page }) => {
    test.setTimeout(90_000);

    await runSteps({
      page,
      userFlow: "Verify Documenso homepage",
      steps: [
        { description: `Navigate to ${BASE_URL}` },
        {
          description: "Wait for the homepage to fully load",
          waitUntil: "The main hero section and headline are visible",
        },
      ],
      assertions: [
        { assertion: "A hero section with headline text about document signing is visible" },
        { assertion: "There is a primary CTA button (e.g., 'Get Started', 'Sign Up', or 'Try Free')" },
        { assertion: "Navigation links are present in the header" },
        { assertion: "The page mentions 'open source' or 'signing' in its content" },
      ],
      test,
      expect,
    });
  });

  test("Pricing page shows plan comparison", async ({ page }) => {
    test.setTimeout(90_000);

    await runSteps({
      page,
      userFlow: "Navigate to pricing and verify plans",
      steps: [
        { description: `Navigate to ${BASE_URL}` },
        {
          description: "Find and click the 'Pricing' link in the navigation",
          waitUntil: "The pricing page loads with plan information",
        },
      ],
      assertions: [
        { assertion: "Multiple pricing tiers or plans are displayed" },
        { assertion: "Each plan shows a price or 'Free' label" },
        { assertion: "Feature lists or comparisons are shown for each plan" },
        { assertion: "There is at least one CTA button per plan (like 'Get Started' or 'Subscribe')" },
      ],
      test,
      expect,
    });
  });

  test("Sign-up page is accessible from homepage", async ({ page }) => {
    test.setTimeout(90_000);

    await runSteps({
      page,
      userFlow: "Navigate from homepage to sign-up",
      steps: [
        { description: `Navigate to ${BASE_URL}` },
        {
          description: "Click the primary CTA button (Get Started, Sign Up, etc.)",
          waitUntil: "A sign-up page or authentication page loads",
        },
      ],
      assertions: [
        { assertion: "A sign-up or registration form is displayed" },
        { assertion: "There are options for email sign-up or social login (Google, GitHub)" },
        { assertion: "The page does not show an error or 404" },
      ],
      test,
      expect,
    });
  });

  test("Footer contains important links", async ({ page }) => {
    test.setTimeout(90_000);

    await runSteps({
      page,
      userFlow: "Verify footer links on homepage",
      steps: [
        { description: `Navigate to ${BASE_URL}` },
        {
          description: "Scroll to the bottom of the page to see the footer",
          waitUntil: "The footer section is visible",
        },
      ],
      assertions: [
        { assertion: "The footer contains links to Privacy Policy or Terms of Service" },
        { assertion: "The footer has social media links or GitHub link" },
        { assertion: "The footer shows a copyright notice" },
      ],
      test,
      expect,
    });
  });
});

test.describe("Documenso — Responsive Design", () => {
  test("Homepage works on mobile viewport", async ({ page }) => {
    test.setTimeout(90_000);

    await page.setViewportSize({ width: 375, height: 812 });

    await runSteps({
      page,
      userFlow: "Verify mobile responsiveness of homepage",
      steps: [
        { description: `Navigate to ${BASE_URL}` },
        {
          description: "Wait for the page to load in mobile viewport",
          waitUntil: "The page content is visible",
        },
      ],
      assertions: [
        { assertion: "The page content fits within the mobile viewport without horizontal scroll" },
        { assertion: "Text is readable — not too small" },
        { assertion: "A mobile hamburger menu or collapsed navigation is present instead of full desktop nav" },
        { assertion: "Images and buttons are properly sized for mobile" },
      ],
      test,
      expect,
    });
  });
});
