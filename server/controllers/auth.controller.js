import jwt from 'jsonwebtoken';
import config from '../../config/config';

// sample user, used for authentication
const user = {
    username: 'react',
    password: 'express',
};

/**
 * Returns jwt token if valid username and password is provided
 * @param req
 * @param res
 * @returns {*}
 */
function login(req, res) {
    // Ideally you'll fetch this from the db
    // Idea here was to show how jwt works with simplicity
    if (req.body.username === user.username && req.body.password === user.password) {
        const token = jwt.sign({
            username: user.username,
            expiresIn: 3600,
        }, config.jwtSecret);
        return res.json({
            token,
            username: user.username,
        });
    }

    return res.status(401).json({ message: 'Authentication error' });
}

/**
 * This is a protected route. Will return random number only if jwt token is provided in header.
 * @param req
 * @param res
 * @returns {*}
 */
function getRandomNumber(req, res) {
    // req.user is assigned by jwt middleware if valid token is provided
    return res.json({
        user: req.user,
        num: Math.random() * 100,
    });
}

export default { login, getRandomNumber };
