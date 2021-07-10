import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

class App extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/about" exact>
                        <About />
                    </Route>
                    <Route path="/users">
                        <Users />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </Router>
        )
    }
}

export default App