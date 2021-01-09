import React, { useState, Component } from "react";
import styles from "./Search.scss";
import apiUser from "../../api/User";
import axios from "axios";
import useStore from "../../stores";
import { withRouter, useRouter } from "next/router";
import { useObserver } from "mobx-react";

const { modalStore } = useStore();

const Search = ({ handleFilterBtn, handleSearch, requestData }) => {
	const [getData, setGetData] = useState(null);
	const [brand, setBrand] = useState(null);
	const [openModal, setOpenModal] = useState(false);

	const submit = async () => {
		const data = { brand: brand };
		// console.log(brand.target.value);
		const response = await apiUser.getCarInfo(data);
		const responseData = response.data;
		// console.log(">>>>>>", responseData);
		setGetData(responseData.carRequestList);
	};

	return useObserver(() => (
		<form onSubmit={() => submit} className={styles.search_container}>
			<input
				id="brand"
				className={styles.search}
				type="text"
				onChange={(e) => {
					handleSearch(e);
				}}
				// value={brand}
			/>
			<img
				onClick={submit}
				src="/ic-signup-search.png"
				srcSet="/ic-signup-search@2x.png 2x,
             /ic-signup-search@3x.png 3x"
				className={styles.search_image}
			/>
			<img
				onClick={() => handleFilterBtn()}
				src="/ic-filter.png"
				srcSet="/ic-filter@2x.png 2x,
             /ic-filter@3x.png 3x"
				className={styles.filter}
			></img>
		</form>
	));
};

export default Search;
