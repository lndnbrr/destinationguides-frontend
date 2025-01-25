'use client';

import React from 'react';
import { Button, Card } from 'react-bootstrap';
import deleteComment from '../api/commentData';

export default function CommentCard() {
// insert obj when applicable
  const removeComment = (remainingComments) => {
    deleteComment().then(() => remainingComments);
    // insert obj when applicable
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
        <Card.Subtitle>Default Name</Card.Subtitle>
        <Card.Text>Default comment comment comment comment comment comment comment </Card.Text>
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
        <Card.Text className="mt-1 text-muted">TimeStamp</Card.Text>
      </Card.Body>
    </Card>
  );
}

// insert prop dclaration when applicable
