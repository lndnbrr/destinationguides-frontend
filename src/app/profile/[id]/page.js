'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getAllPosts } from '../../../api/postData';
import PostCard from '../../../components/PostCard';
import { useAuth } from '../../../utils/context/authContext';
import { getSingleUser } from '../../../api/userData';

const initialState = [
  {
    username: '',
    first_name: '',
    last_name: '',
    bio: '',
    uid: '',
    is_admin: false,
    is_author: false,
  },
];

export default function ProfilePage() {
  const { user } = useAuth();

  // set a state for posts
  const [posts, setPosts] = useState([]);

  const [users, setUsers] = useState([initialState]);

  // create a function that makes the API call to get all the posts
  const getAllThePosts = () => {
    getAllPosts().then(setPosts);
  };

  const getOneUser = () => {
    getSingleUser(user.uid).then(setUsers);
  };

  // make the call to the API to get all the posts on component render
  useEffect(() => {
    getAllThePosts();
  }, []);

  useEffect(() => {
    getOneUser();
  }, []);

  return users.length === 0 ? (
    <div>
      <h1>Are you a new user? Create an account here!</h1>
      <Link href="/profile/new" passHref>
        <Button variant="success">Sign up</Button>
      </Link>
    </div>
  ) : (
    <>
      <h1>{users[0]?.username}</h1>
      <h1>
        {users[0]?.first_name} {users[0]?.last_name}
      </h1>
      <h1>{users[0]?.bio}</h1>
      <div>{users[0]?.is_author === true ? <h1>Accredited Author</h1> : <h1>General User</h1>}</div>
      <div className="text-center my-4">
        <Link href="/post/new" passHref>
          <Button>Create A Post</Button>
        </Link>
      </div>
      <div className="d-flex flex-wrap">
        {/* map over posts here using PostCard component */}
        {posts.map((post) => (
          <PostCard key={post.id} postObj={post} onUpdate={getAllThePosts} />
        ))}
      </div>
    </>
  );
}
