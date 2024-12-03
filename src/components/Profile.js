// src/components/Profile.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchZarbyteProfileData } from '../api/zarbyteApi';

const Profile = () => {
  const { uuid } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const data = await fetchZarbyteProfileData(uuid);
        setProfile(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    getProfile();
  }, [uuid]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>{profile.name}</h1>
      {/* Display other profile information */}
    </div>
  );
};

export default Profile;