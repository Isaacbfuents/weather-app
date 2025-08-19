
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Landing from './pages/Landing'; // por ejemplo
import ProfileBtn from '../src/components/ProfileBtn'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<ProfileBtn />} />
      </Routes>
    </Router>
  )
}

export default App
