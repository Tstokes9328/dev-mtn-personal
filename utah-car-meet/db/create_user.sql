insert into users
(name, profile_pic, auth_id)
values
($1, $2, $3)
returning *;