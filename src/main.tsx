import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Self-hosted, subset, font-display: swap. No external font CDN — the page
// must not make a third-party request to render its own text.
import '@fontsource/ibm-plex-sans/latin-400.css'
import '@fontsource/ibm-plex-sans/latin-500.css'
import '@fontsource/ibm-plex-sans/latin-600.css'
import '@fontsource/ibm-plex-sans/latin-700.css'
import '@fontsource/ibm-plex-mono/latin-400.css'
// The Arabic faces are ~88 KB and English is the default, so they are fetched
// on demand by LocaleProvider rather than on every first paint.

import './index.css'
import App from './App'
import { LocaleProvider } from './i18n'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LocaleProvider>
      <App />
    </LocaleProvider>
  </StrictMode>,
)
