import axios from "axios";
require('dotenv').config();

const getRestaurant = (location: string) => {
  return axios.get(`https://api.yelp.com/v3/businesses/search?location=${location}&categories=restaurants&limit=10`, {
    headers: { 'Authorization': `Bearer ${process.env.API_KEY_YELP}`}
  })
  .then((res: any) => {
    console.log(res.data.businesses[0].name);
  })
  .catch((err: any) => {
    console.log(err);
  })
}

getRestaurant("Vancouver, BC");

export {
  getRestaurant
}