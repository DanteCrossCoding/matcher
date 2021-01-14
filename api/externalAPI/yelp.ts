import axios from "axios";
require("dotenv").config();

const getRestaurants = (location: string) => {
  return axios
    .get(
      `https://api.yelp.com/v3/businesses/search?location=${location}&categories=restaurants`,
      {
        headers: { Authorization: `Bearer ${process.env.API_KEY_YELP}` },
      }
    )
    .then((res: any) => {
      for (const item of res.data.businesses) {
        console.log(item.name);
      }
    })
    .catch((err: any) => {
      console.log(err);
    });
};

/**
 * Input:
 *  filter: string => Categories separated by ,
 * Output:
 *  Returns an object containing restaurants from the location specified matching categories from the filter string
 */
const getRestaurantsWithFilter = (filter: string) => {
  let businesses: string[] = [];
  const location: string = "Vancouver, BC";
  return axios
    .get(
      `https://api.yelp.com/v3/businesses/search?location=${location}&categories=restaurants,${filter}`,
      {
        headers: { Authorization: `Bearer ${process.env.API_KEY_YELP}` },
      }
    )
    .then((res: any) => {
      for (const item of res.data.businesses) {
        businesses.push(item.name);
      }
      return businesses;
    })
    .catch((err: any) => {
      console.log(err);
    });
};

// Randomize array in place using Durstenfeld Shuffle algorithm
const shuffleArray = (array: any) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

export { getRestaurants, getRestaurantsWithFilter };
