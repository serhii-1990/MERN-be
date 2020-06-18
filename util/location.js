const axios = require("axios");

const HttpError = require("../models/http-error");
const API = "AIzaSyA1-XMtJivnfNK7epig031Fbojf071wBfg";

const getCoordsForAddress = (address) => {
  switch (address) {
    case "Johnston":
      return {
        lat: 16.7291,
        lng: -169.5332,
      };
    case "Verizon":
      return {
        lat: 40.756,
        lng: -96.9062,
      };
    default:
      return {
        lat: 40.7484405,
        lng: -73.9878584,
      };
  }
};

// const getCoordsForAddress = async (address) => {
//   const response = await axios.get(
//     `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
//       address
//     )}&key=${API}`
//   );

//   const data = response.data;

//   if (!data || data.status === "ZERO_RESULTS") {
//     const error = new HttpError(
//       "Could not find location for the specified address.",
//       422
//     );
//     throw error;
//   }

//   console.log(data);
//   return data.results[0].geometry.location;
// };

module.exports = getCoordsForAddress;
