create database mydb;
use mydb;
create table cities
(
  id            int auto_increment primary key,
  createdAt     varchar(256),
  updatedAt     varchar(256),
  name          varchar(30) not null
);
