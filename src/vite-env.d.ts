/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * Passcode for the studio diary. Set it at build time (Vercel project settings, or a local
   * `.env`) to something other than the default. It is compiled into the client bundle, so it
   * keeps the diary out of sight on a shared device — it is not authentication. See
   * src/components/admin/StudioLock.tsx.
   */
  readonly VITE_STUDIO_PASSCODE?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
