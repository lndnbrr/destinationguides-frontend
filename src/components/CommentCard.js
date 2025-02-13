'use client';

import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import deleteComment from '../api/commentData';

export default function CommentCard({ commentObj, onUpdate }) {
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
          Someone had thoughts about this
        </Card.Subtitle>
        <Card.Text>{commentObj.text} </Card.Text>
        <Button
          variant="warning"
          type="button"
          // when applicable, onClick={`comment/edit/${obj.id}`} passHref
        >
          Edit
        </Button>
        <Button variant="danger" type="button" onClick={removeComment}>
          Delete
        </Button>
        {/* <Card.Text className="mt-1 text-muted">TimeStamp</Card.Text> IF POSSIBLE */}
      </Card.Body>
    </Card>
  );
}

CommentCard.propTypes = {
  commentObj: PropTypes.shape({
    id: PropTypes.string,
    post: PropTypes.string,
    commenter: PropTypes.string,
    text: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
