import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Create from "./components/Create";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/create">
            <Create />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
