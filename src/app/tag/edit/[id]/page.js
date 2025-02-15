'use client';

import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { getSingleTag } from '../../../../api/tagData';
import TagForm from '../../../../components/forms/TagForm';

export default function EditPost({ params }) {
  const [editItem, setEditItem] = useState({});
  const { id } = params;

  useEffect(() => {
    getSingleTag(id).then(setEditItem);
  }, [id]);

  return <TagForm obj={editItem} />;
}

EditPost.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
