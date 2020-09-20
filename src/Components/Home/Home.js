import React, {  useContext } from 'react';
import Destination from '../Destination/Destination';
import { TravelContext } from '../../App';
import './Home.css'


const Home = () => { 
    const {destineState}= useContext(TravelContext);
    const [destination, setDestination] = destineState;
    return (
        <div>
        
            <h2 className="title">Choose your destination</h2> 
            <div className="flex">
            {
               destination.map(place => <Destination 
                place={place}
                ></Destination>)   
            }
            </div>
            
           
        </div>
    );
};

export default Home;