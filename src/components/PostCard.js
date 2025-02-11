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

  const { user } = useAuth;

  return (
    <Card
    // style={{ marginLeft: '15px', marginRight: '15px' }}
    >
      <Card.Img variant="top" src={postObj.image} alt={postObj.title} style={{ height: '300px' }} />
      <Card.Body>
        <Card.Title>{postObj.title}</Card.Title>
        <Card.Subtitle>{postObj.category.name}</Card.Subtitle>
        <Card.Text>By {postObj.author.username}</Card.Text>

        {/* TAGS HERE MAYBE?????? */}

        <Link href={`/post/${postObj.id}`} passHref>
          <Button variant="primary" className="m-2">
            VIEW
          </Button>
        </Link>
        {/* EDIT POST DETAILS  */}

        {user?.uid === postObj?.author?.uid ? (
          <Link href={`/post/edit/${postObj.id}`} passHref>
            <Button variant="primary">Edit</Button>
          </Link>
        ) : (
          ''
        )}
        {/* TEMP DELETE BUTTON */}
        <Button variant="danger" onClick={deleteSinglePost} className="m-2">
          DELETE
        </Button>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">Created on {postObj.created_at}</small>
      </Card.Footer>
    </Card>
  );
}

PostCard.propTypes = {
  postObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    author: PropTypes.string,
    category: PropTypes.string,
    body: PropTypes.string,
    image: PropTypes.string,
    country: PropTypes.string,
    region: PropTypes.string,
    tags: PropTypes.string,
    created_at: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default PostCard;

// textAlign: 'center', color: '#DDA11E', fontSize: '14px'
