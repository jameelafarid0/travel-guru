import React, { createContext, useState } from 'react';
import './App.css';
import Header from './Components/Header/Header';
import Destination from './Components/Destination/Destination';
import info from './Components/fakeData/info'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './Components/Home/Home';
import DestinationDetail from './Components/DestinationDetail/DestinationDetail';
import Hotel from './Components/Hotel/Hotel';
import Login from './Components/Login/Login';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import NoMatch from './Components/NoMatch/NoMatch';

export const TravelContext = createContext();

function App() {
  const [destination, setDestination] = useState(info);
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <TravelContext.Provider className="background " value={{destineState:[destination, setDestination], loggedUserState:[loggedInUser,setLoggedInUser]}}>
    <Router>
      
     <Header/>
     <Switch>
       <Route path="/home">
         <Home/>
       </Route>
       <Route path="/destination/:destinationKey">
         <DestinationDetail></DestinationDetail>
       </Route>
       <PrivateRoute path="/hotel/:hotelKey">
         <Hotel></Hotel>
       </PrivateRoute>
       <Route path ="/login">
         <Login></Login>
       </Route>
       <Route exact path="/">
         <Home/>
       </Route>
       <Route path="*">
         <NoMatch></NoMatch>
       </Route>
     </Switch>
   </Router>
   </TravelContext.Provider>
  );
}

export default App;
