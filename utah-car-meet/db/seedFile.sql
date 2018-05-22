create table if not exists events(
    id serial primary key,
    title varchar(50),
    location varchar(50),
    date varchar(20),
    event_picture text,
    attendees integer references user(id)
);

create table if not exists users (
    id serial primary key,
    name varchar(25),
    location varchar(60),
    age integer,
    profile_pic text,
    car integer references users_car(id)
);

create table if not exists users_car (
    id serial primary key,
    car_name varchar(25),
    year integer,
    car_bio varchar(400),
    owner integer references users(id),
    pictures integer references car_pics(id)
);

create table if not exists car_pics (
    id serial primary key,
    pic_one text,
    pic_two text,
    pic_three text,
    pic_four text,
    pic_five text
    car integer references users_car(id)
);