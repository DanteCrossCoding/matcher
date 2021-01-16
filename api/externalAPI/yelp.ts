import axios from "axios";
import { response } from "express";
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
  const location: string = "vancouver, BC";
  return axios
    .get(
      `https://api.yelp.com/v3/businesses/search?location=${location}&categories=${filter}&limit=10`,
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

const yelpApiConnection = (id: string) => {
  return axios.get(`https://api.yelp.com/v3/businesses/${id}`, {
    headers: { Authorization: `Bearer ${process.env.API_KEY_YELP}` },
  });
};

/**
 * Input:
 *  Yelp API business ID (string)
 * Output:
 *  Returns the Name of the Restaurant associated with ID
 */

const getNameById = (id: string) => {
  return yelpApiConnection(id)
    .then((res: any) => {
      return res.data.name;
    })
    .catch((err: any) => {
      console.log(err);
    });
};

/**
 * Input:
 *  Yelp API business ID (string)
 * Output:
 *  Returns the URL for the image associated with the ID
 */
const getImageById = (id: string) => {
  return yelpApiConnection(id)
    .then((res: any) => {
      return res.data.image_url;
    })
    .catch((err: any) => {
      console.log(err);
    });
};

/**
 * Input:
 *  Yelp API Business ID (string)
 * Output:
 *  Returns array containing street address and city
 */

const getAddressById = (id: string) => {
  let address: string[] = [];
  return yelpApiConnection(id).then((res: any) => {
    address.push(res.data.location.address1);
    address.push(res.data.location.city);
    return address;
  });
};

/**
 * Input:
 *  String of 13 (eek) numbers
 * Output:
 *  Returns a string that is formatted like a phone number
 */
const formatPhoneNumber = (num: string) => {
  return num.slice(2, 5) + "-" + num.slice(5, 8) + "-" + num.slice(8, 12);
};

/**
 * Input:
 *  Yelp API Business ID (string)
 * Output:
 *  Return a formatted string of the phone number associated with the business ID
 */

const getPhoneNumberById = (id: string) => {
  return yelpApiConnection(id).then((res: any) => {
    return formatPhoneNumber(res.data.phone);
  });
};

/**
 * Input:
 *  Yelp API Business ID (string)
 * Output:
 *  Returns the Rating associated with the Business ID
 */

const getRatingById = (id: string) => {
  return yelpApiConnection(id).then((res: any) => {
    return res.data.rating;
  });
};

/**
 * Input:
 *  Yelp API Business ID (string)
 * Output:
 *  Returns the Price Range of associated with the Business ID
 */

const getPriceById = (id: string) => {
  return yelpApiConnection(id).then((res: any) => {
    return res.data.price;
  });
};

type Restaurant = {
  name: string;
  image_url: string;
  phone: string;
  address: string;
  city: string;
  rating: string;
  price: string;
};

/**
 * Input:
 *  Yelp API Business ID (string)
 * Output:
 *  Returns an object containing the name, image_url, phone number, address, city, rating and price
 */
const createRestaurantProfile = (id: string) => {
  const restaurant: Restaurant = {} as Restaurant;
  return yelpApiConnection(id).then((res: any) => {
    restaurant.name = res.data.name;
    restaurant.image_url = res.data.image_url;
    restaurant.phone = formatPhoneNumber(res.data.phone);
    restaurant.address = res.data.location.address1;
    restaurant.city = res.data.location.city;
    restaurant.rating = res.data.rating;
    restaurant.price = res.data.price;
    return restaurant;
  });
};

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

  let test = getRestaurantIdsWithFilter("chinese");
  test.then((res: any) => shuffleArray(res));
  test
    .then((res: any) => {
      return createRestaurantProfile(res[0]);
    })
    .then((res) => console.log(res));

export {
  getRestaurants,
  getRestaurantIdsWithFilter,
  getImageById,
  createRestaurantProfile,
  shuffleArray
};
