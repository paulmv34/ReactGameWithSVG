import App from './src/App'
import { ErrorBoundary } from './src/components/ErrorBoundary/ErrorBoundary'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { store } from './src/store/store'
import { Provider } from 'react-redux'
import React from 'react'

export function render(url) {
  renderToString(
    <React.StrictMode>
      <StaticRouter location={url}>
        <ErrorBoundary>
          <Provider store={store}>
            <App />
          </Provider>
        </ErrorBoundary>
      </StaticRouter>
    </React.StrictMode>
  )
}
