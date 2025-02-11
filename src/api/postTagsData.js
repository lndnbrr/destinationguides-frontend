import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// GET POST TAGS BY UID
const getPostTags = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/posttags?uid=${uid}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });

// GET ALL POST TAGS
const getAllPostTags = () =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/posttags`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });

// GET POST TAGS BY ID
const getPostTagsById = (id) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/posttags/${id}.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// CREATE POST TAG
const createPostTags = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/posttags.json`, {
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

// UPDATE POST TAG
const updatePostTags = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/posttags/${payload.id}.json`, {
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
const deletePostTags = (id) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/posttags/${id}.json`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

export { getPostTags, getAllPostTags, createPostTags, getPostTagsById, deletePostTags, updatePostTags };
