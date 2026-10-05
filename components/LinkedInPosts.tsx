import { ArrowRightIcon, ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import type { SectionProps } from "@/content/types";
import { casePath } from "@/lib/locale";
import styles from "./LinkedInPosts.module.css";

/**
 * The hero's three traits, each backed by a real build: lead tile, two stacked tiles, one wide tile.
 * These are habits, not portfolio entries: every build links back to the case it belongs to.
 */
export function LinkedInPosts({ content, locale }: SectionProps) {
  const posts = content.linkedinPosts;
  // The short case name is the part before the colon: "AI 節能產品：…" / "AI energy product: …".
  const caseName = (id: string) =>
    content.cases.items.find((item) => item.id === id)?.title.split(/[：:]/)[0] ?? "";

  return (
    <section
      id="linkedin-posts"
      className="content-section"
      aria-labelledby="linkedin-posts-heading"
    >
      <div className="mx-auto w-full max-w-site px-4 sm:px-6 lg:px-8">
        <div className={`${styles.heading} scroll-rise`}>
          <h2 id="linkedin-posts-heading" className="section-title">
            {posts.title}
          </h2>
          <p>{posts.intro}</p>
        </div>
        <div className={styles.bento}>
          {posts.items.map((post, index) => (
            <article
              key={post.title}
              className={`${styles.tile} scroll-rise`}
              data-tile={index}
            >
              <div className={styles.media}>
                <Image
                  className={styles.image}
                  src={post.image.src}
                  alt={post.image.alt}
                  width={post.image.width}
                  height={post.image.height}
                  sizes={
                    index === 0
                      ? "(max-width: 767px) 100vw, 60vw"
                      : "(max-width: 767px) 100vw, 40vw"
                  }
                />
              </div>
              <div className={styles.body}>
                <p className={styles.trait}>{post.trait}</p>
                <p className={styles.stat}>
                  <span className={styles.statValue}>{post.stat}</span>
                  <span className={styles.statLabel}>{post.statLabel}</span>
                </p>
                <h3>{post.title}</h3>
                <p className={styles.description}>{post.description}</p>
                <p className={styles.links}>
                  <a
                    className={`${styles.link} action-link`}
                    href={casePath(locale, post.caseId)}
                  >
                    {posts.caseLabel}
                    {locale === "zh" ? "：" : ": "}
                    {caseName(post.caseId)}
                    <ArrowRightIcon size={18} aria-hidden="true" />
                  </a>
                {post.href ? (
                  <a
                    className={`${styles.link} ${styles.external} action-link`}
                    href={post.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {posts.readLabel}
                    <span className="sr-only">
                      {locale === "zh"
                        ? `：${post.title}（${posts.platform}）`
                        : `: ${post.title} (${posts.platform})`}
                    </span>
                    <ArrowUpRightIcon size={18} aria-hidden="true" />
                  </a>
                ) : null}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
