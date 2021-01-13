import React, { useState, Fragment } from "react";
import { useRouter } from "next/router";
import styles from "./RequestList.scss";
import {
	REQUEST_DATE,
	DISPATCH_DATE,
	RETURN_DATE
} from "../../constants/RequestList/RequestList";

export default function RequestList({ requestData }) {
	console.log(requestData);
	const router = useRouter();
	return (
		<Fragment>
			{requestData?.map((list) => {
				const status = {
					0: "요청중",
					1: "예약확정",
					2: "배차중",
					3: "반납완료",
					4: "취소"
				};
				const statusColor = {
					0: { color: "#1877f2" },
					1: { color: "#333333" },
					2: { color: "#333333" },
					3: { color: "#333333" },
					4: { color: "#f84b4b" }
				};
				// router.push(`/user/request/${id}`)
				return (
					<Fragment>
						<div
							style={{ backgroundColor: "#f7f8fa", padding: 0, height: "11px" }}
						/>
						<div
							className={styles.container}
							onClick={(e) => router.push(`/user/request/${list.id}`)}
						>
							<div className={styles.request_list_box}>
								<div className={styles.car_data_container}>
									<p className={styles.car_info}>
										{list?.car_brand.length + list?.car_model.length > 20
											? list.car_brand + " " + list.car_model.split(" ")[0]
											: list.car_brand + " " + list.car_model}{" "}
										/ {list?.car_number}
									</p>
									<input
										className={styles.status_button}
										type="button"
										value={status[list?.status]}
										style={statusColor[list?.status]}
									/>
								</div>
								
								<div className={styles.request_date}>
									{REQUEST_DATE}
									<p className={styles.request_real_time}>
										{list?.created_at ? list?.created_at : "-"}
									</p>
								</div>
								<div className={styles.request_date}>
									{DISPATCH_DATE}
									<p className={styles.request_real_time}>
										{list?.drive_date ? list?.drive_date : "-"}
									</p>
								</div>
								<div className={styles.request_date}>
									{RETURN_DATE}
									<p className={styles.request_real_time}>
										{list?.checkout_date ? list?.checkout_date : "-"}
									</p>
									<p className={styles.request_number}>{list?.id}</p>
								</div>
							</div>
						</div>
					</Fragment>
				);
			})}
		</Fragment>
	);
}
