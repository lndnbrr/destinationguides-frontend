import { clientCredentials } from '../utils/client';

const dbURL = clientCredentials.databaseURL;

const getCategories = () =>
  new Promise((resolve, reject) => {
    fetch(`${dbURL}/categories`, {
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

export default getCategories;
