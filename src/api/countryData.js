import { clientCredentials } from '../utils/client';

const dbURL = clientCredentials.databaseURL;

const getCountry = () =>
  new Promise((resolve, reject) => {
    fetch(`${dbURL}/countries`, {
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

const getCountryByRegion = (country) =>
  new Promise((resolve, reject) => {
    fetch(`${dbURL}/countries?region=${country}`, {
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

const getSingleCountry = (id) =>
  new Promise((resolve, reject) => {
    fetch(`${dbURL}/countries/${id}`, {
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

const createCountry = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${dbURL}/countries`, {
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

const updateCountry = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${dbURL}/countries/${payload.id}`, {
      method: 'PUT',
      header: {
        'Content-Type': 'application/json',
      },
      body: JSON.string(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const deleteCountry = (id) =>
  new Promise((resolve, reject) => {
    fetch(`${dbURL}/countries/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

export { createCountry, getSingleCountry, getCountry, getCountryByRegion, updateCountry, deleteCountry };
