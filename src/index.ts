/**
 * RuriOS Core — public tool interface.
 *
 * These are the type definitions for the layer that sits between an operator
 * and Robinhood Chain. The core prepares actions; it never holds custody and
 * never signs. Every write is handed back to the operator for approval.
 */

export const ROBINHOOD_CHAIN = {
  chainId: 4663,
  name: 'Robinhood Chain',
  nativeGas: 'ETH',
  rpc: 'https://robinhood-rpc.publicnode.com',
  explorer: 'https://robinhoodchain.blockscout.com',
} as const

/** A grounded reference attached to every claim RuriOS surfaces. */
export interface Source {
  kind: 'pool' | 'transaction' | 'holder-snapshot' | 'market'
  ref: string
}

export interface TokenSignal {
  address: string
  symbol: string
  name: string
  priceUsd: number | null
  marketCapUsd: number | null
  volume24hUsd: number | null
  liquidityUsd: number | null
  change24hPct: number | null
  holders: number | null
  riskRating: 'low' | 'medium' | 'high'
  sources: Source[]
}

export interface WalletReport {
  address: string
  realizedPnlUsd: number | null
  winRate: number | null
  avgHoldingHours: number | null
  narratives: string[]
  confidence: number // 0..100
  sources: Source[]
}

/** A prepared action. Never executed by the core; returned for signature. */
export interface PreparedAction {
  type: 'swap' | 'stake' | 'monitor' | 'rebalance'
  summary: string
  chainId: typeof ROBINHOOD_CHAIN.chainId
  requiresApproval: true
  tx?: unknown // an unsigned transaction request, when applicable
}

/** The four faculties, exposed as a bounded, inspectable surface. */
export interface RuriCore {
  research(objective: string): Promise<TokenSignal[]>
  investigate(address: string): Promise<WalletReport>
  plan(goal: string): Promise<PreparedAction[]>
  prepare(intent: string): Promise<PreparedAction>
}
