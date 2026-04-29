import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "28kl9njb",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  // Uses the token from the CLI's logged-in session via SANITY_AUTH_TOKEN env var
  token: process.env.SANITY_AUTH_TOKEN,
});

async function seed() {
  console.log("🌱 Seeding singleton documents...\n");

  // ── Navbar ──────────────────────────────────────────────────────────────────
  const navbar = {
    _id: "navbar",
    _type: "navbar",
    label: "Main Navigation",
    buttons: [
      {
        _key: "btn-demo",
        _type: "button",
        text: "Get a demo",
        variant: "outline",
        url: { _type: "customUrl", external: "#", openInNewTab: false, type: "external" },
      },
      {
        _key: "btn-trial",
        _type: "button",
        text: "Start free trial",
        variant: "default",
        url: { _type: "customUrl", external: "#", openInNewTab: false, type: "external" },
      },
    ],
    columns: [
      {
        _key: "col-product",
        _type: "navbarColumn",
        title: "Product",
        links: [
          {
            _key: "link-agent-builder",
            _type: "navbarColumnLink",
            name: "Agent Builder",
            description: "Build autonomous AI agents visually",
            icon: "Bot",
            url: { _type: "customUrl", external: "#", openInNewTab: false, type: "external" },
          },
          {
            _key: "link-orchestration",
            _type: "navbarColumnLink",
            name: "Orchestration Engine",
            description: "Connect and automate across any stack",
            icon: "Network",
            url: { _type: "customUrl", external: "#", openInNewTab: false, type: "external" },
          },
          {
            _key: "link-connectors",
            _type: "navbarColumnLink",
            name: "Connectors & APIs",
            description: "Integrate 1000+ apps out of the box",
            icon: "Plug",
            url: { _type: "customUrl", external: "#", openInNewTab: false, type: "external" },
          },
        ],
      },
      {
        _key: "col-solutions",
        _type: "navbarColumn",
        title: "Solutions",
        links: [
          {
            _key: "link-enterprise",
            _type: "navbarColumnLink",
            name: "Enterprise",
            description: "Security, scale, and governance for large teams",
            icon: "Building2",
            url: { _type: "customUrl", external: "#", openInNewTab: false, type: "external" },
          },
          {
            _key: "link-startups",
            _type: "navbarColumnLink",
            name: "Startups",
            description: "Move fast with powerful automation",
            icon: "Rocket",
            url: { _type: "customUrl", external: "#", openInNewTab: false, type: "external" },
          },
        ],
      },
      {
        _key: "link-pricing",
        _type: "navbarLink",
        name: "Pricing",
        url: { _type: "customUrl", external: "#", openInNewTab: false, type: "external" },
      },
    ],
  };

  await client.createOrReplace(navbar);
  console.log("✅ Navbar created with _id: 'navbar'");

  // ── Settings ─────────────────────────────────────────────────────────────────
  const settings = {
    _id: "settings",
    _type: "settings",
    label: "Settings",
    siteTitle: "Tray.ai",
    siteDescription: "The agentic integration platform for enterprise teams. Build, automate, and scale with AI-powered workflows.",
    socialLinks: {},
  };

  await client.createOrReplace(settings);
  console.log("✅ Settings created with _id: 'settings'");

  console.log("\n✨ Done! All singletons seeded successfully.");

}

seed().catch((err) => {
  console.error("❌ Seed failed:", err.message);
  process.exit(1);
});
