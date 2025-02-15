'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useAuth } from '../../utils/context/authContext';
import { createTag, updateTag } from '../../api/tagData';

const initialState = {
  id: '',
  name: '',
};

function TagForm({ obj = initialState }) {
  const [formInput, setFormInput] = useState(obj);
  // const [tags, setTags] = useState([]);
  const { user } = useAuth();
  const router = useRouter();

  // useEffect(() => {
  //   if (obj.id) {
  //     setFormInput(obj);
  //   } else {
  //     setFormInput(initialState);
  //   }
  // }, [obj]);

  // useEffect(() => {
  //   getAllTags(setTags);
  // }, []);

  useEffect(() => {
    if (obj.id) setFormInput(obj);
  }, [obj]);

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.id) {
      updateTag(formInput).then(() => {
        router.push(`/profile/${user.uid}`);
      });
    } else {
      createTag(formInput).then(() => {
        router.push(`/profile/${user.uid}`);
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h4 className="text-white mt-5">{obj.id ? 'Update' : 'Add'} Tag</h4>
      {/* <p>{tags}</p> */}

      <FloatingLabel controlId="floatingTextarea" label="new tag" className="mb-3">
        <Form.Control as="textarea" placeholder="Add new tag" style={{ height: '100px', width: '400px' }} name="name" value={formInput.name} onChange={handleChanges} required />

        {/* SUBMIT TAG */}
        <Button type="submit">{obj.id ? 'Update' : 'Add'} Tag</Button>
      </FloatingLabel>
    </Form>
  );
}

TagForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }),
  // onSubmit: PropTypes.func.isRequired,
};

TagForm.defaultProps = {
  obj: initialState,
};
export default TagForm;
