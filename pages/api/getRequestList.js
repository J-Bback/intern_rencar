const requestList = [
  {
    id: 1,
    name: 'wecode',
    first_car: 'apple',
    second_car: 'banana',
    additional_information: '깨끗한 차 부탁려요.',
  },
  {
    id: 2,
    name: 'rencar',
    first_car: 'orange',
    second_car: 'kiwi',
    additional_information: '담배 냄새 싫어요!',
  },
];
export default async (req, res) => {
  res.statusCode = 200;
  res.json({ requestList });
};
