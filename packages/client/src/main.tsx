import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles/index.css'
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary'
import { Provider } from 'react-redux'
import { store } from '@/store/store'

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <Provider store={store}>
          <App />
        </Provider>
      </ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>
)

// TODO решить проблему сервисворкера - перехватывает запросы
// if ('serviceWorker' in navigator && import.meta.env.MODE === 'production') {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/serviceWorker.js', {
//       scope: '/',
//       type: 'module',
//     })
//   })
// }
