'use client';

import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import deleteComment from '../api/commentData';
import { useAuth } from '../utils/context/authContext';

export default function CommentCard({ commentObj, onUpdate }) {
  const { user } = useAuth();

  const removeComment = () => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      deleteComment(commentObj.id).then(() => onUpdate());
    }
  };

  return (
    <Card
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        maxWidth: '800px',
      }}
    >
      <Card.Body>
        <Card.Subtitle>
          {/* {commentObj.commenter.name} must find out what the name is */}
          {commentObj.commenter.username}
        </Card.Subtitle>
        <Card.Text>{commentObj.text} </Card.Text>

        {user.uid === commentObj.commenter.uid ? (
          <>
            <Button variant="warning" type="button">
              Edit
            </Button>
            <Button variant="danger" type="button" onClick={removeComment}>
              Delete
            </Button>
          </>
        ) : (
          <div> </div>
        )}

        {/* <Card.Text className="mt-1 text-muted">TimeStamp</Card.Text> IF POSSIBLE */}
      </Card.Body>
    </Card>
  );
}

CommentCard.propTypes = {
  commentObj: PropTypes.shape({
    id: PropTypes.string,
    post: PropTypes.string,
    commenter: PropTypes.shape({
      id: PropTypes.number,
      username: PropTypes.string,
      first_name: PropTypes.string,
      last_name: PropTypes.string,
      bio: PropTypes.string,
      uid: PropTypes.string,
      is_admin: PropTypes.bool,
      is_author: PropTypes.bool,
    }),
    text: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
