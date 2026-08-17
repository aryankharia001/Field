// Fictional, illustrative case studies used to demonstrate layout & motion.
// Replace with real project data and imagery when available.

export const PROJECTS = [
  {
    slug: "syncly",
    number: "01",
    name: "SYNCly",
    category: "Collaborative Web Application",
    tech: "React / Node / MongoDB",
    year: "2026",
    treatment: "browser",
    accent: "lime",
    summary:
      "A real-time workspace for distributed teams — canvas, chat and task tracking collapsed into one surface.",
    challenge:
      "The client's existing tool forced teams across three surfaces to track one project. Context — and time — was lost in the handoffs.",
    approach:
      "We consolidated the experience around a single live canvas, using optimistic UI and CRDT-based sync so collaboration felt instant regardless of network conditions.",
    build:
      "A React front-end backed by a Node/WebSocket layer, with MongoDB for durable state and Redis for presence. Every interaction — cursor movement, edits, comments — replicates in under 80ms.",
    result:
      "Teams consolidated three tools into one. Average time-to-decision on shared documents dropped noticeably in early client usage.",
  },
  {
    slug: "northpeak",
    number: "02",
    name: "NORTHPEAK",
    category: "E-Commerce Platform",
    tech: "Next.js / Shopify Hydrogen / Stripe",
    year: "2025",
    treatment: "shape-high",
    accent: "violet",
    summary:
      "A headless storefront for a technical outdoor-gear brand, built to survive seasonal traffic spikes without buckling.",
    challenge:
      "Their previous storefront fell over during flash sales and offered no room for editorial merchandising.",
    approach:
      "We moved to a headless architecture, decoupling storefront rendering from commerce logic and pre-rendering high-traffic paths at the edge.",
    build:
      "Next.js on the edge, Shopify Hydrogen for commerce primitives, and a custom merchandising layer that lets the client's team compose landing pages without engineering support.",
    result:
      "The storefront held through a 12x traffic spike on launch day with zero downtime.",
  },
  {
    slug: "velix",
    number: "03",
    name: "VELIX",
    category: "Analytics Dashboard",
    tech: "React / PostgreSQL / D3",
    year: "2025",
    treatment: "dark",
    accent: "lime",
    summary:
      "A data platform for logistics operators, turning millions of shipment events into a legible, real-time picture.",
    challenge:
      "Operators were making routing decisions from static spreadsheets refreshed twice a day.",
    approach:
      "We designed a live operational view prioritizing the handful of signals that actually change decisions, backed by an aggressively indexed query layer.",
    build:
      "A React front-end rendering custom D3 visualizations over a PostgreSQL warehouse, streaming updates via server-sent events.",
    result:
      "Routing decisions moved from twice-daily to real-time, with dashboard load times under 400ms at scale.",
  },
  {
    slug: "orbital",
    number: "04",
    name: "ORBITAL",
    category: "Brand & Product Launch",
    tech: "Three.js / GSAP / Vite",
    year: "2026",
    treatment: "fullscreen",
    accent: "violet",
    summary:
      "A generative, scroll-driven launch site for a hardware product — built to be the internet's first impression of the device.",
    challenge:
      "The client needed a launch moment that felt as engineered as the product itself, on a four-week timeline.",
    approach:
      "We prioritized one unforgettable interaction over a dozen forgettable ones: a single WebGL centerpiece the whole page is built around.",
    build:
      "A lightweight Three.js scene choreographed with GSAP ScrollTrigger, optimized to stay performant on mid-tier mobile devices.",
    result:
      "The launch page outperformed the client's previous campaign benchmarks for time-on-page by a wide margin.",
  },
];
