import { Fragment } from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <Fragment>
      <Link href="/user/register">
        회원가입
      </Link>
      /
      <Link href="/user/info">
        유저정보
      </Link>
    </Fragment>
  )
}
