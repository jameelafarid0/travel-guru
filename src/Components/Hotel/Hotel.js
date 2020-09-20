import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import photoInfo from '../fakeData/photo';

import HotelImage from '../HotelImage/HotelImage';
import './Hotel.css';


const Hotel = () => {
    const {hotelKey} = useParams();

    const [hotel, setHotel] = useState(photoInfo);
    const [hotelBook, setHotelBook] = useState([]);

    useEffect(() => {
        const BookedPlace = hotel.filter((hotel => hotel.photoId.toString() === hotelKey));
        setHotelBook(BookedPlace);
    }, [hotel, hotelKey])

    return (
        <div>
            <h1 >Stay In Our Hotels</h1>
            <div className="flex-maps">
                <div>
                    {
                        hotelBook.map(hotel => <HotelImage hotel={hotel}></HotelImage>  )
                    }
                    
                </div>
                <div className="google-div">
                    <img className="rounded-corners" width="420px" height="630px" src="https://i.imgur.com/7WTuYlQ.png" alt=""/>
                </div>
            </div>
            

            
            
        </div>
    );
};
export default Hotel;


