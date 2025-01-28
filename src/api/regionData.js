const dbURL = 'http://localhost:8000';

const getRegion = () =>
  new Promise((resolve, reject) => {
    fetch(`${dbURL}/regions`, {
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

const createRegion = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${dbURL}/regions`, {
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

const updateRegion = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${dbURL}/regions/${payload.id}`, {
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

const deleteRegion = (id) =>
  new Promise((resolve, reject) => {
    fetch(`${dbURL}/regions/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

export { createRegion, getRegion, updateRegion, deleteRegion };
