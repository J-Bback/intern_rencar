import React from 'react';
import styles from './UserInput.scss';

const UserInput = ({ id, label, type, value, placeholder, name, onChange }) => {
  return (
    <div className={styles.input_wrap}>
      <label htmlFor={id ? id : null} children={label} />
      <input
        id={id ? id : null}
        name={name ? name : null}
        type={type ? type : 'text'}
        onChange={onChange}
        value={value ? value : null}
        placeholder={placeholder}
        autoComplete='off'
      />
    </div>
  );
};

export default UserInput;
