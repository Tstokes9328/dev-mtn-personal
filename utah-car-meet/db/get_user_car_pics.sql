select * from car_pics
left join users_car on car_pics.car = users_car.id;