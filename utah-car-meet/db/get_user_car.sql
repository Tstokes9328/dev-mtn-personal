select * from users_car
left join users on users_car.owner_id = users.car;
where owner_id = $1; 