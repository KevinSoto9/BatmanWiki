import './App.css'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Comics from './pages/Comics'
import ComicDetails from './pages/IndividualPages/IndividualComic'
import Characters from './pages/Characters'
import CharacterDetails from './pages/IndividualPages/IndividualCharacter'
import Locations from './pages/Locations'
import LocationDetails from './pages/IndividualPages/IndividualLocation'
import Concepts from './pages/Concepts'
import ConceptDetails from './pages/IndividualPages/IndividualConcept'
import Movies from './pages/Movies'
import MovieDetails from './pages/IndividualPages/IndivudualMovie'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Comics" element={<Comics />} />
          <Route path="/Comic/:number" element={<ComicDetails/>} />
          <Route path="/Characters" element={<Characters/>} />
          <Route path="/Character/:number" element={<CharacterDetails/>} />
          <Route path="/Locations" element={<Locations />} />
          <Route path='/Location/:number' element={<LocationDetails />} />
          <Route path="/Concepts" element={<Concepts />} />
          <Route path="/Concept/:number" element={<ConceptDetails />} />
          <Route path="/Movies" element={<Movies />} />
          <Route path="/Movie/:id" element={<MovieDetails />} />
          <Route path="*" element={<NotFound />} /> 
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
