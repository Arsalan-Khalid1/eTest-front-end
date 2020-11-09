import React, {useState} from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth/index';
import {Link} from 'react-router-dom';
import {addCategory} from './apiAdmin';

function AddCatedgory () {
  const [name, setName] = useState ('');
  const [error, setError] = useState ('');
  const [success, setSuccess] = useState ('');

  const {user, token} = isAuthenticated ();

  const handleChange = e => {
    setError ('');
    setName (e.target.value);
  };

  const clickSubmit = e => {
    e.preventDefault ();
    setError ('');
    setSuccess (false);
    addCategory (user._id, token, {name}).then (data => {
      if (data.error) {
        setError (data.error);
      } else {
        setError ('');
        setSuccess (true);
        setName ('');
      }
    });
  };

  const goBack = () => {
    return (
      <div className="mt-5">
        <Link to="/admin/dashboard" className="text-warning">
          Back to Dashboard
        </Link>
      </div>
    );
  };

  const showSuccess = () => {
    if (success) {
      return <h3 className="text-success">{name} is created</h3>;
    }
  };
  const showError = () => {
    if (error) {
      return <h3 className="text-danger">Category should be unique</h3>;
    }
  };

  const newCategoryForm = () => {
    return (
      <form onSubmit={clickSubmit}>
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input
            className="form-control"
            onChange={handleChange}
            value={name}
            autoFocus
          />
          <button className="btn btn-outline-primary my-2">
            Create Category
          </button>
        </div>
      </form>
    );
  };

  return (
    <Layout
      title="Add a new category"
      description="Welcome Admin, ready to add a new category"
    >
      <div className="col-md-8 offset-md-2">
        {showError ()}
        {showSuccess ()}
        {newCategoryForm ()}
        {goBack ()}
      </div>
    </Layout>
  );
}

export default AddCatedgory;
