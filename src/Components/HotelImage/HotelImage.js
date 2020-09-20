import React from 'react';
import './HotelImage.css';

const HotelImage = (props) => {
    const {image, name } = props.hotel;
    return (
        <div>
            
            <div className="flex-photo">
                    <div >
                       <img className="image-width" src={image} alt=""/> 
                    </div>
                    
                    <div className="hotel-detail">
                       <h3 className="h3">{name}</h3>
                       <p>4 guests 2 bedrooms 2 beds 2 baths</p>
                       <p>Wif airconditioning kitchen</p>
                       <p>Cancellation flexibility available</p> 
                    </div>
                    
                </div>

               
        </div>
    );
};

export default HotelImage;