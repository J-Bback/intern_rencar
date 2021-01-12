import React, { useState, Fragment } from "react";
import styles from "./index.scss";
import Search from "./Search";
import RequestList from "./RequestList";
import Footer from "../../compnents/Footer/Footer";
import Modal from "./Modal";
import useStore from "../../stores";
import { TITLE } from "../../constants/RequestList/Title";
import axios from "axios";
import { useObserver } from "mobx-react";
import { SERVER_URI } from "../../config";

const { modalStore } = useStore();
const { filterStore } = useStore();

const index = ({ data, lists }) => {
	const [requestList, setRequestList] = useState(lists);
	const [filteredStateList, setFilteredStateList] = useState([]);
	const [filteredTermList, setFilteredTermList] = useState([]);

	const handleSearch = (e) => {
		const filteredList = requestList.filter((list) => {
			const brandFilter = list.car_brand
				.toLowerCase()
				.includes(e.target.value?.toLowerCase());
			const modelFilter = list.car_model
				.toLowerCase()
				.includes(e.target.value?.toLowerCase());
			return brandFilter || modelFilter;
		});
		// console.log(filteredList);
		e.target.value ? setRequestList(filteredList) : setRequestList(lists);
	};

	const handleFilterBtn = () => {
		modalStore.setOpenModal(true);
		setRequestList(lists);
	};

	const handleTermFilter = (e) => {
		filterStore.setSelectedTermId(e.target.id);
		const now1 = new Date();
		const oneMonthAgo = new Date(now1.setMonth(now1.getMonth() - 1)).getTime();
		const now2 = new Date();
		const threeMonthAgo = new Date(
			now2.setMonth(now2.getMonth() - 3)
		).getTime();
		const now3 = new Date();
		const lastMonth = new Date(now3.setMonth(now3.getMonth() - 1));
		const year = lastMonth.getFullYear();
		const month = lastMonth.getMonth() + 1;
		const filteredList = requestList.filter((list) => {
			const requestTime = new Date("20" + list.created_at).getTime();
			if (e.target.id == 1) return requestTime > oneMonthAgo;
			if (e.target.id == 2) return requestTime > threeMonthAgo;
			if (e.target.id == 3) {
				const requestYear = "20" + list.created_at.split("-")[0];
				const requestMonth = list.created_at.split("-")[1];
				const lastMonthMonth = month < 10 ? "0" + month : month;
				return year == requestYear && lastMonthMonth == requestMonth;
			}
		});
		setFilteredTermList(filteredList ? filteredList : null);
	};

	const handleStateFilter = (e) => {
		const stateValue = e?.target.value;
		filterStore.setSelectedStateValue(stateValue);
		const filteredList = requestList.filter((list) => {
			const status = {
				0: "요청중",
				1: "예약확정",
				2: "배차중",
				3: "반납완료",
				4: "취소"
			};
			return stateValue == status[list.status];
		});
		setFilteredStateList(filteredList);
	};

	// 각각의 필터에는 잘 담긴다.
	// console.log(lists);
	// console.log(requestList);
	// console.log(filteredTermList);
	// console.log(filteredStateList);

	const handleFilterApplication = () => {
		const res = filteredTermList
			.filter((termList) => filteredStateList.includes(termList))
			.concat(
				filteredStateList.filter((stateList) =>
					filteredTermList.includes(stateList)
				)
			);
		console.log(res);

		setRequestList(res);
		modalStore.setOpenModal(false);
	};

	const handleFilterReset = () => {
		setRequestList(lists);
		modalStore.setOpenModal(false);
	};

	return useObserver(() => (
		<Fragment>
			<div
				className={styles.container}
				style={
					modalStore.openModal == true ? { opacity: "40%" } : { opacity: 1 }
				}
			>
				<div className={styles.title}>{TITLE}</div>
				<Search
					requestData={requestList}
					handleSearch={(e) => handleSearch(e)}
					handleFilterBtn={handleFilterBtn}
				/>
				<RequestList requestData={requestList} />
			</div>
			{modalStore.openModal ? (
				<Modal
					requestList={requestList}
					termButton={(e) => handleTermFilter(e)}
					stateButton={(e) => handleStateFilter(e)}
					handleApplicationButton={() => handleFilterApplication()}
					handleResetButton={() => handleFilterReset()}
				/>
			) : (
				""
			)}
			<Footer />
			{/* <div style={{ backgroundColor: "#f7f8fa", padding: 0, height: "55px" }} /> */}
		</Fragment>
	));
};

// export async function getServerSideProps() {
// 	const res = await axios.get("http://localhost:5800/api/requestListData");
// 	const data = res.data;

// 	return {
// 		props: {
// 			data
// 		}
// 	};
// }

export async function getServerSideProps(context) {
	const { id } = context.query;
	const res = await axios.get(`${SERVER_URL}/rencar/request`);
	const lists = await res.data.requests;

	return {
		props: { lists }
	};
}

export default index;
