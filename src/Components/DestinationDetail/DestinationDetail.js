import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { TravelContext } from '../../App';
import './DestinationDetail.css';



const DestinationDetial = () => {
    const {destinationKey} = useParams();
    const {state1}= useContext(TravelContext);
    const [destination, setDestination] = state1;
    const places = destination.find(place => place.key.toString() === destinationKey);
    

    return (
        <div className="flex-detail">

            <div className="description">
                <h1 className="h1">{places.name}</h1>
                <p className="p">{places.description}</p>
            </div>
            

            <div className="form">
                <form action="">
                    <div className="origin">
                        <label className="label">Origin</label>
                         <div className="input"><h3>{places.origin}</h3></div>
                    </div>
                    <br/>
                    <div className="destination">
                        <label className="label">Destination</label>
                        <div className="input"><h3>{places.name}</h3></div> 
                    </div>

                    <div className="flex-date">
                        <input className="date" type="date"/>
                        <input className="date" type="date"/>
                    </div>
                    <Link to={`/hotel/${places.key}`} >
                      <button className="button">Start booking</button>
                    </Link>
                    

                </form>
            </div>
            

        </div>
    );
};

export default DestinationDetial;




