import { ResumePage } from "@/components/ResumePage";
import { buildResumeMetadata } from "@/lib/metadata";

export const metadata = buildResumeMetadata("zh");

export default function Page() {
  return <ResumePage locale="zh" />;
}
