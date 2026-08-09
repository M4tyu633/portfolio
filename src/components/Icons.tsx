import type { IconName } from "@/content/data";

/* Every icon is a 24×24 stroked SVG so they all read at the same weight. */
const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const serviceIcons: Record<IconName, React.ReactNode> = {
  agents: (
    <svg {...base}>
      <circle cx="12" cy="4.5" r="2.2" />
      <circle cx="4.5" cy="18" r="2.2" />
      <circle cx="19.5" cy="18" r="2.2" />
      <circle cx="12" cy="12" r="2.2" />
      <path d="M12 6.7v3.1M10.2 13.6 6 16.6M13.8 13.6 18 16.6" />
    </svg>
  ),
  brain: (
    <svg {...base}>
      <path d="M12 5.2a2.7 2.7 0 0 0-5.2.9c-1.5.4-2.4 1.7-2.2 3.2-1.2 1-1.4 2.7-.4 3.9-.5 1.6.5 3.2 2.1 3.5.4 1.4 1.9 2.2 3.3 1.8.7.8 1.9 1 2.4.3" />
      <path d="M12 5.2a2.7 2.7 0 0 1 5.2.9c1.5.4 2.4 1.7 2.2 3.2 1.2 1 1.4 2.7.4 3.9.5 1.6-.5 3.2-2.1 3.5-.4 1.4-1.9 2.2-3.3 1.8-.7.8-1.9 1-2.4.3" />
      <path d="M12 5.2V19" />
    </svg>
  ),
  server: (
    <svg {...base}>
      <rect x="3" y="4" width="18" height="6" rx="1.6" />
      <rect x="3" y="14" width="18" height="6" rx="1.6" />
      <path d="M7 7h.01M7 17h.01" />
    </svg>
  ),
  chip: (
    <svg {...base}>
      <rect x="7" y="7" width="10" height="10" rx="1.6" />
      <path d="M10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4" />
    </svg>
  ),
  gamepad: (
    <svg {...base}>
      <path d="M7.5 7h9a5 5 0 0 1 4.9 5.9l-.6 3.3A2.8 2.8 0 0 1 16.3 18l-1.5-1.7h-5.6L7.7 18a2.8 2.8 0 0 1-4.5-1.8l-.6-3.3A5 5 0 0 1 7.5 7Z" />
      <path d="M8 11v2.4M6.8 12.2h2.4M15.5 11.4h.01M17.4 13.2h.01" />
    </svg>
  ),
  chart: (
    <svg {...base}>
      <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
    </svg>
  ),
};

export const IconGithub = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.09.68-.22.68-.5v-1.74c-2.78.62-3.37-1.37-3.37-1.37-.45-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.34 1.12 2.91.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.35 4.8-4.58 5.05.36.32.68.94.68 1.9v2.82c0 .28.18.6.69.5A10.03 10.03 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
  </svg>
);

export const IconLinkedin = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
  </svg>
);

export const IconFacebook = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.09 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.09 24 18.1 24 12.07Z" />
  </svg>
);

export const IconCopy = () => (
  <svg {...base}>
    <rect x="9" y="9" width="11.5" height="11.5" rx="2" />
    <path d="M6.5 15H5a1.5 1.5 0 0 1-1.5-1.5V5A1.5 1.5 0 0 1 5 3.5h8.5A1.5 1.5 0 0 1 15 5v1.5" />
  </svg>
);

export const IconCheck = () => (
  <svg {...base}>
    <path d="m4.5 12.5 5 5 10-11" />
  </svg>
);

export const IconMail = () => (
  <svg {...base}>
    <rect x="2.5" y="4.5" width="19" height="15" rx="2.4" />
    <path d="m3.5 7 7.4 5.3a2 2 0 0 0 2.2 0L20.5 7" />
  </svg>
);

export const IconArrow = () => (
  <svg {...base}>
    <path d="M5 12h13M13 6l6 6-6 6" />
  </svg>
);

export const IconExternal = () => (
  <svg {...base}>
    <path d="M14 4h6v6M20 4l-8.5 8.5" />
    <path d="M18 14.5V19a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 19V7.5A1.5 1.5 0 0 1 5 6h4.5" />
  </svg>
);

export const IconPlay = () => (
  <svg {...base}>
    <circle cx="12" cy="12" r="9" />
    <path d="M10 8.6 15.5 12 10 15.4Z" />
  </svg>
);

export const IconFilm = () => (
  <svg {...base}>
    <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
    <path d="M7.5 4.5v15M16.5 4.5v15M2.5 12h19M2.5 8.2h5M2.5 15.8h5M16.5 8.2h5M16.5 15.8h5" />
  </svg>
);

export const IconSun = () => (
  <svg {...base}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);

export const IconMoon = () => (
  <svg {...base}>
    <path d="M20 14.2A8.2 8.2 0 0 1 9.8 4a8.2 8.2 0 1 0 10.2 10.2Z" />
  </svg>
);

export const IconPin = () => (
  <svg {...base}>
    <path d="M20 10.5c0 5.2-8 11.5-8 11.5s-8-6.3-8-11.5a8 8 0 1 1 16 0Z" />
    <circle cx="12" cy="10.3" r="2.8" />
  </svg>
);

export const IconDownload = () => (
  <svg {...base}>
    <path d="M12 3.5v11M7.5 10.5 12 15l4.5-4.5" />
    <path d="M4 17v2.5A1.5 1.5 0 0 0 5.5 21h13a1.5 1.5 0 0 0 1.5-1.5V17" />
  </svg>
);

export const IconDoc = () => (
  <svg {...base}>
    <path d="M14 2.5H7A2 2 0 0 0 5 4.5v15a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-12Z" />
    <path d="M14 2.5v5h5M9 13h6M9 17h4" />
  </svg>
);
