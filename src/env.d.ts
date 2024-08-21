/// <reference types="vite/client" />

interface ImportMetaEnv {
  // more env variables...
  VITE_BASE_URL: String
  VITE_API_URL: String
  VITE_SSL: String
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
