import { BrowserRouter, Route, Routes } from 'react-router'
import { Principal } from './pages/Principal'
import './style/App.css'
import { CategoryProvider } from './hooks/globalContext/CategoryProvider'
import { CategoryWrapper } from './pages/CategoryWrapper'

export default function App() {

  return (
    <CategoryProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Principal />} />
          <Route path="/category/:id" element={<CategoryWrapper />} />
        </Routes>
      </BrowserRouter>
    </CategoryProvider>
  )
}