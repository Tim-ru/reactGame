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
import StartPage from './pages/StartPage'
import ResultPage from './pages/ResultPage'


class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/auth" exact>
            <AuthPage />
          </Route>
          <Route path="/start">
            <StartPage />
          </Route>
          <Route path="/game">
            <GamePage />
          </Route>
          <Route path="/result">
            <ResultPage />
          </Route>
          <Redirect to='/auth'/>
        </Switch>
      </Router>
    )
  }
}

export default App