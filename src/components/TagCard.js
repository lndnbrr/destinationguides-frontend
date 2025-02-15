'use client';

import React from 'react';
import PropTypes from 'prop-types';
// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
// import Link from 'next/link';
import { Badge } from 'react-bootstrap';
// import { deleteTag } from '../api/tagData';

function TagCard({
  postObj,
  //  onUpdate
}) {
  // const deleteSingleTag = () => {
  //   if (window.confirm(`Delete ${postObj.name}?`)) {
  //     deleteTag(postObj.id).then(() => onUpdate());
  //   }
  // };

  //   const aTag = () => {
  //     // <Badge>
  //     //   <Badge.Title>{postObj.name}</Badge.Title>
  //     // </Badge>
  // <div>
  // {postObj.name}
  // </div>
  // }

  return <Badge varian="secondary">{postObj.name}</Badge>;
}

TagCard.propTypes = {
  postObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }).isRequired,
  // onUpdate: PropTypes.func.isRequired,
};

export default TagCard;
