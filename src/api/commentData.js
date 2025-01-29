import { clientCredentials } from '../utils/client';

const dbURL = clientCredentials.databaseURL;

const getComment = () =>
  new Promise((resolve, reject) => {
    fetch(`${dbURL}/comments`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          resolve(Object.values(data));
        } else {
          resolve([]);
        }
      })
      .catch(reject);
  });

const createComment = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${dbURL}/comments`, {
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const updateComment = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${dbURL}/comments/${payload.id}`, {
      method: 'PATCH',
      header: {
        'Content-Type': 'application/json',
      },
      body: JSON.string(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const deleteComment = (id) =>
  new Promise((resolve, reject) => {
    fetch(`${dbURL}/comments/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

export { createComment, getComment, updateComment, deleteComment };
