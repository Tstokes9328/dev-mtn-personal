module.exports = {
    
    getUser: (req, res) => {
        if(req.user){
            res.status(200).send(req.user)
        } else {
            res.status(401).send('Nope, not you..')
        }
    },

    getEvents: (req, res) => {
        req.app.get('db').get_events().then((events) => {
            res.status(200).send(events)
        })
    },

    createEvent: (req, res) => {
        let {title, location, date, event_picture, id} = req.body;
        req.app.get('db').create_event([title, location, date, event_picture, id]).then(() => {
            res.status(200).send('Event Created!')
        })
    },

    deleteEvent: (req, res) => {
        let {id} = req.params;
        req.app.get('db').delete_event([id]).then(() => {
            res.send('Event Removed')
        })
    },

    getEventPage: (req, res) => {
        let {id} = req.params;
        req.app.get('db').get_event_page([id]).then((eventPage) => {
            res.send(eventPage)
        })
    }
}