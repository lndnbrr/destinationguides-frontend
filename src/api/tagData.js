import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// GET ALL TAGS
const getAllTags = () =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/tags`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });

// GET TAGS FROM SINGLE USER
const getSingleUserTags = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/tags?uid=${uid}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });

// GET A SINGLE TAG
const getSingleTag = (id) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/tags/${id}.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// CREATE TAG
const createTag = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/tags.json`, {
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

// UPDATE TAG
const updateTag = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/tags/${payload.id}.json`, {
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

// DELETE TAG
const deleteTag = (id) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/tags/${id}.json`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

export { getSingleUserTags, getAllTags, createTag, getSingleTag, deleteTag, updateTag };
