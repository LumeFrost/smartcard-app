// src/components/ProfileWrapper.js

import React from 'react';
import { useParams } from 'react-router-dom';
import Profile from './Profile.js';
import NotFound from './NotFound.js';

const ProfileWrapper = () => {
  const { uuid } = useParams();

  // Regex to match UUID v4 format (case-insensitive)
  const isValidUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(uuid);

  if (!isValidUUID) {
    return <NotFound />;
  }

  return <Profile />;
};

export default ProfileWrapper;