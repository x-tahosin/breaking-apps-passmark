<div align="center">

# Breaking Apps with Passmark

### AI-Powered Regression Testing for 5 Production Web Apps

[![Hackathon](https://img.shields.io/badge/Hashnode-Breaking%20Apps%20Hackathon-2962FF?style=for-the-badge&logo=hashnode&logoColor=white)](https://hashnode.com/hackathons/breaking-things)
[![Passmark](https://img.shields.io/badge/Passmark-AI%20Testing-FF6B6B?style=for-the-badge)](https://github.com/bug0inc/passmark)
[![Playwright](https://img.shields.io/badge/Playwright-E2E-45BA63?style=for-the-badge&logo=playwright&logoColor=white)](https://playwright.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)

<p align="center">
<strong>30+ AI-driven regression tests across authentication, e-commerce, scheduling, API development, and environmental analysis platforms.</strong>
</p>

---

</div>

## What is This?

A comprehensive AI-powered regression test suite built with **[Passmark](https://github.com/bug0inc/passmark)** — the open-source Playwright library that lets you describe tests in plain English and uses AI (Gemini + Claude) to execute them.

Instead of brittle CSS selectors and XPath queries, every test step is a **natural language instruction** that the AI interprets and executes. When the UI changes, tests self-heal.

## Apps Tested

| # | App | Type | Tests | What's Covered |
|---|-----|------|-------|----------------|
| 1 | **[HOCKS AI](https://hocks-ai.web.app)** | AI Platform | 9 | Auth flow, signup validation, Google OAuth, error handling, chat UI, navigation |
| 2 | **[Vercel Commerce](https://demo.vercel.store)** | E-Commerce | 7 | Product browsing, search, cart CRUD, variant selection, category filtering |
| 3 | **[Cal.com](https://cal.com)** | Scheduling | 4 | Booking flow, date/time selection, timezone handling, form validation |
| 4 | **[Hoppscotch](https://hoppscotch.io)** | API Platform | 5 | Request builder, GET/POST methods, response viewing, headers, collections |
| 5 | **[EcoSense AI](https://ecosense-ai.pages.dev)** | Green Tech | 5 | Quiz flow, step validation, accessibility, mobile responsiveness |

**Total: 30 tests | 80+ assertions | 5 different app categories**

## Why These Apps?

I deliberately chose apps across **different domains and tech stacks** to stress-test Passmark's versatility:

- **HOCKS AI** & **EcoSense AI** — My own projects (Firebase + React, Next.js + Cloudflare)
- **Vercel Commerce** — Complex e-commerce with cart state management
- **Cal.com** — Dynamic date/time scheduling with timezone logic
- **Hoppscotch** — Developer tool with rich interactive UI

## Key Passmark Features Used

| Feature | Where Used |
|---------|-----------|
| `runSteps()` | All test suites — sequential AI-driven steps |
| `runUserFlow()` | Complex multi-step flows (cart management, quiz completion) |
| `assert()` | Standalone multi-model consensus assertions |
| **Multi-model assertions** | Claude + Gemini verify every assertion independently |
| **Natural language steps** | Zero CSS selectors in the entire test suite |
| **Smart wait conditions** | AI-evaluated `waitUntil` instead of `setTimeout` |
| **Viewport testing** | Mobile responsive tests with custom viewports |
| **OpenRouter gateway** | All AI calls routed through OpenRouter |

## Quick Start

```bash
git clone https://github.com/x-tahosin/breaking-apps-passmark.git
cd breaking-apps-passmark
npm install
npx playwright install chromium

# Add your OpenRouter API key
cp .env.example .env
# Edit .env with your key

# Run all tests
npm test

# Run tests for a specific app
npm run test:commerce    # Vercel Commerce
npm run test:hocks       # HOCKS AI
npm run test:calcom      # Cal.com
npm run test:hoppscotch  # Hoppscotch
npm run test:ecosense    # EcoSense AI

# View report
npm run report
```

## Test Architecture

```
breaking-apps-passmark/
├── tests/
│   ├── 01-hocks-ai-auth.spec.ts      # 6 tests — Auth & onboarding
│   ├── 02-hocks-ai-chat.spec.ts      # 3 tests — Chat interface
│   ├── 03-vercel-commerce.spec.ts     # 7 tests — Full e-commerce flow
│   ├── 04-cal-com.spec.ts            # 4 tests — Scheduling & booking
│   ├── 05-hoppscotch.spec.ts         # 5 tests — API request builder
│   ├── 06-documenso.spec.ts          # 5 tests — Document signing
│   └── 07-ecosense-ai.spec.ts        # 5 tests — Carbon footprint quiz
├── playwright.config.ts               # Passmark + OpenRouter config
├── .env.example                       # Environment template
└── package.json                       # Scripts for per-app testing
```

## What I Learned

1. **Natural language tests are surprisingly robust** — Passmark handled UI variations across 5 completely different apps without any selector maintenance
2. **Multi-model assertions catch more bugs** — Claude and Gemini disagree on edge cases, which surfaces real issues
3. **`runUserFlow()` with `effort: "high"` is a game-changer** — For complex multi-step flows, the high-effort mode navigates like a real user
4. **Smart waits eliminate flakiness** — `waitUntil` with natural language conditions is far more reliable than `waitForSelector`
5. **OpenRouter gateway simplifies everything** — One API key instead of managing Anthropic + Google separately

## Built With

- [Passmark](https://github.com/bug0inc/passmark) — AI regression testing
- [Playwright](https://playwright.dev) — Browser automation
- [OpenRouter](https://openrouter.ai) — AI model gateway
- TypeScript

## Author

**[S M Tahosin](https://github.com/x-tahosin)** — AI Developer

- [Dev.to](https://dev.to/tahosin)
- [Hashnode](https://tahosin.hashnode.dev)

---

<div align="center">
<sub>Built for the <a href="https://hashnode.com/hackathons/breaking-things">Hashnode Breaking Apps Hackathon</a> 🏆</sub>
</div>
