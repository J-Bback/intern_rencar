import _ from "lodash";

const carRequestList = [
	{
		id: 1,
		brand: "레인지로버 디스커버리",
		number: "123가 4567",
		status: "요청중",
		requestDate: "20.11.12 11:00",
		dispatchDate: null,
		returnDate: null,
		requestNumber: 14523
	},
	{
		id: 2,
		brand: "벤츠 C클래스",
		number: "494나 1894",
		status: "예약확정",
		requestDate: "20.12.06 09:15",
		dispatchDate: "20.12.06 09:23",
		returnDate: null,
		requestNumber: 14511
	},
	{
		id: 3,
		brand: "쏘렌토",
		number: "493다 1833",
		status: "반납완료",
		requestDate: "20.12.25 11:17",
		dispatchDate: "20.12.25 11:56",
		returnDate: "20.12.28 10:38",
		requestNumber: 14488
	},
	{
		id: 4,
		brand: "카니발",
		number: "923라 9548",
		status: "취소",
		requestDate: "21.01.04 07:00",
		dispatchDate: null,
		returnDate: null,
		requestNumber: 14465
	}
];

export default async (req, res) => {
	return (res.statusCode = 200), res.json(carRequestList);
};
