"use client";

import { useEffect, useRef, useState } from "react";
import { contact } from "@/content/site";

export default function CopyEmail() {
  const [status, setStatus] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  async function copy() {
    if (timer.current) clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(contact.email);
      setStatus("Email copied");
    } catch {
      setStatus("Select the address below to copy it.");
    }
    timer.current = setTimeout(() => setStatus(""), 4000);
  }
  return (
    <span className="contact-copy">
      <button type="button" onClick={copy}>
        Copy email <span aria-hidden="true">⧉</span>
      </button>
      <span role="status" className="contact-copy-status">
        {status}
      </span>
    </span>
  );
}
