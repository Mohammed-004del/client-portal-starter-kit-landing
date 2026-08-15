import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Self-hosted, subset, font-display: swap — the same set the product page
// loads. Arabic is fetched on demand by LocaleProvider.
import '@fontsource/ibm-plex-sans/latin-400.css'
import '@fontsource/ibm-plex-sans/latin-500.css'
import '@fontsource/ibm-plex-sans/latin-600.css'
import '@fontsource/ibm-plex-sans/latin-700.css'
import '@fontsource/ibm-plex-mono/latin-400.css'

import './index.css'
import GuidePage from './guide-page'
import { GUIDE_META } from './guide-content'
import { LocaleProvider } from './i18n'

/**
 * dir/lang are set from storage before paint by the inline script in
 * guide.html and kept in sync by LocaleProvider — the same contract as the
 * product page. The guide's own meta is passed in here rather than set in a
 * child effect: child effects run first, so the provider would overwrite it.
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LocaleProvider meta={GUIDE_META}>
      <GuidePage />
    </LocaleProvider>
  </StrictMode>,
)
