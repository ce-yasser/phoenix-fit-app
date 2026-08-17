import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import './scss/style.scss'
import App from './App.tsx'
import { store } from './store/store.ts'

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <App />
    </Provider>,
)
