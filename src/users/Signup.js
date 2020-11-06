import react, {useState} from 'react';
import {API} from '../config';
const Signup = () => {
  const [values, setValues] = useState ({
    name: '',
    email: '',
    password: '',
    error: '',
    success: false,
  });

  const {name, email, password} = values;

  const handleChange = name => event => {
    setValues ({...values, error: false, [name]: event.target.value});
  };

  const signup = (name, email, password) => {
    console.log (name, email, password);
  };
  const clickSubmit = event => {
    event.preventDefault ();
    signup (name, email, password);
  };

  const signUpForm = () => {
    return (
      <div className="container col-md-8 offset-md-2">
        <form>
          <div className="form-group">
            <label className="text-muted">Name</label>
            <input
              onChange={handleChange ('name')}
              type="text"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label className="text-muted">Email</label>
            <input
              onChange={handleChange ('email')}
              type="email"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label className="text-muted">Password</label>
            <input
              onChange={handleChange ('paswword')}
              type="password"
              className="form-control"
            />
          </div>

          <button onClick={clickSubmit} className="btn btn-primary">
            Submit
          </button>

        </form>

      </div>
    );
  };
  return (
    <div>
      {signUpForm ()}
    </div>
  );
};

export default Signup;
