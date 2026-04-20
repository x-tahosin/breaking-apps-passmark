/**
 * HOCKS AI - Authentication & Onboarding Flow Tests
 * Tests: Sign-up page, login page, Google OAuth UI, error handling,
 *        password validation, forgot password, and session persistence.
 *
 * Target: https://hocks-ai.web.app
 */

import { test, expect } from "@playwright/test";
import { runSteps, runUserFlow, assert } from "passmark";

const BASE_URL = "https://hocks-ai.web.app";

test.describe("HOCKS AI — Authentication & Onboarding", () => {
  test("Landing page loads with correct branding and CTA", async ({ page }) => {
    test.setTimeout(90_000);

    await runSteps({
      page,
      userFlow: "Verify HOCKS AI landing page loads correctly",
      steps: [
        { description: `Navigate to ${BASE_URL}` },
        {
          description: "Wait for the page to fully load",
          waitUntil: "The main page content is visible",
        },
      ],
      assertions: [
        { assertion: "The page title or heading contains 'HOCKS' or the app branding" },
        { assertion: "There is a sign-in or login button visible on the page" },
        { assertion: "The page has a modern, professional design — not a broken layout" },
      ],
      test,
      expect,
    });
  });

  test("Sign-up page displays all required form fields", async ({ page }) => {
    test.setTimeout(90_000);

    await runSteps({
      page,
      userFlow: "Navigate to sign-up page and verify form fields",
      steps: [
        { description: `Navigate to ${BASE_URL}` },
        {
          description: "Click on the Sign Up or Create Account button/link",
          waitUntil: "A registration form or sign-up page is visible",
        },
      ],
      assertions: [
        { assertion: "There is an email input field" },
        { assertion: "There is a password input field" },
        { assertion: "There is a submit/sign-up button" },
      ],
      test,
      expect,
    });
  });

  test("Sign-up form validates empty submission", async ({ page }) => {
    test.setTimeout(90_000);

    await runSteps({
      page,
      userFlow: "Attempt sign-up with empty fields to trigger validation",
      steps: [
        { description: `Navigate to ${BASE_URL}` },
        {
          description: "Click on the Sign Up or Create Account button/link",
          waitUntil: "A registration form is visible",
        },
        {
          description: "Click the submit/sign-up button without filling any fields",
          waitUntil: "An error message or validation warning appears",
        },
      ],
      assertions: [
        { assertion: "An error message is displayed indicating fields are required" },
        { assertion: "The user is NOT redirected to a dashboard — they remain on the sign-up page" },
      ],
      test,
      expect,
    });
  });

  test("Sign-up rejects invalid email format", async ({ page }) => {
    test.setTimeout(90_000);

    await runSteps({
      page,
      userFlow: "Submit sign-up form with invalid email",
      steps: [
        { description: `Navigate to ${BASE_URL}` },
        {
          description: "Click on the Sign Up or Create Account button/link",
          waitUntil: "A registration form is visible",
        },
        {
          description: "Type 'not-an-email' into the email field",
          data: { value: "not-an-email" },
        },
        {
          description: "Type 'Password123!' into the password field",
          data: { value: "Password123!" },
        },
        {
          description: "Click the submit/sign-up button",
          waitUntil: "An error message appears",
        },
      ],
      assertions: [
        { assertion: "An error message is shown about the email being invalid" },
      ],
      test,
      expect,
    });
  });

  test("Login page shows Google OAuth option", async ({ page }) => {
    test.setTimeout(90_000);

    await runSteps({
      page,
      userFlow: "Check login page for Google sign-in option",
      steps: [
        { description: `Navigate to ${BASE_URL}` },
        {
          description: "Click on the Sign In or Login button/link",
          waitUntil: "The login page or modal is visible",
        },
      ],
      assertions: [
        { assertion: "There is a 'Sign in with Google' button or Google OAuth option visible" },
        { assertion: "There is also an email/password login option" },
      ],
      test,
      expect,
    });
  });

  test("Login form rejects wrong credentials gracefully", async ({ page }) => {
    test.setTimeout(90_000);

    await runSteps({
      page,
      userFlow: "Attempt login with incorrect credentials",
      steps: [
        { description: `Navigate to ${BASE_URL}` },
        {
          description: "Click on the Sign In or Login button/link",
          waitUntil: "The login form is visible",
        },
        {
          description: "Type 'fake_user_test@gmail.com' into the email field",
          data: { value: "fake_user_test@gmail.com" },
        },
        {
          description: "Type 'WrongPassword999!' into the password field",
          data: { value: "WrongPassword999!" },
        },
        {
          description: "Click the sign-in/login submit button",
          waitUntil: "An error message or alert appears",
        },
      ],
      assertions: [
        { assertion: "An error message is displayed about invalid credentials or wrong password" },
        { assertion: "The user remains on the login page and is NOT logged in" },
      ],
      test,
      expect,
    });
  });
});
