'use client';

// any component that uses useAuth needs this because if a component directly imports useAuth, it needs to be a client component since useAuth uses React hooks.

import { Button } from 'react-bootstrap';
import { signOut } from '@/utils/auth'; // anything in the src dir, you can use the @ instead of relative paths
import { useAuth } from '@/utils/context/authContext';
import { useState , useEffect } from 'react';
// import CommentCard from '../components/CommentCard';
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
          height: '90vh',
          padding: '30px',
          maxWidth: '400px',
          margin: '0 auto',
        }}
      >
        <h1>Hello {user.displayName}! </h1>
        <p>Click the button below to logout!</p>
        <Button variant="danger" type="button" size="lg" className="copy-btn" onClick={signOut}>
          Sign Out
        </Button>
      </div>
      {/* <CommentCard /> */}
      <div className="d-flex flex-wrap">
        {featPosts.map((imagePOst) => (
          <PostCard key={imagePOst.id} postObj={imagePOst} onUpdate={showFeatPosts} />
        ))}
      </div>
    </>
  );
}

export default Home;
