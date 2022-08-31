
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"
import Home from "./routes/Home"
import Analysis from "./routes/Analysis"
import Navs from "./component/Navs"
import Footer from "./component/Footer"


function App() {
  let data = [
    {
      id: "2208231600",
      data: [
        {
          x: 1,
          y: 2,
        },
      ],
    },
    {
      id: "2208231700",
      data: [
        {
          x: 3,
          y: 4,
        },
      ],
    },
  ];


  return <Router>
    <Navs />
    <Routes>
      {/* <Route path="/analysis" element={ <Analysis /> } /> */}
      <Route path="/" element={ <Home /> } />
    </Routes>
    <Footer />
  </Router>

}

export default App;
