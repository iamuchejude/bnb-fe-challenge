import { type ClassValue, clsx } from "clsx"
import { toast, type ToastOptions } from "react-toastify"
import { twMerge } from "tailwind-merge"
import type { z } from "zod"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getValues<T extends z.Schema>(
  data: unknown,
  schema: T
): z.infer<T> {
  return schema.safeParse(data).data ?? {}
}

export function notify(type: ToastOptions["type"], message: string) {
  return toast(message, {
    type,
  })
}

export function appendTo(
  currentParams: URLSearchParams,
  updates: Record<string, string>
) {
  const newParams = new URLSearchParams(currentParams)
  for (const key in updates) newParams.set(key, updates[key])
  return newParams
}

export function toSentenceCase(input: string) {
  const sentence = input
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
  return sentence.trim()
}
