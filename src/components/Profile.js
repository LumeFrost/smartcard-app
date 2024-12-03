// src/components/Profile.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchZarbyteProfileData } from '../api/zarbyteApi';
import Loading from './Loading';
import Error from './Error';

const Profile = () => {
    const { uuid } = useParams();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getProfile = async () => {
            try {
                const data = await fetchZarbyteProfileData(uuid, false); // Set to true to simulate error
                setProfile(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        getProfile();
    }, [uuid]);

    if (loading) return <Loading />;
    if (error) {
        let errorMessage = 'An unexpected error occurred.';
        if (error.response) {
            if (error.response.status === 404) {
                errorMessage = 'Profile not found.';
            } else {
                errorMessage = `Error ${error.response.status}: ${error.response.statusText}`;
            }
        } else if (error.request) {
            errorMessage = 'Network error. Please check your internet connection.';
        } else {
            errorMessage = error.message;
        }
        return <Error message={errorMessage} />;
    }

    return (
        <div>
            <h1>{profile.name}</h1>
            {/* Display other profile information */}
        </div>
    );
};

export default Profile;