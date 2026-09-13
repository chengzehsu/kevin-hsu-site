# `.claude/rules/`

Path-scoped instructions for Claude Code. One topic per `.md` file.

- No `paths:` frontmatter → loads every session (like CLAUDE.md).
- With `paths:` frontmatter → loads only when Claude reads a matching file.

```markdown
---
paths:
  - "src/**/*"
---
```

Keep each file short and concrete. Multi-step procedures belong in a skill, not a rule.
Reference: https://code.claude.com/docs/en/memory#organize-rules-with-claude/rules/
