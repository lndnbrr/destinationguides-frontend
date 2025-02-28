'use client';

/* eslint-disable */

import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useAuth } from '@/utils/context/authContext';
import { createComment, updateComment } from '@/api/commentData';

const initialState = {
  commenter: '',
  post: '',
  text: '',
};

function CommentForm({ obj = initialState, onUpdate }) {
  const { user } = useAuth();
  const [commentInput, setCommentInput] = useState(obj);
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    if (obj.id) setCommentInput({ ...obj });
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCommentInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    console.warn('here');
    e.preventDefault();
    if (obj.id) {
      const payload = { ...commentInput, commenter: user.uid, post: obj.post.id, id: obj.id };
      updateComment(payload).then(() => {
        router.push(`/post/${obj.post.id}`);
      });
    } else {
      const payload = { ...commentInput, commenter: user.uid, post: id };
      createComment(payload).then(() => {
        onUpdate();
        setCommentInput(initialState);
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="text-black">
      <Form.Label className="text-white">Leave a Comment</Form.Label>
      <Form.Group>
        <FloatingLabel label="thoughts?" className="mb-3" controlId="floatingInputComment">
          <Form.Control placeholder="Comment" name="text" onChange={handleChange} as="textarea" value={commentInput.text} rows={3} />
        </FloatingLabel>
        <Button type="submit">{obj.id ? 'Update' : 'Submit'} Comment</Button>
      </Form.Group>
    </Form>
  );
}

CommentForm.propTypes = {
  obj: PropTypes.shape({
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
    id: PropTypes.string,
    post: PropTypes.string,
    text: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func,
};

CommentForm.defaultProps = {
  obj: initialState,
};

export default CommentForm;
