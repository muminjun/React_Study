# React_Study

## 0
### HTML
  - 웹사이트의 뼈대를 구성하기 위해 사용하는 마크업 언어
  - 태그<> 를 사용하여 웹사이트 구조를 만듦
### CSS
  - 웹사이트의 레이아웃과 글골, 색상 등의 디자인을 입히는 역할을 하는 언어
### JS
  - 웹 페이지에서 동적인 부분을 구현하기 위한 스크립트 언어

## 1
### 리액트란?
  - 사용자 인터페이스를 만들기 위한 JS 라이브러리
  - SPA(Single Page Application)를 쉽고 빠르게 만들 수 있도록 해 주는 도구
### 리액트 장점
  - 빠른 업데이트와 렌더링 속도
    - Virtual DOM 사용
      - Virtual DOM = 가상의 DOM(Document Object Model) = 웹 페이지를 정의하는 하나의 객체 = 하나의 웹 사이트에 대한 정보를 모두 담고있는 큰 그릇
    - 화면이 업데이트 될 때 마다 DOM을 직접 수정하지 않고, Virtual DOM에서 업데이트해야 할 최소한의 부분만 찾아서 검색 후 업데이트하고, 렌더링한다.
  - 재사용성의 높은 컴포넌트 기반구조
    - 작은 레고 블록들이 모여 하나의 완성된 모형이 되는 것
    - 재사용성(Reusability) = 다시 사용이 가능한 성질
      - 개발기간 단축
      - 유지보수 용이
    - 다른 모듈과의 의존성을 낮추고 호환성 문제가 발생하지 않도록 개발해야함
  - 메타의 든든한 지원
  - 활발한 지식 공유와 커뮤니티
  - 리액트 네이티브를 통한 모바일 앱 개발 가능
### 리액트 단점
  - 방대한 학습량
  - 높은 상태관리 복잡도

## 2
### chapter03

## 3
### JSX
  - JS와 XML, HTML을 함께 사용할 수 있는 JS 확장 문법'
  ```jsx
  const element = <h1>Hello, React!</h1>
  ```
    - h1태그로 둘러싸인 문자열을 element 변수에 저장하는 것
### JSX의 역할
  - JSX로 작성된 코드는 모두 JS코드로 변환
- 리액트는 JSX코드 모두 createElement() 함수를 사용하는 코드로 변환
  ```jsx
  - React.createElement(
    type,
    [props],
    [...children]
  )
  ```
### JSX 장점
  - 코드가 간결해짐
  - 가독성 향상
### HTML 태그 중간이 아닌 태그의 속성에 값을 넣고 싶을 때
  - 큰 따옴표 사이에 문자열 넣기
  ```jsx
  const element = <div tabIndex="0"></div>
  ```
  - 중괄호 사이에 자바스크립트 코드 넣기
    ```jsx
  const element = <img src={user.avatarUrl}></img>
  ```
  - JSX에서 중괄호를 사용하면 무조건 JS코드가 들어감
  
## 4
### 엘리먼트
  - Element(요소, 성분)
    - 리액트 앱의 가장 작은 블록들
    - 화면에 나타나는 내용을 기술하는 JS객체
    - 리액트 엘리먼트는 DOM 엘리먼트의 가상 표현
    ```jsx
    - React.createElement(
      type,
      [props],
      [...children]
    )
    ```
      - type
        - HTML 태그이름이 문자열로 들어가거나 또 다른 리액트 컴포넌트가 들어감
      - props
        - 엘리먼트의 속성
      - children
        - 해당 엘리먼트의 자식 엘리먼트
  - 생김새
    - 엘리먼트는 JS객체 형태로 존재
    - 컴포넌트 유형과 속성 및 내부의 모든 지식에 대한 정보를 포함하고 있는 일반적인 JS객채
  - 특징
    - 불변성
    - 생성 후에는 자식이나 속성을 바꿀 수 없음
  - Element 렌더링
    ```jsx
    <div id="root"></div>
    ```
      - root DOM node
      - div 태그 안에 리액트 엘리먼트들이 렌더링됨
    - 렌더링을 위해 ReactDOM의 createRoot() 함수로 만든 render() 함수 사용
      - 리액트 엘리먼트를 HTML 엘리먼트에 렌더링하는 역할
        ```jsx
        const element = <h1>안녕, 리액트</h1>
        const root = ReactDOM.createRoot(document.getElementById('root'))
        root.render(element)
        ```
      - 엘리먼트를 하나 생성하고 생성된 엘리먼트를 root div에 렌더링
      - 리액트의 엘리먼트와 HTML의 엘리먼트는 다른 개념
        - 리액트의 엘리먼트
          - Virtual DOM에 존재
        - HTML 엘리먼트
          - 실제 브라우저의 DOM에 존재
        - 리액트의 엘리먼트가 렌더링되는 과정 = Virtual DOM 에서 실제 DOM으로 이동하는 과정
    - 렌더링되는 과정은 Virtual DOM에서 실제 DOM으로 이동하는 과정
  - 렌더링된 엘리먼트 업데이트
    - 엘리먼트는 한 번 생성되면 바꿀 수 없기 때문에 엘리먼트를 업데이트하기 위해서는 다시 생성해야 함
    - 기존 엘리먼트를 변경하는 것이 아닌 새로운 엘리먼트를 생성해서 바꿔치기 하는 것