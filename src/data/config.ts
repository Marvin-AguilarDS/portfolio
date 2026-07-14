// ---------------------------------------------------------------------------
// Data source configuration.
//
// Flip `DATA_SOURCE` (or set the VITE_DATA_SOURCE env var) to switch the whole
// app between reading static JSON files and reading from a MongoDB-backed API —
// without touching a single component.
//
//   VITE_DATA_SOURCE=json   → JsonAdapter   (reads /data/*.json)   [default]
//   VITE_DATA_SOURCE=mongo  → MongoAdapter  (reads VITE_API_BASE_URL)
// ---------------------------------------------------------------------------

import { asset } from '@/lib/asset'

export type DataSource = 'json' | 'mongo'

const envSource = import.meta.env.VITE_DATA_SOURCE as DataSource | undefined

/** The active data source. Change this line to switch backends. */
export const DATA_SOURCE: DataSource = envSource ?? 'json'

/** Where the JSON adapter looks for its files (served from /public, base-aware). */
export const JSON_BASE_PATH = import.meta.env.VITE_JSON_BASE_PATH ?? asset('/data')

/** Base URL of the REST API that fronts MongoDB (used by the mongo adapter). */
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api'
