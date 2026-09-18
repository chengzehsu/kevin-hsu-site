import { ArrowUpRightIcon, LinkedinLogoIcon } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import type { SectionProps } from "@/content/types";
import styles from "./LinkedInPosts.module.css";

export function LinkedInPosts({ content }: SectionProps) {
  const posts = content.linkedinPosts;

  return (
    <section id="linkedin-posts" className="content-section" aria-labelledby="linkedin-posts-heading">
      <div className="mx-auto w-full max-w-site px-4 sm:px-6 lg:px-8">
        <div className={styles.heading}>
          <h2 id="linkedin-posts-heading" className="section-title">{posts.title}</h2>
          <p>{posts.intro}</p>
        </div>
        <div className={styles.grid}>
          {posts.items.map((post) => (
            <article key={post.href} className={styles.card}>
              <div className={styles.media}>
                <Image className={styles.image} src={post.image.src} alt={post.image.alt} width={post.image.width} height={post.image.height} sizes="(max-width: 767px) 100vw, 50vw" />
              </div>
              <div className={styles.meta}>
                <span>{posts.author}</span>
                <span className={styles.platform}><LinkedinLogoIcon size={18} weight="fill" aria-hidden="true" />{posts.platform}</span>
              </div>
              <h3>{post.title}</h3>
              <p>{post.description}</p>
              <a className={`${styles.link} action-link`} href={post.href} target="_blank" rel="noopener noreferrer">
                {posts.readLabel}
                <ArrowUpRightIcon size={18} aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
