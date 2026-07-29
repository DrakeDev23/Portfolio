import { createContext, useContext } from 'react'

export const PortfolioContext = createContext(null)

export function usePortfolioData() {
  return useContext(PortfolioContext)
}
