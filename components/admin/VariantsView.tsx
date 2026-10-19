"use client";

import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import {
  DRAFT,
  deleteVariant,
  saveVariant,
  type Variant,
} from "@/lib/adminApi";
import type { LocaleBase } from "@/lib/adminBase";
import type { Locale } from "@/lib/locale";
import { numericTokens, TEXT_KEYS, type TextKey } from "@/lib/variants";
import type { Desk } from "./AdminApp";
import styles from "./admin.module.css";

type Raw = Record<string, unknown>;

const TEXT_LABELS: Record<
  TextKey,
  { label: string; hint?: string; rows: number }
> = {
  "hero.headline": {
    label: "首頁標題",
    hint: "用【】標出要強調的字，例如：找出【卡點】，做出【解法】。",
    rows: 2,
  },
  "resume.headline": { label: "履歷標題", rows: 2 },
  "resume.summary": { label: "履歷摘要", rows: 5 },
  "resume.keywords": { label: "關鍵字", rows: 3 },
};

/** Applications that use each variant, and whether any of them has been sent (which locks it). */
function usage(desk: Desk) {
  const map = new Map<string, { count: number; locked: boolean }>();
  for (const a of desk.applications) {
    if (!a.variant) continue;
    const entry = map.get(a.variant) ?? { count: 0, locked: false };
    entry.count += 1;
    entry.locked ||= a.status !== DRAFT;
    map.set(a.variant, entry);
  }
  return map;
}

/** Drops empty overrides and orders equal to the main order, so a saved variant holds only real changes. */
function clean(raw: Raw, base: LocaleBase | undefined): Raw {
  const out: Raw = {};
  for (const [key, value] of Object.entries(raw)) {
    if (typeof value === "string") {
      if (value.trim()) out[key] = value.trim();
    } else if (Array.isArray(value)) {
      const main =
        key === "skills.order"
          ? base?.skills.map((s) => s.id)
          : key === "cases.order"
            ? base?.cases.map((c) => c.id)
            : undefined;
      if (value.length && JSON.stringify(value) !== JSON.stringify(main))
        out[key] = value;
    } else if (value && typeof value === "object") {
      const spec = value as { pick?: number[]; extra?: string };
      const pick = spec.pick ?? [];
      const extra = spec.extra?.trim();
      if (pick.length || extra) out[key] = extra ? { pick, extra } : { pick };
    }
  }
  return out;
}

