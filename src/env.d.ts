/// <reference path="../.astro/types.d.ts" />

// Environment variable types
interface ImportMetaEnv {
  readonly PUBLIC_SITE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
