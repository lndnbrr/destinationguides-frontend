'use client';

/* eslint-disable */

import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { useAuth } from '../../utils/context/authContext';
import { createUser, updateUser } from '../../api/userData';

const initialState = {
  username: '',
  first_name: '',
  last_name: '',
  bio: '',
  uid: '',
  is_admin: false,
  is_author: false,
};

function NewUserForm({ obj = initialState }) {
  const { user } = useAuth();

  const [formInput, setFormInput] = useState(initialState);

  const router = useRouter();

  useEffect(() => {
    if (obj.uid) setFormInput(obj);
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
    if (obj.uid === user.uid) {
      updateUser(formInput).then(() => router.push(`/users?uid=${user.uid}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createUser(payload).then(() => {
        router.push(`/profile/${user.uid}`);
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.id ? 'Update' : 'Create'} User Form</h2>

      {/* FIRST NAME  */}
      <Form.Label className="text-white">First Name</Form.Label>
      <FloatingLabel controlId="floatingInput1" label="First Name" className="mb-3">
        <Form.Control type="text" placeholder="Enter your First Name" name="first_name" value={formInput.first_name} onChange={handleChange} required />
      </FloatingLabel>

      {/* LAST NAME  */}
      <Form.Label className="text-white">Last Name</Form.Label>
      <FloatingLabel controlId="floatingInput2" label="Last Name" className="mb-3">
        <Form.Control type="text" placeholder="Enter your Last Name" name="last_name" value={formInput.last_name} onChange={handleChange} required />
      </FloatingLabel>

      {/* USERNAME  */}
      <Form.Label className="text-white">Username</Form.Label>
      <FloatingLabel controlId="floatingInput2" label="Username" className="mb-3">
        <Form.Control type="text" placeholder="Create a username" name="username" value={formInput.username} onChange={handleChange} required />
      </FloatingLabel>

      {/* BIO */}
      <Form.Label className="text-white">Bio</Form.Label>
      <FloatingLabel controlId="floatingInput3" label="Bio" className="mb-3">
        <Form.Control type="text" placeholder="Tell us who you are!" name="bio" value={formInput.bio} style={{ height: '190px' }} onChange={handleChange} />
      </FloatingLabel>

      {/* AUTHOR STATUS  */}
      <Form.Check
        type="switch"
        id="authorSwitch"
        label="Would you like to be an Author?"
        checked={formInput.is_author}
        onChange={(e) => {
          setFormInput((authorChecked) => ({ ...authorChecked, is_author: e.target.checked }));
        }}
      />

      {/* SUBMIT BUTTON */}
      <Button type="submit">{obj.id ? 'Update my profile!' : 'Create my profile!'}</Button>
    </Form>
  );
}

NewUserForm.propTypes = {
  obj: PropTypes.shape({
    username: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    bio: PropTypes.string,
    uid: PropTypes.string,
    is_admin: PropTypes.bool,
    is_author: PropTypes.bool,
  }),
};

NewUserForm.defaultProps = {
  obj: initialState,
};

export default NewUserForm;
