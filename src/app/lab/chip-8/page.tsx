import { permanentRedirect } from "next/navigation";
export default function LegacyPage() {
  permanentRedirect("/work/chip-8-emulator");
}
