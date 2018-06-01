select * from event_attendents
join events on (event_attendents.event_id = events.id)
where events.id = $1;