import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { DEFAULT_LOCALE, DIR, META, type Locale } from './content'
import {
  isLocale,
  LocaleContext,
  STORAGE_KEY,
  type LocaleContextValue,
} from './locale-context'

function readStoredLocale(): Locale {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return isLocale(stored) ? stored : DEFAULT_LOCALE
  } catch {
    // Private mode / storage disabled. Fall back rather than crash the page.
    return DEFAULT_LOCALE
  }
}

function setMeta(selector: string, value: string) {
  document.head.querySelector(selector)?.setAttribute('content', value)
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readStoredLocale)

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Preference simply will not persist. Not worth failing over.
    }
  }, [])

  useEffect(() => {
    const root = document.documentElement
    root.lang = locale
    root.dir = DIR[locale]

    document.title = META.title[locale]
    setMeta('meta[name="description"]', META.description[locale])
    setMeta('meta[property="og:title"]', META.title[locale])
    setMeta('meta[property="og:description"]', META.description[locale])
    setMeta('meta[property="og:locale"]', locale === 'ar' ? 'ar_EG' : 'en_US')
    setMeta('meta[property="og:image:alt"]', META.ogAlt[locale])
    setMeta('meta[name="twitter:title"]', META.title[locale])
    setMeta('meta[name="twitter:description"]', META.description[locale])
  }, [locale])

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      setLocale,
      t: <T,>(entry: Record<Locale, T>): T => entry[locale],
    }),
    [locale, setLocale],
  )

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}
