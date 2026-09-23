import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'

const AboutPage = lazy(() => import('./pages/AboutPage'))
const ServicesPage = lazy(() => import('./pages/ServicesPage'))
const RetailRolesPage = lazy(() => import('./pages/RetailRolesPage'))
const JobsPage = lazy(() => import('./pages/JobsPage'))
const JobDetailPage = lazy(() => import('./pages/JobDetailPage'))
const SubmitResumePage = lazy(() => import('./pages/SubmitResumePage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))

function PageFallback() {
  return (
    <div className="page" style={{ padding: '4rem 1rem', textAlign: 'center', color: 'var(--text-muted)' }}>
      Loading…
    </div>
  )
}

function LazyPage({ children }) {
  return <Suspense fallback={<PageFallback />}>{children}</Suspense>
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'about',
        element: (
          <LazyPage>
            <AboutPage />
          </LazyPage>
        ),
      },
      {
        path: 'services',
        element: (
          <LazyPage>
            <ServicesPage />
          </LazyPage>
        ),
      },
      {
        path: 'retail-roles',
        element: (
          <LazyPage>
            <RetailRolesPage />
          </LazyPage>
        ),
      },
      {
        path: 'jobs',
        element: (
          <LazyPage>
            <JobsPage />
          </LazyPage>
        ),
      },
      {
        path: 'jobs/:jobId',
        element: (
          <LazyPage>
            <JobDetailPage />
          </LazyPage>
        ),
      },
      {
        path: 'submit-resume',
        element: (
          <LazyPage>
            <SubmitResumePage />
          </LazyPage>
        ),
      },
      {
        path: 'contact',
        element: (
          <LazyPage>
            <ContactPage />
          </LazyPage>
        ),
      },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
