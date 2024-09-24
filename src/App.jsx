import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Components/Header'
import Homepage from './pages/Homepage'
import Coinpage from './pages/Coinpage'

function App() {

  return (
    <BrowserRouter>
      <div style={{
        backgroundColor: '#14161a',
        color: 'white',
        minHeight: '100vh',
      }}>
        <Header />
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/coins/:id' element={<Coinpage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
