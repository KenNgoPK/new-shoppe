'use client';

import { useEffect, useState } from 'react';

const Profile = () => {
    const [data, setData] = useState(null)
    async function fetchProfile() {
        const response = await fetch('https://form-test-api.vercel.app/api/login')
        const data = await response.json()
        setData(data)
    }

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div>
      <h1>Profile</h1>
      <p><strong>Username:</strong> {data.username}</p>
      <p><strong>Email:</strong> {data.email}</p>
    </div>
  );
};

export default Profile;
