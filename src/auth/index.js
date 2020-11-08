import {API} from '../config';

export const signup = user => {
  console.log (user);
  return fetch (`${API}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify (user),
  })
    .then (response => {
      return response.json ();
    })
    .catch (error => {
      console.log (error);
    });
};

export const signin = user => {
  console.log (user);
  return fetch (`${API}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify (user),
  })
    .then (response => {
      return response.json ();
    })
    .catch (error => {
      console.log (error);
    });
};

export const authenticate = (data, next) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem ('JWT', JSON.stringify (data));
    next ();
  }
};
