import React, { useState } from 'react';
import styles from './Carltem.scss';
import { withRouter, useRouter } from 'next/router';

const CarItem = ({ name, id, onClick, active }) => {
  const router = useRouter();

  return (
    <div
      id={id}
      name={name}
      onClick={onClick}
      className={
        active ? styles.selected_carItem_container : styles.carItem_container
      }>
      {name}
    </div>
  );
};

export default CarItem;
