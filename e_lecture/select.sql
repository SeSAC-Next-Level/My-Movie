-- - 메인 페이지
--     - 선생님 모음 / 강좌 모음 페이지로 이동하는 버튼
--     - 검색창
--     - 마이페이지
--     - 선생님 목록 일부
SELECT * FROM 강사;
--     - 강좌(course) 목록 일부
SELECT * FROM 강좌;
-- - 선생님 모음 페이지
--     - 선생님 세부 페이지
SELECT * FROM 강사 WHERE `강사ID` = 1;
--         - 선생님이 진행중인 강좌
SELECT * FROM 강사 t 
JOIN 강좌 c ON t.`강사ID` = c.`강사ID`
WHERE t.`강사ID` = 1 AND c.종료일 > now();
--         - 선생님이 진행했던 강좌
SELECT * FROM 강사 t 
JOIN 강좌 c ON t.`강사ID` = c.`강사ID`
WHERE t.`강사ID` = 1 AND c.종료일 < now();
--         - 선생님의 수강평 모음
SELECT * FROM 강사 t
JOIN 강사평 tr ON t.`강사ID` = tr.`강사ID`
WHERE t.`강사ID` = 1;
-- - 강좌 모음 페이지
--     - 강좌 세부 페이지
SELECT * FROM 강좌 c
WHERE c.`강좌ID` = 1;
--         - 공통
--             - 강의(lecture) 목록
SELECT c.`제목`, l.제목 강의수, l.영상경로 FROM 강좌 c
LEFT JOIN 강의 l ON c.`강좌ID` = l.`강좌ID`;
--             - 강좌 수강평
SELECT c.제목, FROM 강좌 c
LEFT JOIN 수강평 cr ON c.`강좌ID` = cr.`강좌ID`
GROUP BY c.`강좌ID`;
--                 - 수강평 평점 평균
SELECT c.제목, ROUND(SUM(cr.점수) / COUNT(cr.`수강평ID`), 2) FROM 강좌 c
LEFT JOIN 수강평 cr ON c.`강좌ID` = cr.`강좌ID`
GROUP BY c.제목;
--         - 강좌 신청한 경우()
SELECT u.닉네임, c.제목
FROM 유저 u
JOIN 수강강좌 uc ON u.`유저ID` = uc.`유저ID`
JOIN 강좌 c ON uc.`강좌ID` = c.`강좌ID`;
--             - 강의별 강의자료
SELECT u.닉네임, c.제목, l.제목, ln.이름
FROM 유저 u
JOIN 수강강좌 uc ON u.`유저ID` = uc.`유저ID`
JOIN 강좌 c ON uc.`강좌ID` = c.`강좌ID`
JOIN 강의 l ON c.`강좌ID` = l.`강좌ID`
JOIN 강의자료 ln ON l.`강의ID` = ln.`강의자료ID`;

--             - 강의별 과제
SELECT u.닉네임, c.제목, l.제목, lp.제목, lp.내용
FROM 유저 u
JOIN 수강강좌 uc ON u.`유저ID` = uc.`유저ID`
JOIN 강좌 c ON uc.`강좌ID` = c.`강좌ID`
JOIN 강의 l ON c.`강좌ID` = l.`강좌ID`
JOIN 강의과제 lp ON l.`강의ID` = lp.`강의ID`;
--                 - 내 과제 제출 내역(T, F에 준하는 데이터)
SELECT u.닉네임, c.제목, l.제목, lp.제목, lp.내용, p.제출여부
FROM 유저 u
JOIN 수강강좌 uc ON u.`유저ID` = uc.`유저ID`
JOIN 강좌 c ON uc.`강좌ID` = c.`강좌ID`
JOIN 강의 l ON c.`강좌ID` = l.`강좌ID`
JOIN 강의과제 lp ON l.`강의ID` = lp.`강의ID`
JOIN 과제제출 p ON lp.`강의과제ID` = p.`강의과제ID`;
--             - 강좌별 qna 게시판
SELECT c.*, q.* 
FROM 강좌 c
JOIN 강좌qna q ON c.`강좌ID` = q.강좌ID;

--                 - 게시글
SELECT b.*, COUNT(r.`덧글ID`) AS '덧글 개수'
FROM 게시글 b
JOIN 덧글 r ON b.`게시글ID` = r.`게시글ID`
GROUP BY b.`게시글ID`;
--                     - 댓글
SELECT b.`게시글ID`, rp.* , rc.내용
FROM 게시글 b
LEFT JOIN 덧글 rp ON b.`게시글ID` = rp.`게시글ID`
LEFT JOIN 덧글 rc ON rp.`부모덧글ID` = rc.`덧글ID`
WHERE b.`게시글ID` = 1;

