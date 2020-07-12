import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Mgal from "./components/MGal";
import "./App.css";
import ArtistList from "./components/ArtistList";
import { Switch, Route } from "react-router-dom";

import Homepage from "./components/Homepage";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Homepage} />

        <Route path="/gallery" component={Mgal} />

        <Route path="/artists" component={ArtistList} />
      </Switch>
    </div>
  );
}
export default App;
