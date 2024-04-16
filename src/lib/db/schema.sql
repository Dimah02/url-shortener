create database url_shortener;
use url_shortener;
create table url (
    id integer primary key AUTO_INCREMENT,
    longurl varchar(255) not null,
    shorturl varchar(255) not null,
    count integer default 0
);

insert into url (longurl, shorturl)
values ('https://www.youtube.com/watch?v=SLpUKAGnm-g','123');