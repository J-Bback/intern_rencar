import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "./Footer.scss";
export default function Footer() {
	const [homeBtnOn, setHomeBtnOn] = useState(true);
	const [bellBtnOn, setBellBtnOn] = useState(false);
	const [callListBtnOn, setCallListBtnOn] = useState(false);
	const [myPageBtnOn, setMyPageBtnOn] = useState(false);

	const router = useRouter();
	const handleBtn = (e) => {
		if (e.target.id == 0) {
			return router.push("/user");
		}
		if (e.target.id == 1) {
			return (
				setHomeBtnOn(true),
				setBellBtnOn(false),
				setCallListBtnOn(false),
				setMyPageBtnOn(false),
				router.push("/user/request")
			);
		}
		if (e.target.id == 2) {
			return (
				setHomeBtnOn(false),
				setBellBtnOn(true),
				setCallListBtnOn(false),
				setMyPageBtnOn(false)
				// router.push("/user/request")
			);
		}
		if (e.target.id == 3) {
			return (
				setHomeBtnOn(false),
				setBellBtnOn(false),
				setCallListBtnOn(true),
				setMyPageBtnOn(false),
				router.push("/requestList")
			);
		}
		if (e.target.id == 4) {
			return (
				setHomeBtnOn(false),
				setBellBtnOn(false),
				setCallListBtnOn(false),
				setMyPageBtnOn(true)
				// router.push("/user/request")
			);
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.footer_wrap}>
				<div
					style={{ backgroundColor: "#f7f8fa", padding: 0, height: "20px" }}
				/>
				<img
					src="/path.png"
					srcSet="/path@2x.png 2x,
					   /path@3x.png 3x"
					// className={styles.path}
				/>
				<div
					id={1}
					className={styles.home_container}
					onClick={(e) => handleBtn(e)}
				>
					{homeBtnOn ? (
						<img
							id={1}
							src="/ic-home-on.png"
							srcSet="/ic-home-on@2x.png 2x,
             /ic-home-on@3x.png 3x"
							className={styles.home_image}
						/>
					) : (
						<img
							id={1}
							src="/ic-home-normal.png"
							srcSet="/ic-home-normal@2x.png 2x,
             /ic-home-normal@3x.png 3x"
							className={styles.home_image}
						/>
					)}
					<div id={1} className={styles.home}>
						홈
					</div>
				</div>
				<div
					id={2}
					className={styles.bell_container}
					onClick={(e) => handleBtn(e)}
				>
					{bellBtnOn ? (
						<img
							id={2}
							src="/ic-bell-on.png"
							srcSet="/ic-bell-on@2x.png 2x,
														/ic-bell-on@3x.png 3x"
							className={styles.bell_image}
						/>
					) : (
						<img
							id={2}
							src="/ic-bell-normal.png"
							srcSet="/ic-bell-normal@2x.png 2x,
										/ic-bell-normal@3x.png 3x"
							className={styles.bell_image}
						/>
					)}
					<div id={2} className={styles.bell}>
						알림
					</div>
				</div>

				<div
					id={0}
					className={styles.call_container}
					onClick={(e) => handleBtn(e)}
				>
					<img
						id={0}
						src="/ic-plus-submit.png"
						srcSet="/ic-plus-submit@2x.png 2x,
										/ic-plus-submit@3x.png 3x"
						className={styles.call_image}
					/>
					<div id={0} className={styles.call}>
						요청하기
					</div>
				</div>

				<div
					id={3}
					className={styles.call_list_container}
					onClick={(e) => handleBtn(e)}
				>
					{callListBtnOn ? (
						<img
							id={3}
							src="/ic-calllist-on.png"
							srcSset="/ic-calllist-on@2x.png 2x,
										/ic-calllist-on@3x.png 3x"
							className={styles.call_list_image}
						/>
					) : (
						<img
							id={3}
							src="/ic-calllist-normal.png"
							srcSset="/ic-calllist-normal@2x.png 2x,
										/ic-calllist-normal@3x.png 3x"
							className={styles.call_list_image}
						/>
					)}
					<div id={3} className={styles.call_list}>
						요청목록
					</div>
				</div>
				<div
					id={4}
					className={styles.mypage_container}
					onClick={(e) => handleBtn(e)}
				>
					{myPageBtnOn ? (
						<img
							id={4}
							src="/ic-mypage-on.png"
							srcSet="/ic-mypage-on@2x.png 2x,
										/ic-mypage-on@3x.png 3x"
							className={styles.mypage_image}
						/>
					) : (
						<img
							id={4}
							src="/ic-mypage-normal.png"
							srcSet="/ic-mypage-normal@2x.png 2x,
										/ic-mypage-normal@3x.png 3x"
							className={styles.mypage_image}
						/>
					)}
					<div id={4} className={styles.mypage}>
						마이페이지
					</div>
				</div>
			</div>
		</div>
	);
}
