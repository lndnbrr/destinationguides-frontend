'use client';

// import PropTypes from 'prop-types';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { getPostByCountry } from '../../../api/postData';
import PostCard from '../../../components/PostCard';
import { getSingleCountry } from '../../../api/countryData';

function CountryDisplayPage() {
  const [countriesPosts, setCountriesPosts] = useState([]);
  const [wCountriesPosts, setWCountriesPosts] = useState({});
  const { id } = useParams();
  const postCountry = () => {
    getPostByCountry(id).then(setCountriesPosts);
  };

  const theCountry = () => {
    getSingleCountry(id).then(setWCountriesPosts);
  };

  useEffect(() => {
    postCountry();
  }, [id]);

  useEffect(() => {
    theCountry();
  }, [id]);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {countriesPosts.length > 0 ? (
        <>
          <h1>Welcome to {wCountriesPosts[1]}!</h1>
          <h1>Check Out the posts below!</h1>
          <div>
            {' '}
            {countriesPosts.map((post) => (
              <PostCard key={post.id} postObj={post} onUpdate={postCountry} />
            ))}{' '}
          </div>
        </>
      ) : (
        <>
          <h1>Welcome to {wCountriesPosts[1]}!</h1>
          <div>Please Make a Post to view!</div>
        </>
      )}
    </>
  );
}

export default CountryDisplayPage;
