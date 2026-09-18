import { notFound } from "next/navigation";
import { getContent } from "@/content";
import { CasePage } from "@/components/CasePage";
import { buildMetadata } from "@/lib/metadata";

const content = getContent("en");
type Props = { params: Promise<{ id: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return content.cases.items.map(({ id }) => ({ id }));
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const item = content.cases.items.find((item) => item.id === id);
  if (!item) notFound();
  return buildMetadata("en", item);
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const item = content.cases.items.find((item) => item.id === id);
  if (!item) notFound();
  return <CasePage item={item} content={content} locale="en" />;
}
