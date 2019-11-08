import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Details from "./pages/Details";
import Cards from "./pages/Cards";

function App() {
  return (
        <Router>    
        <div>
          <Route exact path="/" component={Details} />
          <Route exact path="/cards" component={Cards} />
        </div>
      </Router>
  )
}

export default App;
