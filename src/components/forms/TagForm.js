import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createTag, getAllTags, updateTag } from '../../api/tagData';

const initialState = {
  id: '',
  name: '',
};

function TagForm({ obj, onSubmit }) {
  const [formInput, setFormInput] = useState(initialState);
  const [tags, setTags] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (obj.id) {
      setFormInput(obj);
    } else {
      setFormInput(initialState);
    }
  }, [obj]);

  useEffect(() => {
    getAllTags(setTags);
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
      updateTag(formInput).then(onSubmit);
    } else {
      const payload = {
        name: obj.name,
      };
      createTag(user.id, payload).then(() => {
        setFormInput(initialState);
        onSubmit();
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h4 className="text-white mt-5">{obj.id ? 'Update' : 'Add'} Tag</h4>
      <p>{tags}</p>

      <FloatingLabel controlId="floatingTextarea" label="new tag" className="mb-3">
        <Form.Control as="textarea" placeholder="Add new tag" style={{ height: '200px', width: '400px' }} name="label" value={formInput.name} onChange={handleChange} required />

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
  onSubmit: PropTypes.func.isRequired,
};

TagForm.defaultProps = {
  obj: initialState,
};
export default TagForm;
