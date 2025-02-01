'use client';

import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { getSinglePost } from '../../../../api/postData';
import PostForm from '../../../../components/forms/PostForm';

export default function EditPost({ params }) {
  const [editItem, setEditItem] = useState({});
  const { id } = params;

  useEffect(() => {
    getSinglePost(id).then(setEditItem);
  }, [id]);

  return <PostForm obj={editItem} />;
}

EditPost.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
