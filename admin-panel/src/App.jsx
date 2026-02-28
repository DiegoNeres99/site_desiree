import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import PrivateRoute from './components/PrivateRoute'
import Layout from './components/Layout'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import ContentPage from './pages/ContentPage'
import ServicesPage from './pages/ServicesPage'
import GalleryPage from './pages/GalleryPage'
import TestimonialsPage from './pages/TestimonialsPage'
import SettingsPage from './pages/SettingsPage'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Rota pública */}
          <Route path="/login" element={<LoginPage />} />

          {/* Rotas protegidas — envolvidas em PrivateRoute */}
          <Route element={<PrivateRoute />}>
            <Route
              path="/*"
              element={
                <Layout>
                  <Routes>
                    <Route path="dashboard" element={<DashboardPage />} />
                    <Route path="content" element={<ContentPage />} />
                    <Route path="services" element={<ServicesPage />} />
                    <Route path="gallery" element={<GalleryPage />} />
                    <Route path="testimonials" element={<TestimonialsPage />} />
                    <Route path="settings" element={<SettingsPage />} />
                    {/* Redirect raiz para dashboard */}
                    <Route path="*" element={<Navigate to="dashboard" replace />} />
                  </Routes>
                </Layout>
              }
            />
          </Route>

          {/* Redirect da raiz para dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
