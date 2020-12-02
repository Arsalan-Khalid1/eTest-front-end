import React, {useState} from 'react';
import PropTypes from 'prop-types';

const RadioBox = ({prices, handleFilters}) => {
  const [value, setValue] = useState (0);

  const handleChange = event => {
    handleFilters (event.target.value);
    setValue (event.target.value);
  };

  return prices.map ((price, index) => (
    <div key={index}>
      <input
        className="mr-2 ml-4"
        onChange={handleChange}
        name={price}
        value={`${price._id}`}
        type="radio"
      />
      <label className="form-check-label">{price.name}</label>
    </div>
  ));
};

export default RadioBox;
