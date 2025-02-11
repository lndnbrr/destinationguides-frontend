'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Carousel } from 'react-bootstrap';
import CommentCard from '../../../components/CommentCard';
import CommentForm from '../../../components/forms/CommentForm';
import { getCommentsUsingId } from '../../../api/commentData';
import { getSinglePost } from '../../../api/postData';

const initialState = {
  title: '',
  author: '',
  category: '',
  body: '',
  tags: [],
};
export default function ViewPost({ params }) {
  const { id } = params;
  const [postDetails, setPostDetails] = useState(initialState);
  const [comments, setComments] = useState([]);

  const getThePost = () => {
    getSinglePost(id).then(setPostDetails);
  };
  const getPostComments = () => {
    getCommentsUsingId(id).then(setComments);
  };

  useEffect(() => {
    getThePost();
    getPostComments();
  }, [id]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="text-white ms-5 details">
        <div className="text-white ms-5 details" style={{ width: '400px' }}>
          <h2>{postDetails.title}</h2>
          <h3>{postDetails.category}</h3>
          <p>Post Description: {postDetails.body || ''}</p>
          <p>🏷️: {postDetails.tags?.map((tag, index) => (index === postDetails.tags.length - 1 ? tag.name : `${tag.name}, `))}</p>
          <div>
            <p>💬:</p>
            <Carousel interval={3000} style={{ width: '400px', margin: 'auto' }}>
              {comments.map((comment) => (
                <Carousel.Item key={comment.id}>
                  <CommentCard commentObj={comment} onUpdate={getPostComments} />
                </Carousel.Item>
              ))}
            </Carousel>
            <Card style={{ width: '400px', margin: '15px', backgroundColor: 'black', padding: '10px' }}>
              <Card.Body>
                <CommentForm commentPostId={id} onSubmit={getPostComments} />
              </Card.Body>
            </Card>{' '}
          </div>
        </div>
      </div>
    </div>
  );
}

ViewPost.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  postDetails: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    category: PropTypes.string,
    body: PropTypes.string,
    tags: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      }),
    ),
  }),
};

ViewPost.defaultProps = {
  postDetails: initialState,
};
