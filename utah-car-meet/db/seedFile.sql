create table if not exists events(
    id serial primary key,
    title varchar(50),
    location varchar(50),
    date varchar(20),
    event_picture text,
    user_id integer,
    host text,
    host_pic text,
    event_info text
);

create table if not exists event_attendents (
    id serial primary key,
    profile_pic text,
    name text,
    event_id integer references events(id)
    on delete cascade,
    attendent_id integer references users(id)
    on delete cascade
);

create table if not exists event_chatbox (
    id serial primary key,
    username text,
    message varchar(50),
    event_id integer references events(id)
    on delete cascade
);

create table if not exists users (
    id serial primary key,
    auth_id text,
    name varchar(25),
    location varchar(60),
    age integer,
    profile_pic text,
    car_name varchar(25),
    car_make varchar(25),
    year integer,
    car_bio varchar(400),
    pic_one text,
    pic_two text,
    pic_three text
);

