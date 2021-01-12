import React, { Component, useState, useEffect } from 'react';
import styles from './Proposal.scss';
import useStore from '../../../stores';
import { useRouter } from 'next/router';
import { useObserver } from 'mobx-react';
import { SERVER_URL } from '../../../config';

import {
  PROPOSAL_HEADER,
  PROPOSAL_FOOTER,
} from '../../../constants/ProposalInfo';
import axios from 'axios';
import CompanyItem from './CompanyItem';
import CarItem from './CarItem';

const SelectBrand = ({}) => {
  const router = useRouter();
  const { SelectedCarStore } = useStore();
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedCar, setSelectedCar] = useState('');
  const [isActive, setIsActive] = useState(false);

  const isValid =
    SelectedCarStore.selectedCarBrand !== '' &&
    SelectedCarStore.selectedCarName !== '';

  const getData = () => {
    axios.get(`${SERVER_URL}/car`).then((res) => {
      const data = res.data.data;
      setSelectedCompany(data);
    });
  };

  const getSelectedCar = (brand) => {
    axios.get(`${SERVER_URL}/car?brand=${brand}`).then((res) => {
      const { data } = res.data;
      setSelectedCar(data);
    });
  };

  useEffect(() => {
    if (selectedCompany.length === 0) {
      getData();
    }
  }, [selectedCompany]);

  const CompanyList = selectedCompany.map((list) => {
    const active = SelectedCarStore.selectedCarBrand == list.brand;
    return (
      <CompanyItem
        name={list.brand}
        id={list.id}
        onClick={() => {
          getSelectedCar(list.brand);
          SelectedCarStore.setSelectedCarBrand(list.brand);
        }}
        key={list.id}
        active={active}
      />
    );
  });

  const CarList = selectedCar.map((list) => {
    const active = SelectedCarStore.selectedCarName == list.model;
    return (
      <CarItem
        name={list.model}
        id={list.id}
        onClick={() => {
          SelectedCarStore.setSelectedCarName(list.model);
          SelectedCarStore.setSelectedCarId(list.id);
          setIsActive(!isActive);
        }}
        key={list.id}
        active={active}
      />
    );
  });

  return useObserver(() => (
    <div className={styles.proposal_container}>
      <div className={styles.proposal_header}>
        <img
          src='/nav-ico-back.png'
          srcSet='/nav-ico-back@2x.png 2x, /nav-ico-back@3x.png 3x'
          onClick={() => {
            router.back();
          }}
        />
        {PROPOSAL_HEADER}
      </div>
      <div className={styles.main_proposal_wrap}>
        <div className={styles.companies_list}>{CompanyList}</div>
        <div className={styles.cars_list}>{CarList}</div>
      </div>

      <div
        className={
          isValid ? styles.active_proposal_footer : styles.proposal_footer
        }
        onClick={() => {
          router.push('/user');
        }}>
        {PROPOSAL_FOOTER}
      </div>
    </div>
  ));
};

export default SelectBrand;
