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
        console.log(item.id);
      }
    })
    .catch((err: any) => {
      console.log(err);
    });
};

/**
 * Input:
 *  filter: string => Categories separated by comma(,) (ex: getRestaurantIdsWithFilter("sushi,japanese"))
 * Output:
 *  Returns an array containing 20 restaurant id's that match the passed in filter
 */
const getRestaurantIdsWithFilter = (filter: string) => {
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
        businesses.push(item.id);
      }
      return businesses;
    })
    .catch((err: any) => {
      console.log(err);
    });
};

/**
 * Input:
 *  Yelp API bussiness ID (string)
 * Output:
 *  Returns the URL for the image associated with the idea
 */
const getImageById = (id: string) => {
  return axios
    .get(`https://api.yelp.com/v3/businesses/${id}`, {
      headers: { Authorization: `Bearer ${process.env.API_KEY_YELP}` },
    })
    .then((res: any) => {
      console.log(res.data.image_url);
    })
    .catch((err: any) => {
      console.log(err);
    });
};

getImageById("XFVGGq47_5mUM9QQsRO8nA");

/**
 * Input:
 *  array
 * Output:
 *  shuffles the order of an array in place using Durstenfeld Shuffle algorithm
 */

const shuffleArray = (array: any) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

export { getRestaurants, getRestaurantIdsWithFilter, getImageById };
