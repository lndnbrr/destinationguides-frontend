'use client';

/* eslint-disable */

import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useAuth } from '@/utils/context/authContext';
import { createComment, updateComment } from '@/api/commentData';

const initialState = {
  commenter: '',
  post: '',
  text: '',
};

function CommentForm({ obj = intialState }) {
  const { user } = useAuth();
  const [commentInput, setCommentInput] = useState(obj);
  const router = useRouter();

  useEffect(() => {
    if (obj.id) setCommentInput(obj);
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setComment((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.id) {
      updateComment(commentInput).then(() => {
        router.push('/posts');
      });
    } else {
      const payload = { ...comment, uid: user.uid };
      createComment(payload).then(({ name }) => {
        const patchPayload = { id: name };
        updateComment(patchPayload).then(() => {
          router.push('/posts');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="text-black">
      <Form.Label className="text-white">Leave a Comment</Form.Label>
      <Form.Group>
        <FloatingLabel label="thoughts?" className="mb-3">
          <Form.Control placeholder="Comment" name="comment" onChange={handleChange} as="textarea" rows={3} />
        </FloatingLabel>
        <Button variant="success">Submit Comment</Button>
      </Form.Group>
    </Form>
  );
}

CommentForm.propTypes = {
  obj: PropTypes.shape({
    commenter: PropTypes.string,
    id: PropTypes.string,
    post: PropTypes.string,
    text: PropTypes.string,
  }).isRequired,
};

CommentForm.defaultProps = {
  obj: initialState,
};

export default CommentForm;
