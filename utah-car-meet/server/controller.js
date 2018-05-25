module.exports = {
    
    getUser: (req, res) => {
        if(req.user){
            res.status(200).send(req.user)
        } else {
            res.status(401).send('Nope, not you..')
        }
    },

    getUserCar: (req, res) => {
        if(req.user){
        req.app.get('db').get_user_car().then(car => {
            res.status(200).send(car);
        })
        } else {
            res.status(404).send('error')
        }
    },

    getUserCarPics: (req, res) => {
        if(req.user){
            req.app.get('db').get_user_car_pics().then(pics => {
                res.status(200).send(pics);
            })
        } else {
            res.status(404).send('error')
        }
    }
}