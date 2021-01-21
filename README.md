# 프로젝트 영상

[프로젝트 전체 영상](https://www.youtube.com/watch?v=cXahjdDukDs&t=310s)

# 프로젝트 요약

#### 1) 소개

- 렌카는 렌터카 중개 O2O 서비스 플랫폼 개발 및 공급사업을 하는 기업입니다. 렌터카를 요청하는 렌카 앱웹과 렌터카를 제공하는 IMS 앱웹을 개발하는 프로젝트를 진행하였습니다.

- 주로 보험사 직원이 사용하는 요청자 웹앱(동영상 오른쪽)에서 요청을 하면 주로 렌터카 업체에서 사용하는 제안 웹앱(동영상 왼쪽) 목록에 요청이 뜨고 제안을 하면 요청자가 선택하여 1:1 매칭해주는 플랫폼입니다. 요청부터 반납까지 비즈니스 로직에 따라 서버와 통신하며 프로젝트를 진행하였습니다.
 

#### 2) 기간

- 20.12.14 ~ 20.01.15 (5주)


#### 3) 인원

- 프론트엔드 3명, 백엔드 2명

 

#### 4) 역할

- 프론트엔드


# 사용 스택


### 프론트 엔드

1) Next.js(함수형, 클래스형)
2) Mobx
3) Sass
4) Socket.io


### 백엔드

1) Flask
2) Database Modeling (AQueryTool)
3) AWS


### 공통

1) Git / Github / Git-flow
3) Slack
4) Notion

# 프로젝트에서 수행한 역할

## ✍️ 요청자 앱

### 0) 로그인 페이지


