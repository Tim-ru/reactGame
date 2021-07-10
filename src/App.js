import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import './styles/App.css'
import AuthPage from './pages/AuthPage'
import GamePage from './pages/GamePage'


class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/auth" exact>
            <AuthPage />
          </Route>
          <Route path="/game">
            <GamePage />
          </Route>
          <Redirect to='/auth'/>
        </Switch>
      </Router>
    )
  }
}

export default App