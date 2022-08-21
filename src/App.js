import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"
import Home from "./routes/Home"
import Analysis from "./routes/Analysis"
import Nav from "./component/Nav"


function App() {
  return <Router>
    <Nav />
    <Routes>
      <Route path="/analysis" element={ <Analysis /> } />
      <Route path="/" element={ <Home /> } />
    </Routes>
  </Router>
}

export default App;
