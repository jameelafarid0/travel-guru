import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Destination.css';
  
const Destination = (props) => {
    
    const {image, key} = props.place;
    return (
        <div >
            
            <Link to={`/destination/${key}`} >
            <div className="box">
                <img className="img" width="300px" src={image} alt=""/>
            </div>  
            </Link>
        </div>
  
    );
};

export default Destination;