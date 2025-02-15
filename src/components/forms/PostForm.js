'use client';

/* eslint-disable */

import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import CreatableSelect from 'react-select/creatable';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { useAuth } from '@/utils/context/authContext';
import { createPost, updatePost } from '@/api/postData';
import { getCountryByRegion } from '@/api/countryData';
import getCategories from '@/api/categoryData';
import { getRegion } from '../../api/regionData';
import { getAllTags } from '../../api/tagData';

const initialState = {
  title: '',
  author: {},
  category: {},
  body: '',
  country: {},
  region: {},
  image: '',
  tags: [],
};

function PostForm({ obj = initialState }) {
  const { user } = useAuth();
  const [formInput, setFormInput] = useState(obj);
  const [categories, setCategories] = useState([]);
  const [regions, setRegions] = useState([]);
  const [countries, setCountries] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (obj.id) setFormInput({ ...obj, author: obj.author.uid, category: obj.category.id, country: obj.country.id, region: obj.region.id, tags: obj.tags.id });
  }, [obj]);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  useEffect(() => {
    if (obj?.id) {
      setSelectedTags(obj.tags.map((tag) => ({ value: tag.id, label: tag.name })));
    }
  }, [obj]);

  useEffect(() => {
    getRegion().then(setRegions);
  }, []);

  useEffect(() => {
    getAllTags().then(setTags);
  }, []);

  useEffect(() => {
    getCountryByRegion(formInput.region).then(setCountries);
  }, [formInput.region]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChangeForTags = (selectedOptions) => {
    const existingTags = [];
    selectedOptions.forEach((tagSelection) => {
      existingTags.push({ value: tagSelection.value, label: tagSelection.label });
    });
    setSelectedTags(existingTags);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tagIds = selectedTags.map((tag) => tag.value);
    const payload = { ...formInput, author: user.uid, tags: tagIds };
    if (obj.id) {
      updatePost(payload).then(() => router.push(`/profile/${user.uid}`));
    } else {
      createPost(payload).then(() => {
        router.push(`/profile/${user.uid}`);
      });
    }
  };

  const dropdownText = {
    control: (styles) => ({ ...styles }),
    option: (styles) => {
      return {
        ...styles,
        color: 'black',
      };
    },
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.id ? 'Update' : 'Create'} Post</h2>

      {/* POST TITLE  */}
      <FloatingLabel controlId="floatingInput1" label="Post Title" className="mb-3">
        <Form.Control type="text" placeholder="Enter tile of post" name="title" value={formInput.title} onChange={handleChange} required />
      </FloatingLabel>

      {/* REGION INPUT  */}
      <FloatingLabel controlId="floatingInput6" label="Region" className="mb-3">
        <Form.Select controlId="dropdown1" type="text" placeholder="Enter region" name="region" value={formInput.region} onChange={handleChange} required>
          <option></option>
          {regions.map((region) => (
            <option key={region.id} value={region.id}>
              {region.name}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>

      {/* COUNTRY INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="Country" className="mb-3">
        <Form.Select controlId="dropdown2" type="text" placeholder="Enter country" name="country" value={formInput.country} onChange={handleChange} required>
          <option></option>

          {countries.map((country) => (
            <option key={country.id} value={country.id}>
              {country.name}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>

      {/* IMAGE INPUT  */}
      <FloatingLabel controlId="floatingInput7" label="Post Image" className="mb-3">
        <Form.Control type="url" placeholder="Enter an image url" name="image" value={formInput.image} onChange={handleChange} required />
      </FloatingLabel>

      {/* BODY INPUT */}
      <FloatingLabel controlId="floatingInput4" label="Body" className="mb-3">
        <Form.Control as="textarea" placeholder="Enter description" name="body" value={formInput.body} style={{ height: '200px' }} onChange={handleChange} required />
      </FloatingLabel>

      {/* CATEGORY INPUT  */}
      <FloatingLabel controlId="floatingInput5" label="Category" className="mb-3">
        <Form.Select controlId="dropdown3" type="text" placeholder="Enter a category" name="category" value={formInput.category} onChange={handleChange} required>
          <option></option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>

      {/* TAG FEATURE */}
      <CreatableSelect
        name="tags"
        isMulti
        value={selectedTags}
        onChange={handleChangeForTags}
        placeholder="Add tags for this post"
        styles={dropdownText}
        options={tags.map((tag) => ({
          value: tag.id,
          label: tag.name,
        }))}
      />
      {/* SUBMIT BUTTON */}
      <div>
        <Button type="submit">{obj.id ? 'Update' : 'Create'} Post</Button>
      </div>
    </Form>
  );
}

PostForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    author: PropTypes.shape({
      id: PropTypes.number,
      username: PropTypes.string,
      first_name: PropTypes.string,
      last_name: PropTypes.string,
      bio: PropTypes.string,
      uid: PropTypes.string,
      is_admin: PropTypes.bool,
      is_author: PropTypes.bool,
    }),
    category: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
    image: PropTypes.string,
    body: PropTypes.string,
    country: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      region: PropTypes.number,
    }),
    region: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
    tags: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      }),
    ),
    created_at: PropTypes.string,
  }),
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  ),
};

PostForm.defaultProps = {
  obj: initialState,
};

export default PostForm;
