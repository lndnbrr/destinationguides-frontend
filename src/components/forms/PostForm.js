'use client';

/* eslint-disable */

import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { useAuth } from '../../utils/context/authContext';
import { createPost, updatePost } from '../../api/postData';
import { getRegion } from '../../api/regionData';
import { getCountry } from '../../api/countryData';

const initialState = {
  title: '',
  author: '',
  category: '',
  body: '',
  country: '',
  region: '',
  image: '',
  tags: [],
};

function PostForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [regions, setRegions] = useState([]);
  const [countries, setCountries] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.id) setFormInput(obj);
  }, [obj, user]);

  useEffect(() => {
    getRegion().then(setRegions);
  }, []);

  useEffect(() => {
    getCountry().then(setCountries);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.id) {
      updatePost(formInput).then(() => router.push('/posts'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createPost(payload).then(({ name }) => {
        const patchPayload = { id: name };
        updatePost(patchPayload).then(() => {
          router.push('/posts');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.id ? 'Update' : 'Create'} Post</h2>

      {/* POST TITLE  */}
      <FloatingLabel controlId="floatingInput1" label="Post Title" className="mb-3">
        <Form.Control type="text" placeholder="Enter tile of post" name="title" value={formInput.title} onChange={handleChange} required />
      </FloatingLabel>

      {/* AUTHOR (creator of post) */}
      <FloatingLabel controlId="floatingInput2" label="Author Name" className="mb-3">
        <Form.Control type="text" placeholder="Enter Name" name="author" value={formInput.author} onChange={handleChange} required />
      </FloatingLabel>

      {/* COUNTRY INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="Country" className="mb-3">
        <Form.Select controlId="dropdown1" type="text" placeholder="Enter country" name="country" value={formInput.country} onChange={handleChange} required>
          <option></option>
          {countries.map((country) => (
            <option key={country.id} value={country.id}>
              {country.name}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>

      {/* REGION INPUT  */}
      <FloatingLabel controlId="floatingInput6" label="Region" className="mb-3">
        <Form.Select controlId="dropdown2" type="text" placeholder="Enter region" name="region" value={formInput.region} onChange={handleChange} required>
          <option></option>
          {regions.map((region) => (
            <option key={region.id} value={region.id}>
              {region.name}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>

      {/* BODY INPUT */}
      <FloatingLabel controlId="floatingInput4" label="Body" className="mb-3">
        <Form.Control type="text" placeholder="Enter description" name="body" value={formInput.body} onChange={handleChange} required />
      </FloatingLabel>

      {/* CATEGORY INPUT  */}
      <FloatingLabel controlId="floatingInput5" label="Category" className="mb-3">
        <Form.Control type="text" placeholder="Enter category" name="category" value={formInput.category} onChange={handleChange} required />
      </FloatingLabel>

      {/* IMAGE INPUT  */}
      <FloatingLabel controlId="floatingInput7" label="Post Image" className="mb-3">
        <Form.Control type="url" placeholder="Enter an image url" name="image" value={formInput.image} onChange={handleChange} required />
      </FloatingLabel>

      {/* ///// ADD TAG FEATURE HERE???? ////// */}
      <Form.Label>
        <p>Tags</p>
      </Form.Label>
      <Form.Control type="name" placeholder="Add Tags" />
      <Form.Text className="text-muted">Add tags that best fit the content of this post.</Form.Text>

      {/* SUBMIT BUTTON */}
      <Button type="submit">{obj.id ? 'Update' : 'Create'} Post</Button>
    </Form>
  );
}

PostForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    author: PropTypes.number,
    category: PropTypes.number,
    image: PropTypes.string,
    body: PropTypes.string,
    country: PropTypes.number,
    region: PropTypes.number,
    tags: PropTypes.string,
    created_at: PropTypes.string,
  }),
};

PostForm.defaultProps = {
  obj: initialState,
};

export default PostForm;
