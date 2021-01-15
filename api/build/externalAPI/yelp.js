"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImageById = exports.getRestaurantIdsWithFilter = exports.getRestaurants = void 0;
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
    const location = "Vancouver, BC";
    return axios_1.default
        .get(`https://api.yelp.com/v3/businesses/search?location=${location}&categories=restaurants,${filter}`, {
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
 *  Yelp API bussiness ID (string)
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
 *  Yelp API bussiness ID (string)
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
let test = getNameById("XFVGGq47_5mUM9QQsRO8nA");
test.then(res => console.log(res));
test = getImageById("XFVGGq47_5mUM9QQsRO8nA");
test.then(res => console.log(res));
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
