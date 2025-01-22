import { AppRouter } from '@app/routers'
import '@app/assets/styles/css/index.css'
import { QueryProvider } from './providers'

const App = () => {
  return (
    <QueryProvider>
      <AppRouter />
    </QueryProvider>
  )
}

export default App
