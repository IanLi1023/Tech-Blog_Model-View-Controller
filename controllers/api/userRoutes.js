const router = require('express').Router();
const {User} = require('../../models');

// Register the user, it will show the user the homepage
router.post('/', async (req, res) => {
    console.log('=========')
    console.log(req.session)
    console.log('=========')

    try {
        const newUser = await User.create({
            username: req.body.username,
            password: req.body.password,
        });
        req.session.save(() => {
            req.session.userId = newUser.id;
            req.session.username = newUser.username;
            req.session.loggedIn = true;
            res.json(newUser)
        });
    } catch (e) {
    res.status(500).json(e);    
    }
})

// If the registered user is not logged in, send to this page
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                username: req.body.username,
            }
        });
        if (!user) {
            return res.status(400).json({ message: 'No user found'});
        }
        const userPassword = user.checkPassword(req.body.password)
        if (!userPassword) {
            return res.status(400).json({ message: 'No user found'});
        } 
        req.session.save(() => {
            console.log(req.session)
            req.session.userId = user.id;
            req.session.username = user.username;
            req.session.loggedIn = true;
            res.json({user, message: 'Welcome'});
        });
    } catch (e) {
        res.status(400).json({ message: 'No user found'});
    }
});

module.exports = router;