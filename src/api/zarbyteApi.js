// src/api/zarbyteApi.js

import axios from 'axios';

const ZARBYTE_API_URL = 'https://zdrc.developmentpreview.net/api/smartcard/';

const ZARBYTE_API_HEADER = {
    'x-zarbyte-smartcardapi': process.env.REACT_APP_ZARBYTE_API_HEADER,
};

export const fetchZarbyteProfileData = async (uuid, simulateError = false) => {
    try {
        // Simulate network delay (2 seconds)
        await new Promise((resolve) => setTimeout(resolve, 2000));

        if (simulateError) {
            // Simulate an error
            throw new Error('Simulated API error');
        }

        const response = await axios.get(`${ZARBYTE_API_URL}${uuid}`, {
            headers: ZARBYTE_API_HEADER,
        });

        return response.data;
    } catch (error) {
        throw error;
    }
};