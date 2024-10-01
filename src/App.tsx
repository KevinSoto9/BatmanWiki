import './App.css'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Comics from './pages/Comics'
import ComicDetails from './pages/IndividualPages/IndividualComic'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Comics" element={<Comics />} />
          <Route path="/Comic/:number" element={<ComicDetails/>} />
          <Route path="*" element={<NotFound />} /> 
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
