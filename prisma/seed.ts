/**
 * Seed the database with the content that was previously hand-coded in the
 * static HTML files. Re-run with: npm run db:seed
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // ---------- Site config ----------
  await prisma.siteConfig.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      siteName: "Thuvarakan",
      siteTagline: "QA",
      status: "Open to roles",
      copyright: "© 2026 Thuvarakan — Designer · Developer · QA",
      footerCredit:
        "Built & tested by hand · v8 · status: pass · Icons Phosphor",
      ogImage: "/og-image.png",
      themeColor: "#F6F4EF",
      contact: JSON.stringify({
        email: "hello@example.com",
        linkedin: "https://www.linkedin.com/",
        github: "https://github.com/",
        resume: "#",
      }),
      availability: JSON.stringify([
        {
          key: "Engagement",
          value: "Full-time roles",
          note: "Open to QA Engineer / SDET positions on quality-led teams.",
        },
        {
          key: "Location",
          value: "Remote / Hybrid",
          note: "Comfortable across time zones; based GMT+5:30.",
        },
        {
          key: "Notice",
          value: "Two weeks",
          note: "Available to start within two weeks of an offer.",
        },
      ]),
    },
  });

  // ---------- Nav ----------
  const navItems = [
    { order: 1, label: "Home", href: "/" },
    { order: 2, label: "About", href: "/about" },
    { order: 3, label: "Work", href: "/work" },
    { order: 4, label: "Skills", href: "/skills" },
    { order: 5, label: "Contact", href: "/contact" },
  ];
  for (const n of navItems) {
    await prisma.navItem.upsert({
      where: { order: n.order },
      update: { label: n.label, href: n.href },
      create: n,
    });
  }

  // ---------- Pages ----------
  const pages = [
    {
      id: "home",
      title: "Thuvarakan — Designer · Developer · QA",
      description:
        "Thuvarakan - a UI designer (3+ yrs) and frontend developer (1 yr) now in QA. I see the bug, read the code that caused it, and open the PR that fixes it.",
      ogTitle: "Thuvarakan - Designer · Developer · QA",
      ogDescription:
        "Thuvarakan - a UI designer (3+ yrs) and frontend developer (1 yr) now in QA. I see the bug, read the code that caused it, and open the PR that fixes it.",
      canonicalPath: "/",
      hero: JSON.stringify({
        indexBits: [
          "Thuvarakan · QA Engineer",
          "Portfolio 2026",
          "Design → Build → Test",
        ],
        lines: [
          { text: "I designed it.", className: "a" },
          { text: "I built it.", className: "b" },
          { text: "Now I break it.", className: "c", strike: true },
        ],
        lede:
          "Three years in design. One year in code. Now in QA — and that order is the <em>entire point.</em>",
        ctas: [
          { label: "View selected work", href: "/work", style: "solid", icon: "ph-arrow-right" },
          { label: "My trajectory", href: "/about", style: "ghost" },
        ],
      }),
      sections: JSON.stringify({
        trajectory: {
          number: "01",
          title: "Three lives, one obsession",
          tag: "Trajectory",
          stages: [
            {
              status: "done",
              tickIcon: "ph-check-circle",
              tickLabel: "Stage 01 · Passed",
              title: "UI Designer",
              years: "3+ years · 2020–2023",
              body:
                "Owned interfaces end to end — systems, prototypes, usability sessions. Learned how people actually behave versus how the mockup assumes they will.",
            },
            {
              status: "done",
              tickIcon: "ph-check-circle",
              tickLabel: "Stage 02 · Passed",
              title: "Frontend Developer",
              years: "1 year · 2023–2024",
              body:
                "Shipped production UI in JavaScript. Learned where bugs are born — state, async, edge rendering — and how a fix actually gets made.",
            },
            {
              status: "now",
              tickIcon: "ph-circle-notch",
              tickLabel: "Stage 03 · Running",
              title: "QA Engineer",
              years: "Now · 2024–present",
              body:
                "Manual and automated coverage with a designer's eye and a developer's hands. White-box testing, not black-box guessing.",
            },
          ],
          note: "Most QA engineers have one prior life. <b>I have two — and they compound.</b>",
          cta: { label: "Read the full story", href: "/about", style: "ghost", icon: "ph-arrow-up-right" },
        },
        triangle: {
          number: "02",
          title: "What the triangle gives you",
          tag: "In short",
          quadrants: [
            {
              src: "From design",
              title: "I know what wrong feels like",
              body:
                "Functional tests go green while the experience dies. I flag the technically valid, humanly unacceptable bug — the endless spinner, the error with no exit.",
            },
            {
              src: "From dev",
              title: "I test inside the box",
              body:
                "A year shipping frontend means I read the source, follow the async, and know which states aren't covered. White-box, not surface poking.",
            },
            {
              src: "Design + dev",
              title: "I close the loop",
              body:
                "For small defects I don't just file — I branch, fix, and open the PR. QA that ships fixes shortens the loop instead of lengthening the queue.",
            },
            {
              src: "All three",
              title: "I raise the room's bar",
              body:
                "Fluent in design, code and QA, I move quality upstream into standups and reviews — so it becomes the team's reflex.",
            },
          ],
        },
        band: {
          headline: "Let's make quality <em>visible.</em>",
          ctas: [
            { label: "See the work", href: "/work", style: "ghost", icon: "ph-arrow-right" },
            { label: "Get in touch", href: "/contact", style: "solid", icon: "ph-envelope-simple" },
          ],
        },
      }),
    },
    {
      id: "about",
      title: "About — Thuvarakan",
      description:
        "The trajectory: UI Designer to Frontend Developer to QA Engineer - and why that order makes for a rare, full-stack quality mindset.",
      ogTitle: "About - Thuvarakan",
      ogDescription:
        "The trajectory: UI Designer to Frontend Developer to QA Engineer - and why that order makes for a rare, full-stack quality mindset.",
      canonicalPath: "/about",
      hero: JSON.stringify({
        kicker: "02 · About",
        title: "Three lives. One obsession.",
        lede:
          "I've spent the last seven years shipping interfaces — first as a designer, then as a developer, and now as the QA engineer who connects the two. <em>Each stage feeds the next.</em>",
      }),
      sections: JSON.stringify({
        story: {
          number: "01",
          title: "The trajectory, in detail",
          tag: "Career arc",
          lead:
            "I didn't drift into QA. I <em>arrived</em> at it — through three years of designing how products should feel, and a year of coding how they actually behave.",
          paragraphs: [
            "<b>As a designer</b> I owned systems, prototypes, and usability sessions. I learned that the gulf between the mockup and the live product is where most bad experiences are born — not in missing features, but in friction that no one specced.",
            "<b>As a developer</b> I shipped production UI in JavaScript. I learned where bugs come from in practice: state machines that branch one way the design didn't anticipate, asyncs that resolve in the wrong order, render paths that nobody tests because nobody can see them.",
            "<b>As a QA engineer</b> I bring both lenses to every test plan. I write the manual coverage, I author the Playwright specs, and when the defect is small enough I open the fix PR myself.",
          ],
          matrix: [
            { key: "Design tools", value: "Figma · Adobe XD · prototyping · usability sessions", icon: "ph-compass" },
            { key: "Code", value: "JavaScript · TypeScript · React · Node fundamentals", icon: "ph-file-text" },
            { key: "Test", value: "Playwright · Cypress · Jest · axe-core · manual exploratory", icon: "ph-check-circle" },
            { key: "Process", value: "Risk-based test design · CI gating · charter sessions · severity rubrics", icon: "ph-broadcast" },
          ],
        },
        band: {
          headline: "Want to see what this looks like in practice?",
          ctas: [
            { label: "Selected work", href: "/work", style: "solid", icon: "ph-arrow-right" },
            { label: "Skills & tooling", href: "/skills", style: "ghost" },
          ],
        },
      }),
    },
    {
      id: "work",
      title: "Work — Thuvarakan",
      description:
        "Selected QA case studies - regression strategy, accessibility gating, and AI-assisted exploratory testing, with measurable outcomes.",
      ogTitle: "Work - Thuvarakan",
      ogDescription:
        "Selected QA case studies - regression strategy, accessibility gating, and AI-assisted exploratory testing, with measurable outcomes.",
      canonicalPath: "/work",
      hero: JSON.stringify({
        kicker: "04 · Work",
        title: "Selected work.",
        lede:
          "Case studies framed the way QA hiring teams read them — context, approach, and a measurable outcome. <em>Sample content; swap for real projects.</em>",
      }),
      sections: JSON.stringify({
        nums: {
          number: "03",
          title: "By the numbers",
          tag: "Aggregate · sample",
          items: [
            { prefix: "−", value: 71, suffix: "%", label: "Escaped production<br>defects reduced" },
            { prefix: "", value: 1200, suffix: "+", label: "Test cases authored<br>& maintained" },
            { prefix: "", value: 60, suffix: "+", label: "Fix PRs opened by<br>QA, not just filed" },
            { prefix: "", value: 4, suffix: "yr", label: "Design + dev fuelling<br>every single test" },
          ],
        },
        band: {
          headline: "Curious how I'd test <em>your</em> product?",
          ctas: [
            { label: "Start a conversation", href: "/contact", style: "solid", icon: "ph-envelope-simple" },
            { label: "See the toolkit", href: "/skills", style: "ghost" },
          ],
        },
      }),
    },
    {
      id: "skills",
      title: "Skills — Thuvarakan",
      description:
        "Run the suite: an interactive look at what Thuvarakan brings to QA, plus the full automation, code, process and design toolkit.",
      ogTitle: "Skills - Thuvarakan",
      ogDescription:
        "Run the suite: an interactive look at what Thuvarakan brings to QA, plus the full automation, code, process and design toolkit.",
      canonicalPath: "/skills",
      hero: JSON.stringify({
        kicker: "03 · Skills",
        title: "Run the suite.",
        lede:
          "What I bring, in the format I actually use it: <em>specs, results, severity rubrics.</em>",
      }),
      sections: JSON.stringify({
        runner: {
          title: "Quality suite",
          subtitle: "Press play",
          specs: [
            { title: "Catches design-intent regressions", body: "Spots functional-but-wrong UX bugs that pass acceptance tests.", ms: 700 },
            { title: "Reads the source to test", body: "White-box exploration — coverage of states and async paths.", ms: 650 },
            { title: "Ships small fixes", body: "Opens PRs for one-line defects, not just tickets.", ms: 800 },
            { title: "Builds a11y gates in CI", body: "Wires axe-core and a severity rubric into the pipeline.", ms: 750 },
            { title: "AI-assisted exploratory", body: "Annotated screenshots become structured reports in minutes.", ms: 600 },
            { title: "Authors clean Playwright suites", body: "Page-object discipline; flake budget enforced.", ms: 720 },
          ],
        },
        toolkit: {
          number: "02",
          title: "Toolkit",
          tag: "What I reach for",
          columns: [
            {
              heading: "Automation",
              items: [
                { name: "Playwright", note: "Primary" },
                { name: "Cypress", note: "Maintain" },
                { name: "Jest / Vitest", note: "Unit" },
                { name: "axe-core", note: "A11y" },
              ],
            },
            {
              heading: "Code",
              items: [
                { name: "TypeScript", note: "Daily" },
                { name: "React", note: "Daily" },
                { name: "Node basics", note: "Comfortable" },
                { name: "Git workflows", note: "Daily" },
              ],
            },
            {
              heading: "Process",
              items: [
                { name: "Risk-based test design", note: "Lead" },
                { name: "Charter exploratory", note: "Lead" },
                { name: "Severity rubrics", note: "Author" },
                { name: "CI gating", note: "Wire up" },
              ],
            },
            {
              heading: "Design",
              items: [
                { name: "Figma", note: "Fluent" },
                { name: "Prototyping", note: "Fluent" },
                { name: "Usability sessions", note: "Run" },
                { name: "Visual diff", note: "Tooling" },
              ],
            },
          ],
        },
        specimen: {
          number: "03",
          title: "Bug specimen",
          tag: "Anatomy of a good report",
          docId: "BUG-2026-0148",
          severity: "P1 · Blocker",
          summary: "Checkout: rapid double-tap submits payment twice on slow networks",
          environment: "iOS Safari 17.4 · 3G throttling · staging build 4128",
          rows: [
            { label: "Expected", value: "Pay button debounces after first tap; one charge is created." },
            { label: "Actual", value: "Two charges; the second goes to the previous order's customer (state machine reuses cached intent)." },
            { label: "Repro", value: "1. Slow 3G; 2. Add item; 3. Double-tap Pay within 800ms; 4. Observe two 200s in network." },
            { label: "Fix", value: "Debounce the click handler + invalidate intent on success. <code>onSubmit</code> wrapped in <code>useTransition</code>; race covered by a Playwright trace." },
          ],
          note:
            "<b>QA closed the loop:</b> repro recorded, root cause traced to a missing debounce, PR opened with the trace attached.",
        },
        band: {
          headline: "Want this on your team?",
          ctas: [
            { label: "See it applied", href: "/work", style: "ghost" },
            { label: "Get in touch", href: "/contact", style: "solid", icon: "ph-envelope-simple" },
          ],
        },
      }),
    },
    {
      id: "contact",
      title: "Contact — Thuvarakan",
      description:
        "Get in touch with Thuvarakan - QA engineer open to roles on quality-led product teams.",
      ogTitle: "Contact - Thuvarakan",
      ogDescription:
        "Get in touch with Thuvarakan - QA engineer open to roles on quality-led product teams.",
      canonicalPath: "/contact",
      hero: JSON.stringify({
        kicker: "05 · Contact",
        titleHtml:
          'Let\'s talk <span class="u">quality</span>.',
      }),
      sections: JSON.stringify({}),
    },
    {
      id: "not-found",
      title: "404 — Thuvarakan",
      description: "Page not found - Thuvarakan QA portfolio.",
      ogTitle: "404 - Thuvarakan",
      ogDescription: "Page not found - Thuvarakan QA portfolio.",
      canonicalPath: "/404",
      hero: JSON.stringify({
        kicker: "404 · Not found",
        title: "This test was skipped.",
        lede:
          "The page you were looking for doesn't exist — maybe it moved, maybe it was never written. <em>Let's get you somewhere useful.</em>",
        ctas: [
          { label: "Back to home", href: "/", style: "solid", icon: "ph-arrow-right" },
          { label: "Selected work", href: "/work", style: "ghost", icon: "ph-arrow-up-right" },
        ],
      }),
      sections: JSON.stringify({}),
    },
  ];

  for (const p of pages) {
    await prisma.page.upsert({
      where: { id: p.id },
      update: {
        title: p.title,
        description: p.description,
        ogTitle: p.ogTitle,
        ogDescription: p.ogDescription,
        canonicalPath: p.canonicalPath,
        hero: p.hero,
        sections: p.sections,
      },
      create: p,
    });
  }

  // ---------- Case studies ----------
  const caseStudies = [
    {
      order: 1,
      industry: "Fintech / payments",
      context: "8-person squad · CD",
      role: "QA owner + fixer",
      badge: "Shipped",
      badgeIcon: "ph-check-circle",
      title: "A checkout that leaked — closed, then fixed",
      projectName: "Project 01 · Regression strategy & automation",
      challenge:
        "A payment flow shipped a P1 every other release. Manual regression took two days and still missed currency, locale and double-submit cases.",
      approach:
        "Mapped the payment state machine, turned every transition into a Playwright spec, added visual regression on the receipt, risk-prioritised the manual pass to two hours.",
      triangleAction:
        "Found a race on double-tap, traced it to a missing debounce in source, filed it with a repro clip — then opened the one-line fix PR myself.",
      outcomes: JSON.stringify([
        { value: "−71%", label: "Escaped defects / qtr" },
        { value: "2d→2h", label: "Regression cycle" },
        { value: "94%", label: "Critical-path cover" },
      ]),
    },
    {
      order: 2,
      industry: "B2B SaaS",
      context: "Solo QA · 3 squads",
      role: "Quality + a11y",
      badge: "Adopted",
      badgeIcon: "ph-check-circle",
      title: "Accessibility as a release gate",
      projectName: "Project 02 · A11y program in CI",
      challenge:
        "Accessibility was \"later.\" Later never came; an enterprise deal was at risk over WCAG compliance.",
      approach:
        "Wired axe-core into CI, authored a screen-reader checklist, ran sessions with assistive tech, built a severity rubric the whole team could read.",
      triangleAction:
        "Turned abstract WCAG rules into annotated before/after screens, implemented the lint gate in the pipeline, made the criteria a hard pass/fail.",
      outcomes: JSON.stringify([
        { value: "0", label: "Critical a11y at release" },
        { value: "100%", label: "PRs auto-scanned" },
        { value: "+1", label: "Deal unblocked" },
      ]),
    },
    {
      order: 3,
      industry: "Consumer mobile",
      context: "Agile · 12-person",
      role: "Exploratory + AI",
      badge: "40+ defects",
      badgeIcon: "ph-warning",
      title: "AI-assisted exploratory testing at speed",
      projectName: "Project 03 · Modern QA workflow (2026)",
      challenge:
        "Two-week release train, no automation on a fast-moving feature. Manual testing couldn't keep pace with design changes.",
      approach:
        "Charter-based exploratory sessions; an AI assistant turned annotated screenshots into structured reports in minutes; recurring failures fed a CLI Playwright smoke suite in CI.",
      triangleAction:
        "Heuristics came straight from design critique — consistency, feedback, recoverability. The \"looks fine, feels broken\" bugs mattered most, and I could point at the component.",
      outcomes: JSON.stringify([
        { value: "40+", label: "Defects / cycle" },
        { value: "~4min", label: "Screenshot → report" },
        { value: "3×", label: "Coverage vs prior" },
      ]),
    },
  ];

  // Wipe + re-insert (simpler than upsert with unique-order constraint dance)
  await prisma.caseStudy.deleteMany();
  for (const c of caseStudies) {
    await prisma.caseStudy.create({ data: c });
  }

  // ---------- Gallery ----------
  const gallery = [
    {
      order: 1,
      slot: "a",
      src: "https://picsum.photos/seed/qa-regression-dashboard/1200/720",
      alt:
        "Playwright regression dashboard with 1,247 tests across desktop and mobile suites, 99.4% pass rate.",
      label: "Regression",
      title: "Playwright suite at a glance",
      reference: "Project 01",
    },
    {
      order: 2,
      slot: "b",
      src: "https://picsum.photos/seed/qa-bug-repro-double-tap/900/1200",
      alt:
        "Annotated bug repro: double-tap race on the pay button, captured with state-machine overlay.",
      label: "Repro",
      title: "Double-tap race, annotated",
      reference: "Project 01",
    },
    {
      order: 3,
      slot: "c",
      src: "https://picsum.photos/seed/qa-a11y-axe-report/900/700",
      alt: "Before-and-after axe-core report: 47 violations down to zero critical.",
      label: "Accessibility",
      title: "axe-core, before / after",
      reference: "Project 02",
    },
    {
      order: 4,
      slot: "d",
      src: "https://picsum.photos/seed/qa-ci-pipeline-gate/1200/720",
      alt: "CI pipeline view showing the a11y gate blocking a PR with severity rubric attached.",
      label: "CI gate",
      title: "WCAG as a hard pass / fail",
      reference: "Project 02",
    },
    {
      order: 5,
      slot: "e",
      src: "https://picsum.photos/seed/qa-exploratory-charter/1100/780",
      alt: "Charter-based exploratory session notes with heuristics drawn from design critique.",
      label: "Exploratory",
      title: "Session charter & heuristics",
      reference: "Project 03",
    },
    {
      order: 6,
      slot: "f",
      src: "https://picsum.photos/seed/qa-ai-screenshot-report/1100/780",
      alt: "AI assistant turning annotated screenshots into a structured defect report in minutes.",
      label: "AI workflow",
      title: "Screenshot to report, ~4 min",
      reference: "Project 03",
    },
  ];
  await prisma.galleryItem.deleteMany();
  for (const g of gallery) {
    await prisma.galleryItem.create({ data: g });
  }

  console.log("Seeded.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
