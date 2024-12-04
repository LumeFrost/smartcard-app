// src/api/zarbyteApi.js

import axios from 'axios';

const ZARBYTE_API_URL = 'https://zdrc.developmentpreview.net/api/smartcard/';

const ZARBYTE_API_HEADER = {
    'x-zarbyte-smartcardapi': process.env.REACT_APP_ZARBYTE_API_HEADER,
};

/**
 * Fetches profile data from the Zarbyte API.
 *
 * @param {string} uuid - The UUID of the profile to fetch.
 * @returns {Promise<Object>} - The profile data.
 * @throws {Error} - Throws an error if the API call fails.
 */
export const fetchZarbyteProfileData = async (uuid) => {
    try {
        const response = await axios.get(`${ZARBYTE_API_URL}${uuid}`, {
            headers: ZARBYTE_API_HEADER,
        });

        return response.data;
    } catch (error) {
        // Optional: You can add custom error handling here if needed
        throw error;
    }
};