import React, { useState, useEffect } from "react";
import './App.scss';
import './bootstrap/vendor/bootstrap/css/bootstrap.css'
import CarouselContainer from "./components/CarouselContainer"
import io from 'socket.io-client';

const ENDPOINT = "http://localhost:9000";

const socket = io(ENDPOINT)

function App() {

  const [user, setUser] = useState("");
  const [restaurants, setRestaurant] = useState([]);


  useEffect(() => {
    document.title = "Matcher"
    setUser(Math.floor(Math.random() * 10).toString());
  }, [])

  const startMatch = function() {
    socket.emit('new match session', user)
  } 

  socket.on('response', (response) => {
    setRestaurant(prev => [...prev, response.restaurants])
  })

  const testoraunts =  
  [ { name: 'Dinesty Dumpling House',
    image_url:
     'https://s3-media3.fl.yelpcdn.com/bphoto/BhSkksnrQr2XEriwIIsacQ/o.jpg',
    phone: '604-669-7769',
    address: '1719 Robson Street',
    city: 'Vancouver',
    rating: 4,
    price: '$$' },
  { name: 'Peaceful Restaurant',
    image_url:
     'https://s3-media2.fl.yelpcdn.com/bphoto/CEdKVbgadZV2Dyw71XGjAg/o.jpg',
    phone: '604-879-9878',
    address: '110-532 W Broadway',
    city: 'Vancouver',
    rating: 3.5,
    price: '$$' },
  { name: 'Bao Bei Chinese Brasserie',
    image_url:
     'https://s3-media3.fl.yelpcdn.com/bphoto/QmAy8YcOum-tJGTV6a_JKA/o.jpg',
    phone: '604-688-0876',
    address: '163 Keefer Street',
    city: 'Vancouver',
    rating: 4,
    price: '$$$' },
  { name: 'Chinatown BBQ',
    image_url:
     'https://s3-media1.fl.yelpcdn.com/bphoto/03HPbUeYbGtmxVUKdBEFjw/o.jpg',
    phone: '604-428-2626',
    address: '130 E Pender Street',
    city: 'Vancouver',
    rating: 4.5,
    price: '$$' },
  { name: 'Western Lake Chinese Seafood Restaurant',
    image_url:
     'https://s3-media1.fl.yelpcdn.com/bphoto/ICCU429pf1TanAnOlGGt2Q/o.jpg',
    phone: '604-321-6862',
    address: '4989 Victoria Drive',
    city: 'Vancouver',
    rating: 4,
    price: '$$' },
  { name: 'Sun Sui Wah Seafood Restaurant',
    image_url:
     'https://s3-media1.fl.yelpcdn.com/bphoto/SlhVR-v2ygyA913tZofcdw/o.jpg',
    phone: '604-872-8822',
    address: '3888 Main Street',
    city: 'Vancouver',
    rating: 3.5,
    price: '$$' },
  { name: 'ChongQing',
    image_url:
     'https://s3-media1.fl.yelpcdn.com/bphoto/jn99Vkgi4Gj3gxQAdWs29A/o.jpg',
    phone: '604-568-0303',
    address: '1260 Robson Street',
    city: 'Vancouver',
    rating: 4,
    price: '$$' },
  { name: 'New Town Bakery & Restaurant',
    image_url:
     'https://s3-media2.fl.yelpcdn.com/bphoto/mGYzDTGMquE3YxKBVSvJ2Q/o.jpg',
    phone: '604-681-1828',
    address: '148 Pender Street E',
    city: 'Vancouver',
    rating: 3.5,
    price: '$' },
  { name: 'Long\'s Noodle House',
    image_url:
     'https://s3-media2.fl.yelpcdn.com/bphoto/Dix7PSSxm_n3NmBpVz6gMA/o.jpg',
    phone: '604-879-7879',
    address: '4853 Main Street',
    city: 'Vancouver',
    rating: 3.5,
    price: '$$' },
  { name: 'Joojak Restaurant',
    image_url:
     'https://s3-media2.fl.yelpcdn.com/bphoto/tfHtHBhE865WwNabHAxVYw/o.jpg',
    phone: '604-563-8816',
    address: '3337 Kingsway',
    city: 'Vancouver',
    rating: 4.5,
    price: '$$' } ]

  return (
      <div>
        <header className="App-header">
          <h1>
          User {user}
          </h1>
            <CarouselContainer
              start={startMatch}
              restaurants={testoraunts}
              user={user}
            />
        </header>
      </div>
  );
}

export default App;
