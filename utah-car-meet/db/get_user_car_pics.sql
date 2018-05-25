select * from car_pics
left join users_car on car_pics.car_id = users_car.id;
where car_id = $1;