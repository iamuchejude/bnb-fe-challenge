import type { LoanApplication } from "../schema"

export function toSentenceCase(input: string) {
  const sentence = input
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
  return sentence.trim()
}

export function toStringValue(value?: string | number | boolean) {
  if (typeof value === "boolean") {
    return value ? "True" : "False"
  }
  return value
}

const excludedKeys = ["confirmed"]
export function toCleanEntries(values: Partial<LoanApplication>) {
  const entries = Object.entries(values)
  return entries.filter(([key]) => !excludedKeys.includes(key))
}
