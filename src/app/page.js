'use client';

import { useAuth } from '@/utils/context/authContext';
import { useState, useEffect } from 'react';
import PostCard from '../components/PostCard';
import { getAllPosts } from '../api/postData';

function Home() {
  const { user } = useAuth();

  const [featPosts, setFeatPosts] = useState([]);

  const showFeatPosts = () => {
    getAllPosts().then(setFeatPosts);
  };

  useEffect(() => {
    showFeatPosts();
  }, []);

  return (
    <>
      <div
        className="text-center d-flex flex-column justify-content-center align-content-center"
        style={{
          padding: '30px 0px 10px 0px',
          margin: '0 auto',
        }}
      >
        <h1>
          Hello <span style={{ color: 'gold' }}>{user.displayName}</span>!
        </h1>
        <h1>Welcome to the ultimate destination guide!</h1>
      </div>
      <div style={{ border: '3px solid green', padding: '45px 0px 45px 0px' }}>
        <div className="d-flex flex-wrap justify-content-evenly">
          {featPosts.slice(0, 3).map((imagePost) => (
            <div>
              <PostCard key={imagePost.id} postObj={imagePost} onUpdate={showFeatPosts} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
