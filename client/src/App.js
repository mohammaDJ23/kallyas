import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import IsLoading from "./shared/ui/IsLoading/IsLoading";

import "./App.css";

const Home = lazy(() => import("./pages/Home/Home"));
const Movies = lazy(() => import("./pages/Movies/Movies"));
const SingleMovie = lazy(() => import("./pages/Movie/Movie"));

function App() {
  return (
    <main className="w-100 h-100 position-relative">
      <Suspense fallback={<IsLoading />}>
        <Router>
          <Switch>
            <Route exact path="/home" component={Home} />

            <Route
              exact
              path={["/movies", "/serials", "/movies-and-serials"]}
              component={Movies}
            />

            <Route exact path="/movie/:id" component={SingleMovie} />
            <Redirect to="/home" />
          </Switch>
        </Router>
      </Suspense>
    </main>
  );
}

export default App;
