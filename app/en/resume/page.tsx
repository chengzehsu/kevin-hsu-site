import { ResumePage } from "@/components/ResumePage";
import { buildResumeMetadata } from "@/lib/metadata";

export const metadata = buildResumeMetadata("en");

export default function Page() {
  return <ResumePage locale="en" />;
}
