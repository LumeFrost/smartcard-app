// src/components/Profile.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchZarbyteProfileData } from '../api/zarbyteApi.js';
import Loading from './Loading.js';
import Error from './Error.js';

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
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{profile.name}</h1>
      <p className="text-lg mb-2">Email: {profile.email}</p>
      <p className="text-lg mb-2">Phone: {profile.phone}</p>
      {/* Add more profile details as needed */}
    </div>
  );
};

export default Profile;