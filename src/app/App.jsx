import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './routes/AppRoutes'

import './styles/GlobalStyle.css'
import './styles/App.css'

export const App = () => {

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )

}
