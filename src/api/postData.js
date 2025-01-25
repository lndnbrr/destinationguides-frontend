import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// GET POSTS
const getPosts = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/posts?uid=${uid}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });

// GET SINGLE POST
const getSinglePost = (id) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/posts/${id}.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// CREATE POST
const createPost = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/posts.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// UPDATE POST
const updatePost = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/posts/${payload.id}.json`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// DELETE POST
const deletePost = (id) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/posts/${id}.json`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// GET A SINGLE POST'S COMMENTS
// const getPostCommemnts = (firebaseKey) =>
//   new Promise((resolve, reject) => {
//     fetch(`${endpoint}/posts.json?orderBy="uid"&equalTo="${uid}"`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => resolve(Object.values(data)))
//       .catch(reject);
//   });

export {
  getPosts,
  createPost,
  getSinglePost,
  deletePost,
  updatePost,
  // getPostCommemnts
};
