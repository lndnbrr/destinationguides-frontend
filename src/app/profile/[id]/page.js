'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import TagCard from '@/components/TagCard';
import PropTypes from 'prop-types';
import { getPostsByAuthor } from '../../../api/postData';
import PostCard from '../../../components/PostCard';
import { useAuth } from '../../../utils/context/authContext';
import { getSingleUser } from '../../../api/userData';
import { getAllTags } from '../../../api/tagData';

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

export default function ProfilePage({ tagObj }) {
  const { user } = useAuth();

  // set a state for posts
  const [posts, setPosts] = useState([]);

  const [tags, setTags] = useState([]);

  const [users, setUsers] = useState([initialState]);

  // create a function that makes the API call to get all the posts
  const getAllThePosts = () => {
    getPostsByAuthor(user.uid).then(setPosts);
  };

  const getAllTheTags = () => {
    getAllTags().then(setTags);
  };

  const getOneUser = () => {
    getSingleUser(user.uid).then(setUsers);
  };

  // make the call to the API to get all the posts on component render
  useEffect(() => {
    getAllThePosts();
  }, []);

  useEffect(() => {
    getAllTheTags();
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
        {users[0]?.is_author === true ? (
          <Link href="/post/new" passHref>
            <Button>Create A Post</Button>
          </Link>
        ) : (
          <h1> 'not applicable' </h1>
        )}
      </div>

      <div>
        <h1>Tags Management Page</h1>
        <Link href="/tag/new" passHref>
          <Button>Create A Tag</Button>
        </Link>
        <Link href={`/tag/edit/${tagObj?.id}`} passHref>
          <Button variant="warning">Update A Tag</Button>
        </Link>
        <div className="d-flex flex-wrap">
          {/* map over posts here using PostCard component */}
          {tags.map((tag) => (
            <TagCard key={tag.id} postObj={tag} />
          ))}
        </div>
      </div>

      {users[0]?.is_author === true ? (
        <div>
          <h1>Check out Your Posts dude!</h1>
          {posts.length > 0 ? (
            <div className="d-flex flex-wrap">
              {posts.map((post) => (
                <PostCard key={post.id} postObj={post} onUpdate={getAllThePosts} />
              ))}
            </div>
          ) : (
            <h1> Where are the posts at?! You should make one! </h1>
          )}
        </div>
      ) : (
        <h1> 'not posts shown' </h1>
      )}
    </>
  );
}

ProfilePage.propTypes = {
  tagObj: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }),
};
