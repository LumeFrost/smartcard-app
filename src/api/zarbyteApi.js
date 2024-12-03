// src/api/zarbyteApi.js

// Import the axios library to make HTTP requests.
// Axios is a promise-based HTTP client for the browser and Node.js.
import axios from 'axios';

// Define the base URL for the ZarbyteSmartCard API.
// All API requests will be appended to this base URL.
const ZARBYTE_API_URL = 'https://zdrc.developmentpreview.net/api/smartcard/';

// Define the custom header required by the Zarbyte API.
// This header may be used for authentication or to identify the client application.
const ZARBYTE_API_HEADER = {
  'x-zarbyte-smartcardapi': process.env.REACT_APP_ZARBYTE_API_HEADER,
};

// Export an asynchronous function to fetch profile data from the Zarbyte API.
// The function takes a UUID as a parameter, which identifies the specific profile to retrieve.
export const fetchZarbyteProfileData = async (uuid) => {
  try {
    // Make a GET request to the Zarbyte API.
    // The URL is constructed by appending the UUID to the base API URL.
    // The custom header is included in the request for authentication or identification purposes.
    const response = await axios.get(`${ZARBYTE_API_URL}${uuid}`, {
      headers: ZARBYTE_API_HEADER,
    });

    // If the request is successful, return the data from the response.
    // The data contains the profile information for the specified UUID.
    return response.data;
  } catch (error) {
    // If an error occurs during the request, throw the error.
    // This allows the calling function to handle the error appropriately.
    throw error;
  }
};