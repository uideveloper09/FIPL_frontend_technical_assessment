import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from './components/layout/AppShell'
import { PRFormPage } from './pages/PRFormPage'
import { PRListPage } from './pages/PRListPage'
import { PRViewPage } from './pages/PRViewPage'
import { ReviewerGuidePage } from './pages/ReviewerGuidePage'

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<PRListPage />} />
          <Route path="/review" element={<ReviewerGuidePage />} />
          <Route path="/pr/new" element={<PRFormPage />} />
          <Route path="/pr/:id" element={<PRViewPage />} />
          <Route path="/pr/:id/edit" element={<PRFormPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
