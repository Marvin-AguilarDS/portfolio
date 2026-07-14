/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DATA_SOURCE?: 'json' | 'mongo'
  readonly VITE_JSON_BASE_PATH?: string
  readonly VITE_API_BASE_URL?: string
  readonly VITE_MUSIC_SRC?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
