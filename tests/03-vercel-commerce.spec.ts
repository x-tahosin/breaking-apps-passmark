/**
 * Vercel Commerce Store - Full E-Commerce Flow Tests
 * Tests: Product browsing, filtering, cart management,
 *        product details, search, responsive design.
 *
 * Target: https://demo.vercel.store
 */

import { test, expect } from "@playwright/test";
import { runSteps, runUserFlow, assert } from "passmark";

const BASE_URL = "https://demo.vercel.store";

test.describe("Vercel Commerce — Product Discovery", () => {
  test("Homepage loads with product grid and navigation", async ({ page }) => {
    test.setTimeout(90_000);

    await runSteps({
      page,
      userFlow: "Verify Vercel Commerce homepage",
      steps: [
        { description: `Navigate to ${BASE_URL}` },
        {
          description: "Wait for the product grid to be visible",
          waitUntil: "Product images and names are visible on the page",
        },
      ],
      assertions: [
        { assertion: "Multiple product cards or items are visible" },
        { assertion: "Each product shows a name and price" },
        { assertion: "There is a navigation menu or header with categories" },
        { assertion: "There is a search bar or search icon" },
        { assertion: "There is a cart icon showing 0 items" },
      ],
      test,
      expect,
    });
  });

  test("Search functionality returns relevant results", async ({ page }) => {
    test.setTimeout(90_000);

    await runSteps({
      page,
      userFlow: "Search for a product and verify results",
      steps: [
        { description: `Navigate to ${BASE_URL}` },
        {
          description: "Click on the search bar or search icon",
          waitUntil: "A search input field is active",
        },
        {
          description: "Type 'shirt' into the search field",
          data: { value: "shirt" },
        },
        {
          description: "Press Enter or wait for search results to appear",
          waitUntil: "Search results are displayed",
        },
      ],
      assertions: [
        { assertion: "Search results are shown on the page" },
        { assertion: "The results include items related to 'shirt'" },
        { assertion: "Each search result has a product image and name" },
      ],
      test,
      expect,
    });
  });

  test("Product detail page shows complete information", async ({ page }) => {
    test.setTimeout(90_000);

    await runSteps({
      page,
      userFlow: "Navigate to a product detail page",
      steps: [
        { description: `Navigate to ${BASE_URL}` },
        {
          description: "Click on the first product card visible on the page",
          waitUntil: "A product detail page loads with product information",
        },
      ],
      assertions: [
        { assertion: "The product name/title is prominently displayed" },
        { assertion: "A product price is shown" },
        { assertion: "There is a large product image" },
        { assertion: "There is an 'Add to Cart' button" },
        { assertion: "Product variants (size or color options) are visible" },
      ],
      test,
      expect,
    });
  });
});

test.describe("Vercel Commerce — Cart Management", () => {
  test("Complete add-to-cart flow with variant selection", async ({ page }) => {
    test.setTimeout(120_000);

    await runSteps({
      page,
      userFlow: "Add a product with specific variants to cart",
      steps: [
        { description: `Navigate to ${BASE_URL}` },
        {
          description: "Click on 'Acme Circles T-Shirt' or the first available product",
          waitUntil: "Product detail page is visible",
        },
        {
          description: "Select a color variant (e.g., White or Black)",
          data: { value: "White" },
        },
        {
          description: "Select a size variant",
          data: { value: "M" },
        },
        {
          description: "Click 'Add to Cart'",
          waitUntil: "The cart updates to show 1 item or a cart sidebar appears",
        },
      ],
      assertions: [
        { assertion: "The cart now shows at least 1 item" },
        { assertion: "The cart contains the product that was just added" },
        { assertion: "The cart shows the correct variant (color and size) selected" },
        { assertion: "A total price is displayed in the cart" },
      ],
      test,
      expect,
    });
  });

  test("Cart persists after adding multiple items", async ({ page }) => {
    test.setTimeout(120_000);

    await runUserFlow({
      page,
      userFlow: "Add multiple products to cart and verify cart state",
      steps: `
        Navigate to ${BASE_URL}.
        Click on the first product.
        Select any available color and size options.
        Click Add to Cart.
        Go back to the homepage or product listing.
        Click on a different product.
        Select any available variants.
        Click Add to Cart.
        Open the cart.
        Verify there are 2 different items in the cart.
      `,
      effort: "high",
    });

    await assert({
      page,
      assertion: "The cart contains at least 2 items and shows a total price",
      expect,
    });
  });

  test("Remove item from cart", async ({ page }) => {
    test.setTimeout(120_000);

    await runSteps({
      page,
      userFlow: "Add an item then remove it from cart",
      steps: [
        { description: `Navigate to ${BASE_URL}` },
        {
          description: "Click on the first product",
          waitUntil: "Product detail page is visible",
        },
        {
          description: "Select any available variants and click Add to Cart",
          waitUntil: "Cart shows 1 item",
        },
        {
          description: "Open the cart sidebar or cart page",
          waitUntil: "Cart contents are visible with the added product",
        },
        {
          description: "Click the remove button (X or trash icon) next to the item",
          waitUntil: "The item is removed from the cart",
        },
      ],
      assertions: [
        { assertion: "The cart is now empty or shows 0 items" },
        { assertion: "The removed product is no longer visible in the cart" },
      ],
      test,
      expect,
    });
  });
});

test.describe("Vercel Commerce — Category Navigation", () => {
  test("Filter products by category", async ({ page }) => {
    test.setTimeout(90_000);

    await runSteps({
      page,
      userFlow: "Browse products by category",
      steps: [
        { description: `Navigate to ${BASE_URL}` },
        {
          description: "Find and click on a category link (e.g., 'Bags', 'Stickers', or 'Shirts')",
          waitUntil: "Product listing updates to show category-specific products",
        },
      ],
      assertions: [
        { assertion: "The page shows products filtered by the selected category" },
        { assertion: "The URL has changed to include the category path" },
        { assertion: "Product cards are visible in the filtered view" },
      ],
      test,
      expect,
    });
  });
});
