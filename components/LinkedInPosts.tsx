import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import type { SectionProps } from "@/content/types";
import styles from "./LinkedInPosts.module.css";

/** The hero's three traits, each backed by a real build: lead tile, two stacked tiles, one wide tile. */
export function LinkedInPosts({ content }: SectionProps) {
  const posts = content.linkedinPosts;

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
                {post.href ? (
                  <a
                    className={`${styles.link} action-link`}
                    href={post.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {posts.readLabel}
                    <span className="sr-only">
                      ：{post.title}（{posts.platform}）
                    </span>
                    <ArrowUpRightIcon size={18} aria-hidden="true" />
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
