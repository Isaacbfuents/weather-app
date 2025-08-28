
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Landing from './pages/Landing'; 
import Place from './pages/Place';
import ProfileBtn from '../src/components/ProfileBtn'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={< Landing />} />
        <Route path="/home" element={< Home />} />
        <Route path="/profile" element={< ProfileBtn />} />
        <Route path='/home/:name/:id' element={< Place />} />
      </Routes>
    </Router>
  )
}

export default App
