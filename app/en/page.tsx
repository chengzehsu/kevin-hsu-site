import { Site } from "@/components/Site";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata("en");

export default function Page() {
  return <Site locale="en" />;
}
