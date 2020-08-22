import React from 'react';
import NavBar from './Pages/NavBar'
import Gallery from './Pages/Gallery'
import Upload from './Pages/Upload'
import Home from './Pages/Home'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { ToastProvider } from 'react-toast-notifications'

function App() {
    return (
      <ToastProvider placement={'bottom-right'} >
        <Router>
          <NavBar />
          <Switch>
            <Route path="/upload">
              <Upload />
            </Route>
            <Route path="/gallery">
              <Gallery />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </ToastProvider>
    )
}

export default App;
