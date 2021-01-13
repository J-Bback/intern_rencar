import _ from 'lodash';

const carRequestList = [
  {
    id: 1,
    brand: '레인지로버 디스커버리',
    number: '123가 4567',
    status: '요청중',
    requestDate: '21.01.04 11:00',
    dispatchDate: '21.01.04 14:00',
    returnDate: '21.01.05 11:00',
  },
  {
    id: 2,
    brand: '벤츠 C클래스',
    number: '494나 1894',
    status: '예약확정',
    requestDate: '21.01.04 11:00',
    dispatchDate: '21.01.04 14:00',
    returnDate: '21.01.05 11:00',
  },
  {
    id: 3,
    brand: '쏘렌토',
    number: '493다 1833',
    status: '반납완료',
    requestDate: '21.01.04 11:00',
    dispatchDate: '21.01.04 14:00',
    returnDate: '21.01.05 11:00',
  },
  {
    id: 4,
    brand: '카니발',
    number: '923라 9548',
    status: '취소',
    requestDate: '21.01.04 11:00',
    dispatchDate: '21.01.04 14:00',
    returnDate: '21.01.05 11:00',
  },
];

function findCar(brand) {
  const result = _.find(carRequestList, { brand });
  return result;
}

export default async (req, res) => {
  const brand = req.query.brand;
  const result = await findCar(brand);
  res.statusCode = 200;
  res.json({ carRequestList: result });
};
