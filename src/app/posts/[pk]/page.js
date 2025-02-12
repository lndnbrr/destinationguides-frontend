/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
// import { useAuth } from '@/utils/context/authContext';
import PostCard from '@/components/PostCard';
import { getPostByCountry } from '../../../api/postData';

function CountryPosts() {
  // set a state for posts
  const [posts, setPosts] = useState([]);

  // get user ID using useAuth Hook

  // create a function that makes the API call to get all the posts
  const getAllCountryPosts = () => {
    getPostByCountry().then(setPosts);
  };

  // make the call to the API to get all the posts on component render
  useEffect(() => {
    getAllCountryPosts();
  }, []);

  return (
    <div className="text-center my-4">
      <Link href="/post/new" passHref>
        <Button>Create A Post</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {/* map over posts here using PostCard component */}
        {posts.map((post) => (
          <PostCard key={post.id} postObj={post} onUpdate={getAllCountryPosts} />
        ))}
      </div>
    </div>
  );
}
export default CountryPosts;
