import React from 'react'
import ReactDOM from 'react-dom/client'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles/index.css'
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary'
import { Provider } from 'react-redux'
import { store } from '@/store/store'

// const root = document.getElementById('root')
// if (root && root.innerHTML !== '') {
//   ReactDOM.hydrateRoot(
//     document.getElementById('root') as HTMLElement,
//     <React.StrictMode>
//       <BrowserRouter>
//         <ErrorBoundary>
//           <Provider store={store}>
//             <App />
//           </Provider>
//         </ErrorBoundary>
//       </BrowserRouter>
//     </React.StrictMode>
//   )
// } else {
// render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <ErrorBoundary>
//         <Provider store={store}>
//           <App />
//         </Provider>
//       </ErrorBoundary>
//     </BrowserRouter>
//   </React.StrictMode>,
//   document.getElementById('root')
// )
// }
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
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

// ReactDOM.hydrateRoot(
//   document.getElementById('root') as HTMLElement,
//   <React.StrictMode>
//     <BrowserRouter>
//       <ErrorBoundary>
//         <Provider store={store}>
//           <App />
//         </Provider>
//       </ErrorBoundary>
//     </BrowserRouter>
//   </React.StrictMode>
// )

if ('serviceWorker' in navigator && import.meta.env.MODE === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('serviceWorker.js', {
      scope: '/',
      type: 'module',
    })
  })
}
