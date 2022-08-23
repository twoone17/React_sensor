import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Analysis from "./routes/Analysis";
import Navs from "./component/Navs";

function App() {
  //
  return (
    //
    <Router>
      <Navs />
      <Routes>
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
