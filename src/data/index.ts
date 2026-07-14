import type { PortfolioAdapter } from './adapter'
import { API_BASE_URL, DATA_SOURCE, JSON_BASE_PATH, type DataSource } from './config'
import { JsonAdapter } from './jsonAdapter'
import { MongoAdapter } from './mongoAdapter'

/**
 * Factory that returns the adapter matching the configured data source.
 * The rest of the app depends only on the `PortfolioAdapter` interface, so
 * this factory is the single seam where a backend gets wired in.
 */
export function createAdapter(source: DataSource = DATA_SOURCE): PortfolioAdapter {
  switch (source) {
    case 'mongo':
      return new MongoAdapter(API_BASE_URL)
    case 'json':
    default:
      return new JsonAdapter(JSON_BASE_PATH)
  }
}

/** The app-wide singleton adapter. */
export const portfolioAdapter = createAdapter()

export type { PortfolioAdapter }
