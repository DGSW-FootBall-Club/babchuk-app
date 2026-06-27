export const colors = {
  background: "rgb(var(--color-background))",
  subtle: "rgb(var(--color-subtle))",
  muted: "rgb(var(--color-muted))",
  line: "rgb(var(--color-line))",
  lineSubtle: "rgb(var(--color-line-subtle))",
  foreground: "rgb(var(--color-foreground))",
  body: "rgb(var(--color-body))",
  mutedForeground: "rgb(var(--color-muted-foreground))",
  placeholder: "rgb(var(--color-placeholder))",
  primary: "rgb(var(--color-primary))",
  primarySubtle: "rgb(var(--color-primary-subtle))",
  danger: "rgb(var(--color-danger))",
  dangerSubtle: "rgb(var(--color-danger-subtle))",
  success: "rgb(var(--color-success))",
} as const;

export type ColorToken = keyof typeof colors;
