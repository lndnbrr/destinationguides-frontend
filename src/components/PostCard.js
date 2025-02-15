'use client';

import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deletePost } from '../api/postData';
import { useAuth } from '../utils/context/authContext';

function PostCard({ postObj, onUpdate }) {
  const deleteSinglePost = () => {
    if (window.confirm(`Delete ${postObj.title}?`)) {
      deletePost(postObj.id).then(() => onUpdate());
    }
  };

  const { user } = useAuth();

  return (
    <Card>
      <Card.Img variant="top" src={postObj.image} alt={postObj.title} style={{ height: '300px' }} />
      <Card.Body>
        <Card.Title>{postObj.title}</Card.Title>
        <Card.Subtitle>{postObj.category.name}</Card.Subtitle>
        <Card.Text>By {postObj.author.username}</Card.Text>

        {/* VIEW POST DETAILS  */}
        <Link href={`/post/${postObj.id}`} passHref>
          <Button variant="primary" className="m-2">
            VIEW
          </Button>
        </Link>

        {user.uid === postObj.author.uid ? (
          <>
            <Link href={`/post/edit/${postObj.id}`} passHref>
              <Button variant="warning">Edit</Button>
            </Link>
            <Button variant="danger" onClick={deleteSinglePost} className="m-2">
              DELETE
            </Button>
          </>
        ) : (
          <div> </div>
        )}
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">Created on {postObj.created_at}</small>
      </Card.Footer>
    </Card>
  );
}

PostCard.propTypes = {
  postObj: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.shape({
      id: PropTypes.number,
      username: PropTypes.string,
      first_name: PropTypes.string,
      last_name: PropTypes.string,
      bio: PropTypes.string,
      uid: PropTypes.string,
      is_admin: PropTypes.bool,
      is_author: PropTypes.bool,
    }),
    category: PropTypes.number,
    body: PropTypes.string,
    image: PropTypes.string,
    country: PropTypes.number,
    region: PropTypes.number,
    tags: PropTypes.string,
    created_at: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default PostCard;
