import axios from "axios";

const consumerKey = process.env.PESAPAL_CONSUMER_KEY;
const consumerSecret = process.env.PESAPAL_CONSUMER_SECRET;
const pesapalBaseUrl = "https://pay.pesapal.com/v3/api";

// Get OAuth Token
export const getToken = async () => {
  try {
    const url = `${pesapalBaseUrl}/Auth/RequestToken`;
    const res = await axios.post(url, {
      consumer_key: consumerKey,
      consumer_secret: consumerSecret,
    });
    
    if (res.data && res.data.token) {
      return res.data.token;
    } else {
      throw new Error("No token returned from Pesapal");
    }
  } catch (err) {
    console.error("Failed to fetch Pesapal token:", err.response?.data || err.message);
    throw err;
  }
};
