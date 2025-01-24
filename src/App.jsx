
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { HomePage } from './pages/HomePage'
import { ControllersPage } from './pages/ControllersPage'

function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/controller' element={<ControllersPage />} />
      </Routes>
    </>
  )
}

export default App
