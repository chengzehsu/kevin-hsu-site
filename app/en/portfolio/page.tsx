import { PortfolioPage } from "@/components/PortfolioPage";
import { buildPortfolioMetadata } from "@/lib/metadata";

export const metadata = buildPortfolioMetadata("en");

export default function Page() {
  return <PortfolioPage locale="en" />;
}
