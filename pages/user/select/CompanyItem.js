import React, { useState } from 'react';
import styles from './CompanyItem.scss';
import { withRouter, useRouter } from 'next/router';

const CompanyItem = ({ name, id, onClick, active }) => {
  return (
    <div
      id={id}
      name={name}
      onClick={onClick}
      className={
        active
          ? styles.selected_companyItem_container
          : styles.companyItem_container
      }>
      {name}
    </div>
  );
};

export default CompanyItem;
