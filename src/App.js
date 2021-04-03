import React from 'react'
import { Route, Switch } from 'react-router-dom'
import HomeScreen from './pages/HomeScreen'
import GamePlay from './pages/GamePlay'
function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={HomeScreen} />
        <Route path="/play" exact component={GamePlay} />
      </Switch>
    </div>
  )
}

export default App
