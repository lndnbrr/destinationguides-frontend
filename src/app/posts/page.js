/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '@/utils/context/authContext';
import { getPosts } from '../../api/postData';
import PostCard from '../../components/PostCard';

function Home() {
  // set a state for posts
  const [posts, setPosts] = useState([]);

  // get user ID using useAuth Hook
  const { user } = useAuth();

  // create a function that makes the API call to get all the posts
  const getAllThePosts = () => {
    getPosts(user.id).then(setPosts);
  };

  // make the call to the API to get all the posts on component render
  useEffect(() => {
    getAllThePosts();
  }, []);

  return (
    <div className="text-center my-4">
      <Link href="/post/new" passHref>
        <Button>Create A Post</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {/* map over posts here using PostCard component */}
        {posts.map((post) => (
          <PostCard key={post.id} postObj={post} onUpdate={getAllThePosts} />
        ))}
      </div>
    </div>
  );
}
export default Home;
