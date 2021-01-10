const requestList = [
  {
    name: '회사 이름',
    first_car: '카1',
    second_car: '카2',
    additional_information: 'male',
  },
  {
    name: '회사 이름',
    first_car: '카1',
    second_car: '카2',
    additional_information: 'male',
  },
];
export default async (req, res) => {
  res.statusCode = 200;
  res.json({ requestList });
};
