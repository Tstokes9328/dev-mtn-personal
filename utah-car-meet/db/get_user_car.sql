select users_car.car_name, users_car.year, users_car.car_bio, users_car.pic_one, users_car.pic_two, users_car.pic_three from users_car
join users on users_car.users_id = users.id
where users_id = $1;