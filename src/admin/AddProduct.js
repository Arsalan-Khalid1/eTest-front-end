import React, {useEffect, useState} from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth/index';
import {Link} from 'react-router-dom';
import {addProduct, getCategories} from './apiAdmin';

function AddProduct () {
  const {user, token} = isAuthenticated ();

  const [values, setValues] = useState ({
    name: '',
    description: '',
    price: '',
    categories: [],
    category: '',
    shipping: '',
    quantity: '',
    photo: '',
    loading: false,
    error: '',
    createdProduct: '',
    redirectToProfile: false,
    formData: '',
  });

  const {
    name,
    description,
    price,
    categories,
    category,
    shipping,
    quantity,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData,
  } = values;

  const init = () => {
    getCategories ().then (data => {
      if (data.error) {
        setValues ({...values, error: data.error});
      } else {
        setValues ({...values, categories: data, formData: new FormData ()});
      }
    });
  };
  useEffect (() => {
    init ();
  }, []);

  const handleChange = name => event => {
    const value = name === 'photo' ? event.target.files[0] : event.target.value;
    formData.set (name, value);
    setValues ({...values, [name]: value});
  };

  const cliclSubmit = e => {
    e.preventDefault ();
    setValues ({...values, error: '', loading: true});
    addProduct (user._id, token, formData).then (data => {
      if (data.error) {
        setValues ({...values, error: data.error});
      } else {
        setValues ({
          ...values,
          name: '',
          description: '',
          photo: '',
          price: '',
          quantity: '',
          loading: false,
          createdProduct: data.name,
        });
      }
    });
  };

  const newPostForm = () => {
    return (
      <form className="mb-3" onSubmit={cliclSubmit}>
        <h4>Post photo</h4>
        <div className="form-group">
          <label className="btn btn-secondary">
            <input
              onChange={handleChange ('photo')}
              type="file"
              name="photo"
              accept="image/*"
            />
          </label>
        </div>
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input
            type="text"
            onChange={handleChange ('name')}
            className="form-control"
            value={name}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Description</label>
          <textarea
            onChange={handleChange ('description')}
            className="form-control"
            value={description}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Price</label>
          <input
            type="number"
            onChange={handleChange ('price')}
            className="form-control"
            value={price}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Category</label>
          <select onChange={handleChange ('category')} className="form-control">
            <option>Please select</option>
            {categories &&
              categories.map ((c, i) => {
                return <option value={c._id}>{c.name}</option>;
              })}
          </select>
        </div>
        <div className="form-group">
          <label className="text-muted">Shipping</label>
          <select onChange={handleChange ('shipping')} className="form-control">
            <option>Please select</option>
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>
        </div>
        <div className="form-group">
          <label className="text-muted">Quantity</label>
          <input
            type="number"
            onChange={handleChange ('quantity')}
            className="form-control"
            value={quantity}
          />
        </div>
        <button className="btn btn-outline-primary">Create Product</button>

      </form>
    );
  };

  const showError = () => {
    return (
      <div
        className="alert alert-danger"
        style={{display: error ? '' : 'none'}}
      >
        {error}
      </div>
    );
  };
  const showSuccess = () => {
    return (
      <div
        className="alert alert-info"
        style={{display: createdProduct ? '' : 'none'}}
      >
        <h2>{`${createdProduct}`} is created!</h2>
      </div>
    );
  };

  const showLoading = () => {
    loading &&
      <div className="alert alert-info">
        <h2>uploading...</h2>
      </div>;
  };

  return (
    <Layout
      title="Add a new product"
      description="Welcome Admin, ready to add a new product"
      className="container"
    >
      <div className="col-md-8 offset-md-2">
        {showError ()}
        {showLoading ()}
        {showSuccess ()}
        {newPostForm ()}
      </div>
    </Layout>
  );
}

export default AddProduct;
