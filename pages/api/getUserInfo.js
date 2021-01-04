import _ from 'lodash';

const userList = [
  { name: '김범준', title: '이사', age: 37, gender: 'male' },
  { name: '권도윤', title: '차장', age: 30, gender: 'female' },
  { name: '정준호', title: '차장', age: 33, gender: 'male' },
];

function findUser(name) {
  const result = _.find(userList, { name });
  return result;
}

export default async (req, res) => {
  res.statusCode = 200;
  res.json({ userInfo: result });
};
