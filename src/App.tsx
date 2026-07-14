import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ErrorBoundary } from './components/layout/ErrorBoundary'
import { Layout } from './components/layout/Layout'
import { PortfolioProvider } from './context/PortfolioContext'
import { MenuPage } from './pages/MenuPage'
import { SectionPage } from './pages/SectionPage'

// Serve routes under the deployment base (e.g. '/portfolio' on GitHub Pages).
const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/'

export default function App() {
  return (
    <main className="expedition-grain relative min-h-screen w-full">
      <ErrorBoundary>
        <BrowserRouter basename={basename}>
          <PortfolioProvider>
            <Routes>
              <Route element={<Layout />}>
                <Route index element={<MenuPage />} />
                <Route path=":sectionId" element={<SectionPage />} />
              </Route>
            </Routes>
          </PortfolioProvider>
        </BrowserRouter>
      </ErrorBoundary>
    </main>
  )
}
