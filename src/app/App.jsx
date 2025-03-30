import { BrowserRouter } from 'react-router-dom'
import { StateProvider } from './state/StateProvider'
import { AppRoutes } from './routes/AppRoutes'

import './styles/GlobalStyle.css'
import './styles/App.css'

export const App = () => {

  return (
    <StateProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </StateProvider>
    )

}
