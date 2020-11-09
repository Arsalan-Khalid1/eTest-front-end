import react, {useState} from 'react';
import {signin, authenticate, isAuthenticated} from '../auth/index';
import {Link, Redirect} from 'react-router-dom';

const Signin = () => {
  const [values, setValues] = useState ({
    email: '',
    password: '',
    error: '',
    loading: false,
    redirectToReferrer: false,
  });

  const {email, password, loading, error, redirectToReferrer} = values;
  const {user} = isAuthenticated ();

  const handleChange = name => event => {
    setValues ({...values, error: false, [name]: event.target.value});
  };

  const clickSubmit = event => {
    event.preventDefault ();
    setValues ({...values, error: false, loading: true});
    signin ({email, password}).then (data => {
      if (data.error) {
        setValues ({...values, error: data.error, loading: false});
      } else {
        authenticate (data, () => {
          setValues ({
            ...values,
            redirectToReferrer: true,
          });
        });
      }
    });
  };

  const signInForm = () => {
    return (
      <div className="container col-md-8 offset-md-2">
        <form>

          <div className="form-group">
            <label className="text-muted">Email</label>
            <input
              onChange={handleChange ('email')}
              type="email"
              className="form-control"
              value={email}
            />
          </div>

          <div className="form-group">
            <label className="text-muted">Password</label>
            <input
              onChange={handleChange ('password')}
              type="password"
              className="form-control"
              autoComplete="off"
              value={password}
            />
          </div>

          <button onClick={clickSubmit} className="btn btn-primary">
            Submit
          </button>

        </form>

      </div>
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

  const showLoading = () => {
    if (loading) {
      return (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      );
    }
  };

  const redirectUser = () => {
    if (redirectToReferrer) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
  };

  return (
    <div>
      {redirectUser ()}
      {showLoading ()}
      {showError ()}
      {signInForm ()}
    </div>
  );
};

export default Signin;
