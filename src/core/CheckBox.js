import React, {useState} from 'react';

const CheckBox = ({categories}) => {
  const [checked, setChecked] = useState ([]);

  const handleToggle = category => () => {
    const currCategoryId = checked.indexOf (category);
    const newCheckedCategoryId = [...checked];

    if (currCategoryId === -1) {
      newCheckedCategoryId.push (category);
    } else {
      newCheckedCategoryId.splice (currCategoryId, 1);
    }

    console.log (newCheckedCategoryId);
    setChecked (newCheckedCategoryId);
  };

  return categories.map ((category, index) => (
    <li key={index} className="list-unstyled">
      <input
        className="form-check-input"
        onChange={handleToggle (category._id)}
        value={checked.indexOf (category._id === -1)}
        type="checkbox"
      />
      <label className="form-check-label">{category.name}</label>
    </li>
  ));
};

export default CheckBox;
