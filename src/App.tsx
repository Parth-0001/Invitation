import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { WeddingPage } from './pages/WeddingPage'

const routerBasename = import.meta.env.BASE_URL.replace(/\/$/, '')

export default function App() {
  return (
    <BrowserRouter basename={routerBasename || undefined}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:slug" element={<WeddingPage />} />
      </Routes>
    </BrowserRouter>
  )
}
