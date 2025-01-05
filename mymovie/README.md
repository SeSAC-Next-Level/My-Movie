# 프로젝트 이름  
[프로젝트 이름을 여기에 작성하세요]

## 📖 소개  
[프로젝트에 대한 간단한 설명을 작성하세요. 예: "이 프로젝트는 [어떤 목적]을 위해 개발된 웹 애플리케이션입니다."]

---

## 🚀 주요 기능  
- 상영중인 영화 장르 별 분류  
- 영화 별 상세 페이지  
- 유저의 좋아요 목록

---

## 🛠️ 기술 스택  
### 프론트엔드  
- **JavaScript**  
- **React**: UI 라이브러리  
- **react-dom**: React 컴포넌트 렌더링  
- **react-router-dom**: 라우팅 관리  
- **reduxjs/toolkit**: 상태 관리  
- **react-redux**: React와 Redux 연결  

### API 연동  
- **axios**: HTTP 요청 처리  

### 데이터 저장  
- **LocalStorage**: 브라우저 데이터 저장  

### 빌드 및 패키지 관리  
- **Vite**: 빌드 도구  
- **npm**: 패키지 관리  

### 버전 관리 및 협업  
- **GitHub**: 소스 코드 버전 관리  

---

## ⚙️ 설치 및 실행  

1. **프로젝트 클론**  
   ```bash
   git clone [프로젝트의 GitHub URL]
   cd [프로젝트 폴더 이름]
   ```

2. **의존성 설치**  
   ```bash
   npm install
   ```

3. **개발 서버 실행**  
   ```bash
   npm run dev
   ```

4. **프로젝트 실행**  
   브라우저에서 `http://localhost:5173`로 접속합니다.

---

## 📂 프로젝트 구조  
[원하는 경우 디렉토리 구조를 작성하세요]  
예:  
```
src  
├── components/    # 컴포넌트  
├── pages/         # 페이지  
├── store/         # Redux 스토어  
├── utils/         # 유틸리티 함수  
└── App.js         # 메인 앱  
```

---

## 📡 TMDB API 사용 URL  

#### 1. **Base URL**  
- URL: `https://api.themoviedb.org/3`  
- 설명: 모든 API 요청의 기본 URL입니다.

#### 2. **영화 관련 API**  
- URL: `https://api.themoviedb.org/3/movie`  
- 설명: 영화 데이터를 가져오기 위한 API. 인기 영화, 영화 상세 정보 등을 요청합니다.

#### 3. **장르 코드 API**  
- URL: `https://api.themoviedb.org/3/genre/movie/list`  
- 설명: 영화의 장르 코드 목록을 가져옵니다. 예를 들어, Action, Comedy 등.

#### 4. **이미지 옵션 API**  
- URL: `https://api.themoviedb.org/3/configuration`  
- 설명: 영화 포스터나 백드롭 이미지의 크기 옵션 목록을 가져옵니다.

---

## 📜 코드 설명  
아래는 Axios 인스턴스를 생성하여 API 호출을 간소화한 코드입니다.

```javascript
import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY; // 환경 변수에서 API 키 가져오기
const Authorization = `Bearer ${API_KEY}`; // Bearer 인증 토큰
const headers = { Authorization };

/**
 * @description 베이스 URL
 */
export const instance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  headers,
});

/**
 * @description 영화 관련
 */
export const movieInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/movie`,
  headers,
});

/**
 * @description
 * 장르 코드
 * @todo store에 저장하여 최소 1회만 호출되도록 개선 필요
 */
export const genreInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/genre/movie/list`,
  headers,
});

/**
 * @description
 * 이미지(포스터)에 대한 크기 옵션 목록
 */
export const imageOptionInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/configuration`,
  headers,
});
```

---

## 📌 사용 예제  
[프로젝트의 특정 사용 예제, 스크린샷 등을 작성하면 좋습니다.]

