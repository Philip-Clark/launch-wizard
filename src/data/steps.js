export var steps = [
  {
    id: 0,
    title: "What's your brand name?",
    description:
      "This will appear as the main heading on your site. Tell us what kind of business you run so we can tailor the content.",
    key: "brandName",
    type: "brandInfo",
    placeholder: "e.g. AuraLink",
    fieldHints: {
      brandName: [
        "Keep it short and memorable — 1-2 words work best",
        "Avoid generic names; be specific to your niche",
        "Say it out loud — does it roll off the tongue?",
      ],
      businessType: [
        "Be specific: \"Vegan bakery\" beats \"Food business\"",
        "Include your audience: \"Fitness coaching for busy moms\"",
      ],
    },
  },
  {
    id: 1,
    title: "What do you want visitors to do?",
    description:
      "Describe the main action visitors should take. This helps us craft your call-to-action and messaging.",
    key: "ctaIntent",
    type: "text",
    placeholder: "e.g. Sign up for early access, Book a consultation, Buy our product",
    hints: [
      "Lead with a verb: \"Book\", \"Sign up\", \"Get\", \"Start\"",
      "Be specific about the outcome: \"Get a free quote in 60 seconds\"",
      "Keep it under 10 words for the best conversion",
    ],
  },
  {
    id: 2,
    title: "Describe your business.",
    description:
      "Tell us about your brand, what you offer, and who you serve. The more detail, the better your site copy. Minimum 100 characters.",
    key: "description",
    type: "textarea",
    placeholder:
      "e.g. We build AI-powered smart home solutions that make everyday living more convenient, secure, and energy efficient. Our products integrate with all major platforms and are designed for families who value simplicity, safety, and sustainability...",
    minLength: 100,
    hints: [
      "Start with what you do, then who it's for, then why it matters",
      "Mention 2-3 things that set you apart from competitors",
      "Write like you're explaining to a friend, not a boardroom",
    ],
  },
  {
    id: 3,
    title: "Ways to reach you.",
    description:
      "Add your email and phone so visitors can get in touch. Both fields are optional.",
    key: "contact",
    type: "contact",
  },
  {
    id: 4,
    title: "Pick a template.",
    description:
      "Choose a starting design for your site. You can customize everything after.",
    key: "theme",
    type: "theme",
  },
  {
    id: 5,
    title: "Pick your brand colors.",
    description:
      "Choose 1 to 3 colors: a primary accent, a dark secondary, and a muted tertiary. See how they look in the preview.",
    key: "colors",
    type: "colors",
  },
  {
    id: 6,
    title: "Choose your pages.",
    description:
      "Select which pages to include. We've pre-selected what works best based on your answers.",
    key: "pages",
    type: "pages",
  },
  {
    id: 7,
    title: "Upload your logo.",
    description:
      "Your logo will appear in the navigation bar and footer. If you skip this, your brand name will be used as text instead.",
    key: "logo",
    type: "logo",
  },
  {
    id: 8,
    title: "Upload images for your site.",
    description:
      "Add 1 to 8 images. The first will be your hero image, the rest fill feature cards and gallery sections.",
    key: "images",
    type: "images",
  },
  {
    id: 9,
    title: "Review",
    key: "review",
    type: "review",
  },
];