![](https://images.velog.io/images/dongha1992/post/5a1ad447-b126-4ba3-aed7-598b387bb6ff/rencar_%E1%84%85%E1%85%A9%E1%84%80%E1%85%B3%E1%84%8B%E1%85%B5%E1%86%AB.gif)

   - 서버에서 발행한 JWT를 Cookie에 저장 및 인증/인가 구현

### 1) 요청하기

![](https://images.velog.io/images/dongha1992/post/73984540-0832-4ae2-aa72-633bae7c77ef/rencar_%E1%84%8B%E1%85%AD%E1%84%8E%E1%85%A5%E1%86%BC.gif)

-Mobx에 stat를 관리하고 POST로 서버로 데이터 전달 

### 2) 요청 목록 페이지

**요청하기 완료 시 제안이 없을 때**

![](https://images.velog.io/images/dongha1992/post/b3ccca97-ee65-4ccf-823a-04e5dea54f08/rencar_%E1%84%8B%E1%85%AD%E1%84%8E%E1%85%A5%E1%86%BC%20%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6.gif)

**제안이 생성되었을 때**

![](https://images.velog.io/images/dongha1992/post/59c1831f-403e-480e-a8a4-a8ffe23ed727/rencar_%E1%84%8C%E1%85%A6%E1%84%8B%E1%85%A1%E1%86%AB%E1%84%8C%E1%85%AE%E1%86%BC.gif)

**제안을 선택했을 때**

![](https://images.velog.io/images/dongha1992/post/8c770de7-473b-43d0-a8b4-9116223b690d/rencar_%E1%84%8C%E1%85%A6%E1%84%8B%E1%85%A1%E1%86%AB%E1%84%89%E1%85%A5%E1%86%AB%E1%84%90%E1%85%A2%E1%86%A8.gif)

> 요청하기가 완료되면 요청이 제안자 쪽에 등록된다. 제안자가 제안을 하면 요청자에 제안이 생성된다. 요청자가 제안을 선택하면 제안이 등록되고 1:1 매칭이 된다. 

   - 파트너 앱에서 발생한 Request/Response에 따라 진행 상황을 표시한 UI 구현
   - getServerSideProps와 useEffect를 활용하여 서버에서 주는 status 값에 따라 다른 UI 구성
   - 파트너 앱의 제안들을 서버로부터 받아 예약 확정 기능 구현
   

#### 🦾🦾🦾  Issue & Solve  🦾🦾🦾


제안탭의 최초 상태는 "업체 제안을 기다리는 중입니다" 빈 페이지고 제안자가 제안을 넣으면 제안 카드가 나온다. 이 부분은 삼항으로 처리했다. 이제 선택을 누르면 선택된 제안에 관한 데이터가 담긴 UI 컴포넌트로 변해야 한다. 이 부분에서 문제가 생겼다. 

일단 ```채팅, 제안, 요청서, 히스토리``` 탭을 route하는 로직을 짰을 대 제안을 선택 후 UI가 한 번 더 변하는 부분을 생각하지 못했다. 

```tab.js```
![](https://images.velog.io/images/dongha1992/post/2912bd2e-3fef-42f3-afcc-9231ad838bb1/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-01-16%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%2010.53.58.png)

tab 상수를 만들어서 url키를 을 end point로 잡았다. 이렇게 tab을 짜면 선택 후 url이 달라졌을 때 다른 탭에서 제안 탭으로 돌아오는 것이 불가능해진다. 요청 후 page 전환이 아니라 모달을 이용해서 바꿔보려고 했지만 시간적 제약으로 page 전환으로 그대로 진행하였다. 

해결방법으로 조금 무식하지만 선택하기를 클릭하고 제안이 선택됐을 때 서버로부터 받은 request_id를 local storage에 저장했다. 그리고 local storage에 request_id의 유무를 분기점으로 잡고 tab 로직에 추가해주었다. 

![](https://images.velog.io/images/dongha1992/post/8db8a2b5-1d4c-466b-9938-52d0b195c208/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-01-16%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%2010.58.19.png)

이런 식으로  request_id가 현재 서버로부터 받은 requst의 id가 일치 할 때 변화될 UI인 reservation을 router로 탈 수 있게 분기점을 만들었다. 


### 3) 요청 상세 페이지


**제안자 배차 완료**

![](https://images.velog.io/images/dongha1992/post/f108dc1d-8170-4976-89dc-efc004acf54f/%E1%84%8B%E1%85%A8%E1%84%8B%E1%85%A3%E1%86%A8%E1%84%92%E1%85%AA%E1%86%A8%E1%84%8C%E1%85%A5%E1%86%BC2.gif)

**제안자 배차 포기**

![](https://images.velog.io/images/dongha1992/post/f048527e-4b47-41f2-8250-e52e3abe3bbe/%E1%84%87%E1%85%A2%E1%84%8E%E1%85%A1%E1%84%91%E1%85%A9%E1%84%80%E1%85%B5.gif)


**제안자 반납 완료**

![](https://images.velog.io/images/dongha1992/post/073bff1c-d60d-4183-bcb8-192c16eb5f36/%E1%84%87%E1%85%A1%E1%86%AB%E1%84%82%E1%85%A1%E1%86%B8%E1%84%8B%E1%85%AA%E1%86%AB%E1%84%85%E1%85%AD.gif)

   - Socket.io를 활용해 TCP통신 구현
   - 제안 → 예약 확정 → 배차 → 반납 flow를 파트너 앱과 동시 다발적으로 송수신 가능
   

#### 🦾🦾🦾  Issue & Solve  🦾🦾🦾


```요청중, 예약확정, 배차중, 반납완료```의 순으로 제안자와 요청자가 이벤트를 만들 때마다 UI가 달라져야 한다. 처음에는 모든 조합을 하나의 객체로 만들어서 객체를 바꿔주는 식으로 어렵게 접근했는데 생각보다 쉬웠다. 먼저 4단계로 컴포넌트를 만든다.

![](https://images.velog.io/images/dongha1992/post/8214c1a0-2c68-4d82-a08b-1eb367ad31da/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-01-16%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%2011.01.55.png)

그리고 status 값을 키값으로 주고 

![](https://images.velog.io/images/dongha1992/post/b59e9b2d-320c-4aa2-8451-1eb4a0ef02cf/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-01-16%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%2011.02.42.png)

props로 받은 status 값만 넣어주면 변화한다! 여기서 더 응용하면 

![](https://images.velog.io/images/dongha1992/post/b61db455-3324-4bc0-b1a0-3e83b8e19bd7/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-01-16%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%2011.03.23.png)

이런 식으로 조건에 따라 UI가 계속 달라질 때 경우의 수를 객체로 만들 수 있다. 
