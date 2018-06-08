select * from event_chatbox
join events on (event_chatbox.event_id = events.id)
where events.id = $1;