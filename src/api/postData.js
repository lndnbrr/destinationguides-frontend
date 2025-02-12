import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// GET ALL POSTS
const getAllPosts = () =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/posts`, {
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
    fetch(`${endpoint}/posts/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// GET POSTS BY AUTHOR
const getPostsByAuthor = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/posts?author=${uid}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });

// GET POSTS BY COUNTRY
const getPostByCountry = (pk) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/posts?country=${pk}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });

// CREATE POST
const createPost = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/posts`, {
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
    fetch(`${endpoint}/posts/${payload.id}`, {
      method: 'PUT',
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

/// SEARCH BAR FOR POSTS BY COUNTRY ///

export { getPostsByAuthor, getAllPosts, createPost, getSinglePost, deletePost, updatePost, getPostByCountry };
