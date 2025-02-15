'use client';

import React from 'react';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { deleteComment } from '../api/commentData';

export default function CommentCard({ commentObj, onUpdate }) {
  const removeSingleComment = () => {
    if (window.confirm(`Delete ${commentObj.text}?`)) {
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
        <Card.Subtitle>{commentObj.commenter}</Card.Subtitle>
        <Card.Text>{commentObj.text}</Card.Text>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
            marginTop: '10px',
          }}
        >
          <Link href={`/comment/edit/${commentObj.id}`} passHref>
            <Button variant="primary">Edit</Button>
          </Link>
          <Button variant="danger" type="button" onClick={removeSingleComment}>
            Delete
          </Button>
        </div>
        {/* <Card.Text className="mt-1 text-muted">TimeStamp</Card.Text> */}
      </Card.Body>
    </Card>
  );
}

CommentCard.propTypes = {
  commentObj: PropTypes.shape({
    pk: PropTypes.number,
    id: PropTypes.string,
    post: PropTypes.string,
    commenter: PropTypes.string,
    text: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
