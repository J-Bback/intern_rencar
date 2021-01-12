import React, { useState, Component } from "react";
import styles from "./Search.scss";
import apiUser from "../../api/User";
import axios from "axios";
import useStore from "../../stores";
import { withRouter, useRouter } from "next/router";
import { useObserver } from "mobx-react";

const { modalStore } = useStore();

const Search = ({ handleFilterBtn, handleSearch, requestData }) => {
	const submit = async (e) => {
		console.log(e, "검색버튼");
	};

	return useObserver(() => (
		<form onSubmit={(e) => submit(e)} className={styles.search_container}>
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
