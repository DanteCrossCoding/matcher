"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shuffleArray = exports.createRestaurantProfile = exports.getImageById = exports.getRestaurantIdsWithFilter = exports.getRestaurants = void 0;
const axios_1 = __importDefault(require("axios"));
require("dotenv").config();
const getRestaurants = (location) => {
    return axios_1.default
        .get(`https://api.yelp.com/v3/businesses/search?location=${location}&categories=restaurants`, {
        headers: { Authorization: `Bearer ${process.env.API_KEY_YELP}` },
    })
        .then((res) => {
        for (const item of res.data.businesses) {
            console.log(item.id);
        }
    })
        .catch((err) => {
        console.log(err);
    });
};
exports.getRestaurants = getRestaurants;
/**
 * Input:
 *  filter: string => Categories separated by comma(,) (ex: getRestaurantIdsWithFilter("sushi,japanese"))
 * Output:
 *  Returns an array containing 20 restaurant id's that match the passed in filter
 */
const getRestaurantIdsWithFilter = (filter) => {
    let businesses = [];
    const location = "vancouver, BC";
    return axios_1.default
        .get(`https://api.yelp.com/v3/businesses/search?location=${location}&categories=${filter}&limit=10`, {
        headers: { Authorization: `Bearer ${process.env.API_KEY_YELP}` },
    })
        .then((res) => {
        for (const item of res.data.businesses) {
            businesses.push(item.id);
        }
        return businesses;
    })
        .catch((err) => {
        console.log(err);
    });
};
exports.getRestaurantIdsWithFilter = getRestaurantIdsWithFilter;
const yelpApiConnection = (id) => {
    return axios_1.default.get(`https://api.yelp.com/v3/businesses/${id}`, {
        headers: { Authorization: `Bearer ${process.env.API_KEY_YELP}` },
    });
};
/**
 * Input:
 *  Yelp API business ID (string)
 * Output:
 *  Returns the Name of the Restaurant associated with ID
 */
const getNameById = (id) => {
    return yelpApiConnection(id)
        .then((res) => {
        return res.data.name;
    })
        .catch((err) => {
        console.log(err);
    });
};
/**
 * Input:
 *  Yelp API business ID (string)
 * Output:
 *  Returns the URL for the image associated with the ID
 */
const getImageById = (id) => {
    return yelpApiConnection(id)
        .then((res) => {
        return res.data.image_url;
    })
        .catch((err) => {
        console.log(err);
    });
};
exports.getImageById = getImageById;
/**
 * Input:
 *  Yelp API Business ID (string)
 * Output:
 *  Returns array containing street address and city
 */
const getAddressById = (id) => {
    let address = [];
    return yelpApiConnection(id).then((res) => {
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
const formatPhoneNumber = (num) => {
    return num.slice(2, 5) + "-" + num.slice(5, 8) + "-" + num.slice(8, 12);
};
/**
 * Input:
 *  Yelp API Business ID (string)
 * Output:
 *  Return a formatted string of the phone number associated with the business ID
 */
const getPhoneNumberById = (id) => {
    return yelpApiConnection(id).then((res) => {
        return formatPhoneNumber(res.data.phone);
    });
};
/**
 * Input:
 *  Yelp API Business ID (string)
 * Output:
 *  Returns the Rating associated with the Business ID
 */
const getRatingById = (id) => {
    return yelpApiConnection(id).then((res) => {
        return res.data.rating;
    });
};
/**
 * Input:
 *  Yelp API Business ID (string)
 * Output:
 *  Returns the Price Range of associated with the Business ID
 */
const getPriceById = (id) => {
    return yelpApiConnection(id).then((res) => {
        return res.data.price;
    });
};
/**
 * Input:
 *  Yelp API Business ID (string)
 * Output:
 *  Returns an object containing the name, image_url, phone number, address, city, rating and price
 */
const createRestaurantProfile = (id) => {
    const restaurant = {};
    return yelpApiConnection(id).then((res) => {
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
exports.createRestaurantProfile = createRestaurantProfile;
/**
 * Input:
 *  array
 * Output:
 *  shuffles the order of an array in place using Durstenfeld Shuffle algorithm
 */
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
};
exports.shuffleArray = shuffleArray;
let test = getRestaurantIdsWithFilter("chinese");
test.then((res) => shuffleArray(res));
test
    .then((res) => {
    return createRestaurantProfile(res[0]);
})
    .then((res) => console.log(res));
