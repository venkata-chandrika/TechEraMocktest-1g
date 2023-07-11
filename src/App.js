import {Switch, Route} from 'react-router-dom'
import TechEra from './component/TechEra'
import EachItemDetails from './component/EachItemDetails'

import './App.css'
import NotFound from './component/NotFound'

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/" component={TechEra} />
    <Route exact path="/courses/:id" component={EachItemDetails} />
    <Route component={NotFound} />
  </Switch>
)

export default App
