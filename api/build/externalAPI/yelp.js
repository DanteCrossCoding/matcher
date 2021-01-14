"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRestaurantsWithFilter = exports.getRestaurants = void 0;
const axios_1 = __importDefault(require("axios"));
require("dotenv").config();
const getRestaurants = (location) => {
    return axios_1.default
        .get(`https://api.yelp.com/v3/businesses/search?location=${location}&categories=restaurants`, {
        headers: { Authorization: `Bearer ${process.env.API_KEY_YELP}` },
    })
        .then((res) => {
        for (const item of res.data.businesses) {
            console.log(item.name);
        }
    })
        .catch((err) => {
        console.log(err);
    });
};
exports.getRestaurants = getRestaurants;
/**
 * Input:
 *  filter: string => Categories separated by ,
 * Output:
 *  Returns an object containing restaurants from the location specified matching categories from the filter string
 */
const getRestaurantsWithFilter = (filter) => {
    let businesses = [];
    const location = "Vancouver, BC";
    return axios_1.default
        .get(`https://api.yelp.com/v3/businesses/search?location=${location}&categories=restaurants,${filter}`, {
        headers: { Authorization: `Bearer ${process.env.API_KEY_YELP}` },
    })
        .then((res) => {
        for (const item of res.data.businesses) {
            businesses.push(item.name);
        }
        return businesses;
    })
        .catch((err) => {
        console.log(err);
    });
};
exports.getRestaurantsWithFilter = getRestaurantsWithFilter;
// Randomize array in place using Durstenfeld Shuffle algorithm
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
};
