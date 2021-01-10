import React from 'react';
import styles from './requestButton.scss';

export default function requestButton({
  onClick,
  value,
  carNumber,
  clientContact,
  region,
  isComplete,
  carBrand,
  carModel,
}) {
  const condition = carNumber && clientContact && region;

  return (
    <div
      className={
        condition || isComplete ? styles.active : styles.button_Container
      }
      onClick={onClick}>
      <input type='button' value={value} alt='button' />
    </div>
  );
}
