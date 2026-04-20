/**
 * Hoppscotch — API Development Platform Tests
 * Tests: Request builder UI, method switching, URL input,
 *        sending requests, response viewing, header management.
 *
 * Target: https://hoppscotch.io
 */

import { test, expect } from "@playwright/test";
import { runSteps, runUserFlow, assert } from "passmark";

const BASE_URL = "https://hoppscotch.io";

test.describe("Hoppscotch — API Request Builder", () => {
  test("Main interface loads with request builder", async ({ page }) => {
    test.setTimeout(90_000);

    await runSteps({
      page,
      userFlow: "Verify Hoppscotch main interface loads",
      steps: [
        { description: `Navigate to ${BASE_URL}` },
        {
          description: "Wait for the API testing interface to load",
          waitUntil: "A URL input field and a Send button are visible",
        },
      ],
      assertions: [
        { assertion: "There is a URL input field for entering API endpoints" },
        { assertion: "There is a method selector (GET, POST, etc.)" },
        { assertion: "There is a Send button to execute requests" },
        { assertion: "The default HTTP method shown is GET" },
      ],
      test,
      expect,
    });
  });

  test("Send a GET request and view response", async ({ page }) => {
    test.setTimeout(120_000);

    await runSteps({
      page,
      userFlow: "Send a GET request to a public API",
      steps: [
        { description: `Navigate to ${BASE_URL}` },
        {
          description: "Wait for the interface to load",
          waitUntil: "URL input field is visible",
        },
        {
          description:
            "Clear the URL field and type 'https://jsonplaceholder.typicode.com/posts/1'",
          data: { value: "https://jsonplaceholder.typicode.com/posts/1" },
        },
        {
          description: "Click the Send button",
          waitUntil: "A response appears in the response panel",
        },
      ],
      assertions: [
        { assertion: "A JSON response body is displayed" },
        { assertion: "The response contains data with 'userId', 'id', 'title', or 'body' fields" },
        { assertion: "The response status shows 200 or OK" },
      ],
      test,
      expect,
    });
  });

  test("Switch HTTP method to POST", async ({ page }) => {
    test.setTimeout(90_000);

    await runSteps({
      page,
      userFlow: "Change the HTTP method from GET to POST",
      steps: [
        { description: `Navigate to ${BASE_URL}` },
        {
          description: "Wait for the interface to load",
          waitUntil: "The method selector is visible",
        },
        {
          description:
            "Click on the HTTP method dropdown (currently showing GET)",
          waitUntil: "A list of HTTP methods appears (GET, POST, PUT, DELETE, etc.)",
        },
        {
          description: "Select POST from the method list",
          waitUntil: "The method selector now shows POST",
        },
      ],
      assertions: [
        { assertion: "The HTTP method selector now displays POST" },
        {
          assertion:
            "A request body input area becomes available or is visible for composing POST data",
        },
      ],
      test,
      expect,
    });
  });

  test("Add custom headers to request", async ({ page }) => {
    test.setTimeout(120_000);

    await runUserFlow({
      page,
      userFlow: "Add a custom header to an API request",
      steps: `
        Navigate to ${BASE_URL}.
        Wait for the interface to load.
        Find the Headers tab or section in the request builder.
        Click on it to open the headers editor.
        Add a new header with key 'X-Custom-Header' and value 'passmark-test'.
        Verify the header was added to the list.
      `,
      effort: "high",
    });

    await assert({
      page,
      assertion:
        "The headers section shows at least one custom header entry, or the headers tab is active",
      expect,
    });
  });
});

test.describe("Hoppscotch — Workspace Features", () => {
  test("Collections sidebar is accessible", async ({ page }) => {
    test.setTimeout(90_000);

    await runSteps({
      page,
      userFlow: "Check collections panel",
      steps: [
        { description: `Navigate to ${BASE_URL}` },
        {
          description: "Wait for the interface to load fully",
          waitUntil: "The main interface with sidebar is visible",
        },
        {
          description:
            "Look for a Collections panel or sidebar on the left side",
        },
      ],
      assertions: [
        {
          assertion:
            "A sidebar or panel for organizing API collections is visible or accessible",
        },
        { assertion: "The sidebar has options for creating new collections or folders" },
      ],
      test,
      expect,
    });
  });
});
