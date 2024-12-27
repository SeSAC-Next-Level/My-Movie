-- Active: 1732690655312@@127.0.0.1@3306@e_lecture


-- SELECT Concat('DROP TABLE ', table_schema, '.', TABLE_NAME, ';')
-- FROM INFORMATION_SCHEMA.TABLES where table_schema = 'e_lecture';
set foreign_key_checks = 0;





DROP TABLE IF EXISTS e_lecture.강사;
DROP TABLE IF EXISTS e_lecture.강사평;
DROP TABLE IF EXISTS e_lecture.강의;
DROP TABLE IF EXISTS e_lecture.강의과제;
DROP TABLE IF EXISTS e_lecture.강의자료;
DROP TABLE IF EXISTS e_lecture.강좌;
DROP TABLE IF EXISTS e_lecture.강좌qna;
DROP TABLE IF EXISTS e_lecture.강좌qna덧글;
DROP TABLE IF EXISTS e_lecture.게시글;
DROP TABLE IF EXISTS e_lecture.과목;
DROP TABLE IF EXISTS e_lecture.과제제출;
DROP TABLE IF EXISTS e_lecture.관심강사;
DROP TABLE IF EXISTS e_lecture.관심강좌;
DROP TABLE IF EXISTS e_lecture.구매강좌;
DROP TABLE IF EXISTS e_lecture.덧글;
DROP TABLE IF EXISTS e_lecture.수강강좌;
DROP TABLE IF EXISTS e_lecture.수강생;
DROP TABLE IF EXISTS e_lecture.수강평;
DROP TABLE IF EXISTS e_lecture.수강평덧글;
DROP TABLE IF EXISTS e_lecture.유저;

set foreign_key_checks = 1;