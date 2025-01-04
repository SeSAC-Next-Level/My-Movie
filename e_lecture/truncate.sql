-- Active: 1732690655312@@127.0.0.1@3306@e_lecture


-- SELECT Concat('TRUNCATE TABLE ', table_schema, '.', TABLE_NAME, ';')
-- FROM INFORMATION_SCHEMA.TABLES where table_schema = 'e_lecture';
set foreign_key_checks = 0;





TRUNCATE TABLE e_lecture.강사;
TRUNCATE TABLE e_lecture.강사평;
TRUNCATE TABLE e_lecture.강의;
TRUNCATE TABLE e_lecture.강의과제;
TRUNCATE TABLE e_lecture.강의자료;
TRUNCATE TABLE e_lecture.강좌;
TRUNCATE TABLE e_lecture.강좌qna;
TRUNCATE TABLE e_lecture.강좌qna덧글;
TRUNCATE TABLE e_lecture.게시글;
TRUNCATE TABLE e_lecture.과목;
TRUNCATE TABLE e_lecture.과제제출;
TRUNCATE TABLE e_lecture.관심_강사;
TRUNCATE TABLE e_lecture.관심_강좌;
TRUNCATE TABLE e_lecture.구매강좌;
TRUNCATE TABLE e_lecture.덧글;
TRUNCATE TABLE e_lecture.수강_강좌;
TRUNCATE TABLE e_lecture.수강생;
TRUNCATE TABLE e_lecture.수강평;
TRUNCATE TABLE e_lecture.수강평_덧글;
TRUNCATE TABLE e_lecture.유저;

set foreign_key_checks = 1;