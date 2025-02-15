'use client';

import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { getSingleComment } from '../../../../api/commentData';
import CommentForm from '../../../../components/forms/CommentForm';

export default function EditComment({ params }) {
  const [editItem, setEditItem] = useState({});
  const { id } = params;

  useEffect(() => {
    getSingleComment(id).then(setEditItem);
  }, [id]);

  return <CommentForm obj={editItem} />;
}

EditComment.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
