"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRestaurant = void 0;
const axios_1 = __importDefault(require("axios"));
require('dotenv').config();
const getRestaurant = (location) => {
    return axios_1.default.get(`https://api.yelp.com/v3/businesses/search?location=${location}&categories=restaurants&limit=10`, {
        headers: { 'Authorization': `Bearer ${process.env.API_KEY_YELP}` }
    })
        .then((res) => {
        console.log(res.data.businesses[0].name);
    })
        .catch((err) => {
        console.log(err);
    });
};
exports.getRestaurant = getRestaurant;
getRestaurant("Vancouver, BC");
