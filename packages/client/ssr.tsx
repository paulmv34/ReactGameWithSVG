import App from './src/App'
import { ErrorBoundary } from './src/components/ErrorBoundary/ErrorBoundary'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { store } from './src/store/store'
import { Provider } from 'react-redux'
import React from 'react'
import { matchPath } from 'react-router'

export function render(uri) {
  const [pathname] = uri.split('?')
  //const currentRoute = routes.find(route => matchPath(pathname, route))

  return renderToString(
    <React.StrictMode>
      <StaticRouter location={uri}>
        <ErrorBoundary>
          <Provider store={store}>
            <App />
          </Provider>
        </ErrorBoundary>
      </StaticRouter>
    </React.StrictMode>
  )
}
