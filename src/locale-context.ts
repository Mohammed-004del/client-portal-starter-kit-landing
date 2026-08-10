import { createContext, useContext } from 'react'
import type { Locale } from './content'

export const STORAGE_KEY = 'cpsk-locale'

export const isLocale = (value: unknown): value is Locale => value === 'en' || value === 'ar'

export type LocaleContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
  /** Pick the current language out of any Copy or CopyList. */
  t: <T>(entry: Record<Locale, T>) => T
}

export const LocaleContext = createContext<LocaleContextValue | null>(null)

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useLocale must be used inside <LocaleProvider>')
  return ctx
}
