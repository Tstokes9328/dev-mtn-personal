update events
set title = $1,
    location = $2,
    date = $3,
    event_picture = $4,
    event_info = $5
where id = $6;