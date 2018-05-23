select * from users_car
left join users on users_car.owner = users.car;