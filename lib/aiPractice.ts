import type { AiPracticeContent, AiPracticeItem } from "@/content/types";

/** Cases that are themselves AI projects: their AI story lives on the case page, not in the AI section. */
export const AI_CASES = ["internal-backend", "namecard", "sensor-naming", "sales-faq", "life-hub", "resume-site"];

const isCaseStory = (item: AiPracticeItem) => Boolean(item.caseId && AI_CASES.includes(item.caseId));

/** The AI section without what the cases already tell: work (products and processes), then life. */
export function aiOnlyPractice(practice: AiPracticeContent): AiPracticeContent {
  const [build, process, life] = practice.chapters;
  const keep = (...chapters: (typeof build)[]) =>
    chapters.flatMap((chapter) => [chapter.lead, ...chapter.items]).filter((item) => !isCaseStory(item));
  const work = keep(build, process);
  const rest = keep(life);
  return {
    ...practice,
    chapters: [
      { ...build, lead: work[0], items: work.slice(1) },
      { ...life, lead: rest[0], items: rest.slice(1) },
    ],
  };
}

/** How many items the AI section lists. */
export function aiOnlyCount(practice: AiPracticeContent): number {
  return aiOnlyPractice(practice).chapters.reduce((sum, chapter) => sum + chapter.items.length + 1, 0);
}

/** The AI and human split behind a case that is an AI project. */
export function aiStoryForCase(practice: AiPracticeContent, caseId: string): AiPracticeItem | undefined {
  if (!AI_CASES.includes(caseId)) return undefined;
  return practice.chapters
    .flatMap((chapter) => [chapter.lead, ...chapter.items])
    .find((item) => item.caseId === caseId);
}
