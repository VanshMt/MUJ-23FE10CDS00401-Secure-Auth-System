// const axios = require("axios");

// const cache = new Map();

// const getLocationFromIP = async (ip) => {
//   try {
//     // 🔥 Check cache
//     if (cache.has(ip)) {
//       return cache.get(ip);
//     }

//     const response = await axios.get(
//       `https://api.ipinfo.io/lite/${ip}?token=${process.env.IPINFO_TOKEN}`
//     );

//     const data = {
//       ip,
//       country: response.data.country,
//       region: response.data.region,
//     };

//     cache.set(ip, data);

//     return data;
//   } catch (error) {
//     console.error("GeoService Error:", error.message);
//     return null;
//   }
// };

// module.exports = { getLocationFromIP };
const axios = require("axios");

const cache = new Map();

const getLocationFromIP = async (ip) => {
  try {
    if (cache.has(ip)) {
      return cache.get(ip);
    }

    const response = await axios.get(
      `https://api.ipinfo.io/lite/${ip}?token=${process.env.IPINFO_TOKEN}`
    );

    const location = {
      ip,
      country: response.data.country || "Unknown",
      region: response.data.region || "Unknown",
    };

    cache.set(ip, location);

    return location;
  } catch (error) {
    console.log("Geo error:", error.message);
    // Return fallback location instead of null
    return {
      ip,
      country: "Unknown",
      region: "Unknown"
    };
  }
};

module.exports = { getLocationFromIP };