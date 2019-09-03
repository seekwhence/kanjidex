import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Kanjidex from "./components/Kanjidex";
import Popup from "./components/Popup";
import Vocabulary from "./components/Vocabulary";
import Help from "./components/Help";
import About from "./components/About";
import Navbar from "./components/layout/Navbar";

// styles
import "../node_modules/bulma/css/bulma.min.css";
import "./App.css";

// env variables
require("dotenv").config();

const App = () => {
  return (
    <Router>
      <div className="App">
        <div className="container">
          <Switch>
            <Route
              path="/kanjidex"
              render={({ match: { url } }) => (
                <>
                  <Navbar />
                  <Route path={`${url}/vocabulary`} component={Vocabulary} />
                  <Route path={`${url}/help`} component={Help} />
                  <Route path={`${url}/about`} component={About} />
                  <Route exact path={`${url}/kanjidex`} component={Kanjidex} />
                </>
              )}
            />
            <Route exact path="/" component={Popup} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
