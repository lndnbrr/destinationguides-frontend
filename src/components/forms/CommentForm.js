import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useAuth } from '@/utils/context/authContext';
import { createComment, updateComment } from '@/api/commentData';

const intialState = {
  text: '',
};

function CommentForm({ obj = intialState }) {
  const [comment, setComment] = useState(obj);

  const router = useRouter();

  const { user } = useAuth();

  useEffect(() => {
    if (obj.id) setComment(obj);
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
      updateComment(comment).then(() => {
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
      <Form.Label className="text-white">Create a Comment</Form.Label>
      <Form.Group>
        <FloatingLabel label="Comment" className="mb-3">
          <Form.Control
            placeholder="Comment"
            name="comment"
            // value={comment.text}
            onChange={handleChange}
            as="textarea"
            rows={3}
          />
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

export default CommentForm;
