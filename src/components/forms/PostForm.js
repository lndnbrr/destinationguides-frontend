'use client';

import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import useRouter from 'next/router';
import PropTypes from 'prop-types';
import { useAuth } from '../../utils/context/authContext';
import { createPost, updatePost } from '../../api/postData';

const initialState = {
  title: '',
  author: '',
  category: '',
  body: '',
  country: '',
  region: '',
  image: '',
  tags: '',
};

function PostForm({ obj = initialState }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updatePost(formInput).then(() => router.push(`/posts/`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createPost(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updatePost(patchPayload).then(() => {
          router.push('/posts');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Post</h2>

      {/* POST TITLE  */}
      <FloatingLabel controlId="floatingInput1" label="Post Title" className="mb-3">
        <Form.Control type="text" placeholder="Enter tile of post" name="title" value={formInput.title} onChange={handleChange} required />
      </FloatingLabel>

      {/* AUTHOR (creator of post) */}
      <FloatingLabel controlId="floatingInput2" label="Author Name" className="mb-3">
        <Form.Control type="text" placeholder="Enter Name" name="author" value={formInput.author} onChange={handleChange} required />
      </FloatingLabel>

      {/* CATEGORY INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="Country" className="mb-3">
        <Form.Control type="text" placeholder="Enter country" name="country" value={formInput.country} onChange={handleChange} required />
      </FloatingLabel>

      {/* BODY INPUT */}
      <FloatingLabel controlId="floatingInput3" label="Body" className="mb-3">
        <Form.Control type="text" placeholder="Enter description" name="post_body" value={formInput.body} onChange={handleChange} required />
      </FloatingLabel>

      {/* COUNTRY INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="Category" className="mb-3">
        <Form.Control type="text" placeholder="Enter category" name="category" value={formInput.category} onChange={handleChange} required />
      </FloatingLabel>

      {/* REGION INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="Region" className="mb-3">
        <Form.Control type="text" placeholder="Enter region" name="region" value={formInput.region} onChange={handleChange} required />
      </FloatingLabel>

      {/* IMAGE INPUT  */}
      <FloatingLabel controlId="floatingInput4" label="Author Image" className="mb-3">
        <Form.Control type="url" placeholder="Enter an image url" name="image" value={formInput.image} onChange={handleChange} required />
      </FloatingLabel>

      {/* SUBMIT BUTTON */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Post</Button>
    </Form>

    /// // ADD TAG FEATURE HERE???? //////
  );
}

PostForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    author: PropTypes.string,
    category: PropTypes.string,
    body: PropTypes.string,
    country: PropTypes.string,
    region: PropTypes.string,
    tags: PropTypes.string,
  }),
};

PostForm.defaultProps = {
  obj: initialState,
};

export default PostForm;
