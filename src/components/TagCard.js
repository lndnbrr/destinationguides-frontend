'use client';

import React from 'react';
import PropTypes from 'prop-types';
import { Badge, Button } from 'react-bootstrap';
import { deleteTag } from '../api/tagData';

function TagCard({ postObj, onUpdate }) {
  const removeTag = () => {
    if (window.confirm(`Are you sure you want to delete the tag: "${postObj.name}" ?`)) {
      deleteTag(postObj.id).then(() => onUpdate());
    }
  };

  return (
    <div>
      <Badge bg="secondary">{postObj.name}</Badge>
      <Button variant="danger" type="button" onClick={removeTag}>
        Delete
      </Button>
    </div>
  );
}

export default TagCard;

TagCard.propTypes = {
  postObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
