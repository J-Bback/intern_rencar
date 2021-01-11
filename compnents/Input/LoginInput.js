import React from 'react';
import styles from './LoginInput.scss';

export default function LoginInput({
  id,
  name,
  type,
  onChange,
  value,
  placeholder,
}) {
  return (
    <div className={styles.input_container}>
      <input
        id={id ? id : null}
        name={name}
        type={type ? type : 'text'}
        onChange={onChange}
        value={value ? value : ''}
        placeholder={placeholder}
        className={styles.user_input}
      />
    </div>
  );
}
