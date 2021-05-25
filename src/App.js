import React,{Component} from 'react'
import './App.css';
import Layout from './hoc/Layout/Layout';
import {Route,Switch} from 'react-router-dom'
import HomeBuilder from './container/HomeContainer/HomeBuilder'
import PlanBuilder from './container/PlanContainer/PlanBuilder'
import CovidBedsContainer from './container/CovidBedsContainer/CovidBedsContainer'
import OxygenContainer from './container/OxygenContainer/OxygenContainer'
import * as linkLabel from './utils/Constants/routeLinks'
import Volunteer from './container/VoluteerContainer/volunteerBuilder'
import FoodContainer from './container/FoodContainer/foodContainer'
import MainContainer from './container/mainContainer/mainContainer'
class App extends Component {
  render(){
    let routes = (
      <Switch>
        
        <Route path={linkLabel.FEEDBACK} component={PlanBuilder}/>
        <Route path={linkLabel.VOLUNTEER} exact component={Volunteer}/>
        <Route path={linkLabel.COVIDBEDS} exact component={CovidBedsContainer}/>
        <Route path={linkLabel.FOODSSOURCE} exact component={FoodContainer}/>
        <Route path={linkLabel.HOME_LINK} exact component={HomeBuilder}/>
        <Route path={linkLabel.OXYGEN} exact component={OxygenContainer}/>
        <Route path={linkLabel.MAIN_PAGE} exact component={MainContainer}/>
      </Switch>
    )
    return (
      <div >
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
  
}

export default App;
