import React, { Fragment } from 'react';
import styles from './SelectInput.scss';

const SelectInput = ({
  id,
  label,
  type,
  value,
  placeholder,
  image,
  onClick,
}) => {
  return (
    <div className={styles.input_wrap}>
      <label htmlFor={id ? id : null} children={label} />
      <input
        id={id ? id : null}
        type={type ? type : 'text'}
        value={value ? value : ''}
        onClick={onClick}
        placeholder={placeholder}
        autoComplete='off'
      />
      {image ? (
        <div className={styles.arrow_wrap}>
          <img
            src='/ic-mypage-arrow.png'
            srcSet='/ic-mypage-arrow@2x.png, /ic-mypage-arrow@3x.png'
            className={styles.arrow}
          />
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default SelectInput;