export function VariantsView({ desk }: { desk: Desk }) {
  const [editing, setEditing] = useState<Variant | "new" | null>(null);
  const [message, setMessage] = useState<{
    tone?: "error" | "ok";
    text: string;
  }>({ text: "" });
  const [confirmDelete, setConfirmDelete] = useState("");
  const used = useMemo(() => usage(desk), [desk]);

  async function duplicate(variant: Variant) {
    try {
      const copy = await saveVariant(null, {
        name: `${variant.name}（複本）`,
        note: variant.note,
        zh: variant.zh ?? {},
        en: variant.en ?? {},
      });
      await desk.reload();
      setMessage({
        tone: "ok",
        text: `已複製成「${copy.name}」，可以直接修改。`,
      });
    } catch (error) {
      if (!desk.onAuthLost(error))
        setMessage({
          tone: "error",
          text: error instanceof Error ? error.message : String(error),
        });
    }
  }

  async function remove(variant: Variant) {
    if (confirmDelete !== variant.id) {
      setConfirmDelete(variant.id);
      return;
    }
    try {
      await deleteVariant(variant.id);
      await desk.reload();
      setMessage({ tone: "ok", text: `已刪除「${variant.name}」` });
    } catch (error) {
      if (!desk.onAuthLost(error))
        setMessage({
          tone: "error",
          text: error instanceof Error ? error.message : String(error),
        });
    }
    setConfirmDelete("");
  }

  return (
    <section aria-labelledby="variants-title">
      <div className={styles.head}>
        <div>
          <h1 id="variants-title" className={styles.title}>
            版本
          </h1>
          <p className={styles.lede}>
            針對職缺調整 HR 第一眼看的幾處，其餘內容和主站一樣。
          </p>
        </div>
        <button
          type="button"
          className={styles.primary}
          onClick={() => setEditing("new")}
          disabled={!desk.base}
        >
          新增版本
        </button>
      </div>
      {!desk.base ? (
        <p className={styles.message} data-tone="error">
          讀不到主站文案（/admin/base.json），暫時不能編輯版本。
        </p>
      ) : null}
      <p className={styles.message} data-tone={message.tone} role="status">
        {message.text}
      </p>

      {desk.variants.length ? (
        <div className={styles.cards}>
          {desk.variants.map((v) => {
            const use = used.get(v.id);
            const changes =
              Object.keys(v.zh ?? {}).length + Object.keys(v.en ?? {}).length;
            return (
              <article key={v.id} className={styles.card}>
                <div className={styles.cardHead}>
                  <h2 className={styles.cardName}>{v.name}</h2>
                  {use?.locked ? (
                    <span className={styles.badge}>已寄出・鎖定</span>
                  ) : null}
                </div>
                {v.note ? <p className={styles.hint}>{v.note}</p> : null}
                <p className={styles.hint}>
                  改了 {changes} 處・
                  {use ? `用在 ${use.count} 筆投遞` : "還沒用在投遞"}・更新於{" "}
                  {new Date(v.updated).toLocaleDateString("zh-TW")}
                </p>
                <div className={styles.cardActions}>
                  <button
                    type="button"
                    className={styles.button}
                    onClick={() => setEditing(v)}
                    disabled={!desk.base}
                  >
                    {use?.locked ? "查看" : "編輯"}
                  </button>
                  <button
                    type="button"
                    className={styles.button}
                    onClick={() => duplicate(v)}
                  >
                    複製成新版本
                  </button>
                  <a
                    className={styles.ghost}
                    href={`/resume/?preview=${v.id}`}
                    target="_blank"
                    rel="noopener"
                  >
                    預覽中文
                  </a>
                  <a
                    className={styles.ghost}
                    href={`/en/resume/?preview=${v.id}`}
                    target="_blank"
                    rel="noopener"
                  >
                    預覽英文
                  </a>
                  {!use ? (
                    <button
                      type="button"
                      className={styles.danger}
                      onClick={() => remove(v)}
                    >
                      {confirmDelete === v.id ? "再按一次確認" : "刪除"}
                    </button>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className={`${styles.tableWrap} ${styles.empty}`}>
          <p>
            還沒有版本。新增一個版本，例如「流程改善職缺」，把履歷摘要、能力卡順序換成那份職缺看重的重點；
            沒改的欄位會沿用主站。
          </p>
          <button
            type="button"
            className={styles.primary}
            onClick={() => setEditing("new")}
            disabled={!desk.base}
          >
            新增版本
          </button>
        </div>
      )}

      {editing && desk.base ? (
        <VariantEditor
          key={editing === "new" ? "new" : editing.id}
          desk={desk}
          variant={editing === "new" ? null : editing}
          locked={editing !== "new" && Boolean(used.get(editing.id)?.locked)}
          onDuplicate={
            editing !== "new"
              ? () => duplicate(editing).then(() => setEditing(null))
              : undefined
          }
          onClose={() => setEditing(null)}
        />
      ) : null}
    </section>
  );
}

function VariantEditor({
  desk,
  variant,
  locked,
  onDuplicate,
  onClose,
}: {
  desk: Desk;
  variant: Variant | null;
  locked: boolean;
  onDuplicate?: () => void;
  onClose: () => void;
}) {
  const base = desk.base!;
  const [name, setName] = useState(variant?.name ?? "");
  const [note, setNote] = useState(variant?.note ?? "");
  const [overlays, setOverlays] = useState<Record<Locale, Raw>>({
    zh: { ...(variant?.zh ?? {}) },
    en: { ...(variant?.en ?? {}) },
  });
  const [locale, setLocale] = useState<Locale>("zh");
  const [message, setMessage] = useState<{
    tone?: "error" | "ok";
    text: string;
  }>({ text: "" });
  const [busy, setBusy] = useState(false);
  const known = useMemo(() => new Set(base.numbers), [base.numbers]);

  const main = base[locale];
  const raw = overlays[locale];
  const setKey = (key: string, value: unknown) =>
    setOverlays((all) => {
      const next = { ...all[locale] };
      if (value === undefined) delete next[key];
      else next[key] = value;
      return { ...all, [locale]: next };
    });

  const unknownNumbers = (text: unknown) =>
    typeof text === "string"
      ? numericTokens(text).filter((token) => !known.has(token))
      : [];

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!name.trim()) {
      setMessage({
        tone: "error",
        text: "請幫這個版本取個名字，例如「流程改善職缺」",
      });
      return;
    }
    setBusy(true);
    try {
      await saveVariant(variant?.id ?? null, {
        name: name.trim(),
        note: note.trim(),
        zh: clean(overlays.zh, base.zh),
        en: clean(overlays.en, base.en),
      });
      await desk.reload();
      onClose();
    } catch (error) {
      if (!desk.onAuthLost(error))
        setMessage({
          tone: "error",
          text: error instanceof Error ? error.message : String(error),
        });
    } finally {
      setBusy(false);
    }
  }

  const skillOrder =
    (raw["skills.order"] as string[] | undefined) ??
    main.skills.map((s) => s.id);
  const caseOrder =
    (raw["cases.order"] as string[] | undefined) ?? main.cases.map((c) => c.id);

  return (
    <>
      <div className={styles.backdrop} onClick={onClose} aria-hidden="true" />
      <form
        className={styles.drawer}
        style={{ width: "min(60rem, 100%)" }}
        onSubmit={submit}
        role="dialog"
        aria-modal="true"
        aria-labelledby="variant-title"
      >
        <div className={styles.drawerHead}>
          <h2 id="variant-title" className={styles.drawerTitle}>
            {variant ? variant.name : "新增版本"}
          </h2>
          <div className={styles.tabs} role="tablist" aria-label="語言">
            {(["zh", "en"] as const).map((l) => (
              <button
                key={l}
                type="button"
                role="tab"
                className={styles.tab}
                aria-selected={locale === l}
                onClick={() => setLocale(l)}
              >
                {l === "zh" ? "中文" : "English"}
              </button>
            ))}
          </div>
          <button type="button" className={styles.ghost} onClick={onClose}>
            關閉
          </button>
        </div>

        <fieldset
          className={styles.drawerBody}
          disabled={locked}
          style={{ border: 0, margin: 0, minWidth: 0 }}
        >
          <div className={styles.form}>
            {locked ? (
              <p className={`${styles.lockNote} ${styles.full}`}>
                這個版本已經寄給公司，內容鎖定為當時的樣子。要改的話請「複製成新版本」，再把新的投遞綁到新版本。
              </p>
            ) : null}
            <label className={styles.field}>
              <span className={styles.label}>版本名稱</span>
              <input
                id="variant-name"
                className={styles.input}
                placeholder="流程改善職缺"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label className={styles.field}>
              <span className={styles.label}>備註</span>
              <input
                id="variant-note"
                className={styles.input}
                placeholder="這版強調什麼、適合哪類職缺"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </label>

            <Section
              title="標題與摘要"
              hint="左邊是主站原文，右邊留空就沿用原文。"
            >
              {TEXT_KEYS.map((key) => {
                const meta = TEXT_LABELS[key];
                const value = (raw[key] as string | undefined) ?? "";
                return (
                  <div key={key} className={styles.field}>
                    <span className={styles.label}>{meta.label}</span>
                    <div className={styles.pair}>
                      <p className={styles.main}>{main.text[key]}</p>
                      <textarea
                        id={`v-${locale}-${key}`}
                        className={styles.textarea}
                        style={{ minHeight: "auto" }}
                        rows={meta.rows}
                        aria-label={`${meta.label}（這個版本）`}
                        placeholder="沿用主站"
                        value={value}
                        onChange={(e) =>
                          setKey(key, e.target.value || undefined)
                        }
                      />
                    </div>
                    {meta.hint ? (
                      <p className={styles.hint}>{meta.hint}</p>
                    ) : null}
                    <NumberWarning tokens={unknownNumbers(value)} />
                  </div>
                );
              })}
            </Section>

            <Section
              title="核心能力卡"
              hint="調整順序：排第一的卡片最大。文字留空就沿用原文。"
            >
              <OrderEditor
                ids={skillOrder}
                label={(id) => main.skills.find((s) => s.id === id)?.name ?? id}
                onChange={(ids) => setKey("skills.order", ids)}
                onReset={
                  raw["skills.order"]
                    ? () => setKey("skills.order", undefined)
                    : undefined
                }
              />
              {skillOrder.map((id) => {
                const skill = main.skills.find((s) => s.id === id);
                if (!skill) return null;
                return (
                  <details
                    key={id}
                    className={styles.group}
                    style={{ background: "var(--bg)" }}
                  >
                    <summary
                      className={styles.groupTitle}
                      style={{ cursor: "pointer" }}
                    >
                      {skill.name}
                      {raw[`skills.card.${id}.statement`] ||
                      raw[`skills.card.${id}.summary`]
                        ? "・已改寫"
                        : ""}
                    </summary>
                    {(["statement", "summary"] as const).map((field) => {
                      const key = `skills.card.${id}.${field}`;
                      const value = (raw[key] as string | undefined) ?? "";
                      return (
                        <div key={field} className={styles.field}>
                          <span className={styles.label}>
                            {field === "statement" ? "主張" : "說明"}
                          </span>
                          <div className={styles.pair}>
                            <p className={styles.main}>{skill[field]}</p>
                            <textarea
                              id={`v-${locale}-${key}`}
                              className={styles.textarea}
                              style={{ minHeight: "auto" }}
                              rows={field === "statement" ? 2 : 3}
                              aria-label={`${skill.name} ${field === "statement" ? "主張" : "說明"}（這個版本）`}
                              placeholder="沿用主站"
                              value={value}
                              onChange={(e) =>
                                setKey(key, e.target.value || undefined)
                              }
                            />
                          </div>
                          <NumberWarning tokens={unknownNumbers(value)} />
                        </div>
                      );
                    })}
                  </details>
                );
              })}
            </Section>

            <Section
              title="經歷重點"
              hint="每段經歷要顯示哪幾條、照什麼順序，可以再加一條。沒選就沿用全部。"
            >
              {main.experience.map((role) => {
                const key = `experience.${role.id}.bullets`;
                const spec =
                  (raw[key] as
                    | { pick?: number[]; extra?: string }
                    | undefined) ?? {};
                const pick = spec.pick ?? [];
                const update = (next: { pick: number[]; extra?: string }) =>
                  setKey(
                    key,
                    next.pick.length || next.extra ? next : undefined,
                  );
                const changed = pick.length > 0 || Boolean(spec.extra);
                return (
                  <details
                    key={role.id}
                    className={styles.group}
                    style={{ background: "var(--bg)" }}
                  >
                    <summary
                      className={styles.groupTitle}
                      style={{ cursor: "pointer" }}
                    >
                      {role.org}・{role.role}
                      {changed
                        ? `・顯示 ${pick.length + (spec.extra ? 1 : 0)} 條`
                        : ""}
                    </summary>
                    {role.bullets.length ? (
                      <>
                        <OrderEditor
                          ids={pick.map(String)}
                          label={(i) => role.bullets[Number(i)] ?? ""}
                          empty="沿用全部條目"
                          onChange={(ids) =>
                            update({ ...spec, pick: ids.map(Number) })
                          }
                          onRemove={(i) =>
                            update({
                              ...spec,
                              pick: pick.filter((n) => n !== Number(i)),
                            })
                          }
                        />
                        <ul className={styles.orderList}>
                          {role.bullets.map((bullet, index) =>
                            pick.includes(index) ? null : (
                              <li key={index} className={styles.orderItem}>
                                <span>{bullet}</span>
                                <button
                                  type="button"
                                  className={styles.button}
                                  onClick={() =>
                                    update({ ...spec, pick: [...pick, index] })
                                  }
                                >
                                  加入
                                </button>
                              </li>
                            ),
                          )}
                        </ul>
                      </>
                    ) : (
                      <p className={styles.hint}>這段經歷沒有條目。</p>
                    )}
                    <label className={styles.field}>
                      <span className={styles.label}>多加一條（選填）</span>
                      <input
                        id={`v-${locale}-${key}-extra`}
                        className={styles.input}
                        value={spec.extra ?? ""}
                        onChange={(e) =>
                          update({ pick, extra: e.target.value || undefined })
                        }
                      />
                    </label>
                    <NumberWarning tokens={unknownNumbers(spec.extra)} />
                  </details>
                );
              })}
            </Section>

            <Section
              title="案例順序"
              hint="首頁的案例和履歷的代表成果，照這個順序排。"
            >
              <OrderEditor
                ids={caseOrder}
                label={(id) => main.cases.find((c) => c.id === id)?.title ?? id}
                onChange={(ids) => setKey("cases.order", ids)}
                onReset={
                  raw["cases.order"]
                    ? () => setKey("cases.order", undefined)
                    : undefined
                }
              />
            </Section>
          </div>
        </fieldset>

        <div className={styles.drawerFoot}>
          {locked ? (
            onDuplicate ? (
              <button
                type="button"
                className={styles.primary}
                onClick={onDuplicate}
              >
                複製成新版本
              </button>
            ) : null
          ) : (
            <button type="submit" className={styles.primary} disabled={busy}>
              {busy ? "儲存中…" : "儲存"}
            </button>
          )}
          <button type="button" className={styles.ghost} onClick={onClose}>
            {locked ? "關閉" : "取消"}
          </button>
          <p
            className={styles.message}
            data-tone={message.tone}
            role="status"
            style={{ flex: 1 }}
          >
            {message.text}
          </p>
        </div>
      </form>
    </>
  );
}

function Section({
  title,
  hint,
  children,
}: {
  title: string;
  hint: string;
  children: ReactNode;
}) {
  return (
    <section className={`${styles.group} ${styles.full}`}>
      <div>
        <h3 className={styles.groupTitle}>{title}</h3>
        <p className={styles.hint}>{hint}</p>
      </div>
      {children}
    </section>
  );
}

function NumberWarning({ tokens }: { tokens: string[] }) {
  if (!tokens.length) return null;
  return (
    <p className={styles.warn} role="status">
      主站沒出現過：{tokens.join("、")}。確認數字跟主站和 LinkedIn 一致再寄出。
    </p>
  );
}

function OrderEditor({
  ids,
  label,
  onChange,
  onReset,
  onRemove,
  empty,
}: {
  ids: string[];
  label: (id: string) => string;
  onChange: (ids: string[]) => void;
  onReset?: () => void;
  onRemove?: (id: string) => void;
  empty?: string;
}) {
  const move = (index: number, by: number) => {
    const next = [...ids];
    [next[index], next[index + by]] = [next[index + by], next[index]];
    onChange(next);
  };
  if (!ids.length) return empty ? <p className={styles.hint}>{empty}</p> : null;
  return (
    <>
      <ol className={styles.orderList}>
        {ids.map((id, index) => (
          <li key={id} className={styles.orderItem}>
            <span>{label(id)}</span>
            <button
              type="button"
              className={styles.iconButton}
              aria-label="往上移"
              disabled={index === 0}
              onClick={() => move(index, -1)}
            >
              ↑
            </button>
            <button
              type="button"
              className={styles.iconButton}
              aria-label="往下移"
              disabled={index === ids.length - 1}
              onClick={() => move(index, 1)}
            >
              ↓
            </button>
            {onRemove ? (
              <button
                type="button"
                className={styles.iconButton}
                aria-label="移除"
                onClick={() => onRemove(id)}
              >
                ×
              </button>
            ) : null}
          </li>
        ))}
      </ol>
      {onReset ? (
        <button
          type="button"
          className={styles.ghost}
          onClick={onReset}
          style={{ justifySelf: "start" }}
        >
          恢復主站順序
        </button>
      ) : null}
    </>
  );
}
