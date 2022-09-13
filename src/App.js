import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Analysis from "./routes/Analysis";
import Navs from "./component/Navs";
import Footer from "./component/Footer";

function App() {
  return (
    <Router>
      <Navs />
      <Routes>
        <Route path={`${process.env.PUBLIC_URL}/analysis`} element={ <Analysis /> } />
        <Route path={`${process.env.PUBLIC_URL}/`} element={<Home />} />
      </Routes>      
    </Router> 
  );
}

export default App;
