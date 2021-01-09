import React, { Fragment, useState } from "react";
import styles from "./Modal.scss";
import useStore from "../../stores";
import { useObserver } from "mobx-react";

const { modalStore, filterStore } = useStore();

export default function Modal({
	termButton,
	stateButton,
	handleApplicationButton,
	handleResetButton
}) {
	const [terms, setTerms] = useState([
		{ id: 1, value: "1개월" },
		{ id: 2, value: "3개월" },
		{ id: 3, value: "지난달" },
		{ id: 4, value: "직접입력" }
	]);
	const [states, setStates] = useState([
		{ id: 1, state: "요청중" },
		{ id: 2, state: "예약확정" },
		{ id: 3, state: "배차중" },
		{ id: 4, state: "반납완료" },
		{ id: 5, state: "요청취소" }
	]);

	return useObserver(() => (
		<Fragment>
			<div className={styles.container}>
				<div className={styles.modal_container}>
					<div className={styles.title_container}>
						<div className={styles.title}>필터설정</div>
						<div
							className={styles.modal_close}
							onClick={() => modalStore.setOpenModal(false)}
						>
							<img
								src="/ic-close.png"
								srcSet="/ic-close@2x.png 2x,
						 /ic-close@3x.png 3x"
							/>
						</div>
					</div>
					<div className={styles.contents_container}>
						<div className={styles.request_view}>요청 기간 조회</div>
						<div className={styles.button_container}>
							{terms.map((term) => {
								const active = filterStore.selectedTermId == term.id;
								return (
									<input
										key={term.id}
										id={term.id}
										type="button"
										value={term.value}
										className={
											active ? styles.activate_filter_btn : styles.filter_btn
										}
										onClick={(e) => termButton(e)}
									/>
								);
							})}
						</div>
						<div className={styles.request_view}>요청 상태</div>
						<div className={styles.button_container}>
							{states.map((state) => {
								const active = filterStore.selectedStateValue == state.state;
								return (
									<input
										key={state.id}
										id={state.id}
										type="button"
										value={state.state}
										className={
											active ? styles.activate_filter_btn : styles.filter_btn
										}
										onClick={(e) => stateButton(e)}
									/>
								);
							})}
						</div>
						<input
							type="button"
							value="초기화"
							className={styles.reset_button}
							onClick={() => {
								handleResetButton();
							}}
						/>
						<input
							type="button"
							value="적용"
							className={styles.application_button}
							onClick={() => {
								handleApplicationButton();
							}}
						/>
					</div>
				</div>
			</div>
		</Fragment>
	));
}
