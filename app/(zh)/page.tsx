import { Site } from "@/components/Site";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata("zh");

export default function Page() {
  return <Site locale="zh" />;
}
