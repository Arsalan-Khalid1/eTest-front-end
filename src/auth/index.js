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

export const signout = next => {
  if (typeof window !== 'undefined') {
    isAuthenticated ();
    return fetch (`${API}/signout`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then (response => {
        localStorage.removeItem ('JWT');
        next ();
        return response.json ();
      })
      .catch (err => {
        console.log (err);
      });
  }
};

export const isAuthenticated = () => {
  if (typeof window == 'undefined') {
    return false;
  }
  if (localStorage.getItem ('JWT')) {
    return JSON.parse (localStorage.getItem ('JWT'));
  } else {
    return false;
  }
};