-- - 검색 결과 페이지
--     - 검색 결과와 관련된 선생님 목록
-- 이름, 경력, id
SELECT u.유저ID, u.이름, t.경력
FROM 강사 t
JOIN 유저 u ON t.`유저ID` = u.`유저ID`
WHERE u.이름 LIKE "%강%";

SELECT * 
FROM 강사 t
JOIN 유저 u ON t.`유저ID` = u.`유저ID`
WHERE u.이름 LIKE "%강%";
--     - 검색 결과와 관련된 강좌 목록
SELECT c.강좌ID, c.제목, ut.이름
FROM 강좌 c
JOIN 강사 t USING(`강사ID`) 
JOIN 유저 ut USING(`유저ID`)
WHERE c.제목 LIKE "%기초%";

SELECT *
FROM 강좌 c
JOIN 강사 t USING(`강사ID`) 
JOIN 유저 ut USING(`유저ID`)
WHERE c.제목 LIKE "%기초%";

SELECT * 
FROM 강좌 c
WHERE c.제목 LIKE "%%";
-- - 마이 페이지
--     - 내가 신청한 강좌 목록
SELECT u.닉네임, c.제목, uc.기한
FROM 유저 u
JOIN 수강생 s ON u.`유저ID` = s.`유저ID`
JOIN 수강강좌 uc ON u.`유저ID` = uc.`유저ID`
JOIN 강좌 c ON uc.`강좌ID` = c.`강좌ID`
WHERE u.`유저ID` = 11;
SELECT * 
FROM 유저 u
JOIN 수강생 s ON u.`유저ID` = s.`유저ID`
JOIN 수강강좌 uc ON u.`유저ID` = uc.`유저ID`
JOIN 강좌 c ON uc.`강좌ID` = c.`강좌ID`
WHERE u.`유저ID` = 11;
--     - 내가 관심등록한 선생님
SELECT su.이름, tu.이름
FROM 유저 su
JOIN 관심강사 ut ON su.`유저ID` = ut.`유저ID`
JOIN 강사 t ON ut.`강사ID` = t.`강사ID`
JOIN 유저 tu ON t.`유저ID` = tu.`유저ID`
WHERE su.`유저ID` = 11;

-- SELECT su.이름, tu.이름
-- FROM 수강생 s
-- JOIN 유저 su ON s.`유저ID` = s.`유저ID`
-- JOIN 관심강사 ut ON su.`유저ID` = ut.`유저ID`
-- JOIN 강사 t ON ut.`강사ID` = t.`강사ID`
-- JOIN 유저 tu ON t.`유저ID` = tu.`유저ID`
-- WHERE su.`유저ID` = 11;


--     - 내가 관심등록한 강의
SELECT * 
FROM 유저 u
JOIN 관심강좌 pc ON u.`유저ID` = pc.`유저ID`
JOIN 강좌 c ON pc.`강좌ID` = c.`강좌ID`
WHERE u.`유저ID` = 11;

--     - 내 게시글 / 댓글 목록
SELECT * 
FROM 유저 u
JOIN 게시글 b ON u.`유저ID` = b.`유저ID`
JOIN 덧글 pr ON b.`게시글ID` = pr.`게시글ID`
LEFT JOIN 덧글 cr ON pr.`부모덧글ID` = cr.`덧글ID`
WHERE u.`유저ID` = 11;
SELECT * 
FROM 유저 u
JOIN 게시글 b ON u.`유저ID` = b.`유저ID`
-- JOIN 덧글 pr ON b.`게시글ID` = pr.`게시글ID`
-- LEFT JOIN 덧글 cr ON pr.`부모덧글ID` = cr.`덧글ID`
WHERE u.`유저ID` = 11;

-- - 게시판
--     - 전체 게시판, 질문/답변 게시판, 스터디 모집 게시판,
--     - 게시글
--         - 댓글
SELECT * 
FROM 게시글 b
JOIN 덧글 pr ON b.`게시글ID` = pr.`게시글ID`
LEFT JOIN 덧글 cr ON pr.`부모덧글ID` = cr.`덧글ID`
-- WHERE b.종류 = '질문답변';
WHERE b.종류 = '스터디모집';


-- - 단,
--     - 하나의 화면에서 여러 개의 쿼리를 사용할 수 있다.
--     - 검색은 `LIKE`를 활용하여 구현하며, 특정 Column에 검색어가 포함되어 있는지로 구현한다.
--     - `나`에 대한 USER ID는 `ME`를 활용한다.




