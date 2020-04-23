module.exports = {
    "extends": "airbnb-base",
    "plugins": [
        "import"
    ],
    "rules": {
        "indent": ["error", 4],
        "linebreak-style": 0,
    },
    "parserOptions": {
        "sourceType": "module",
        "ecmaVersion": 8,
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true
        }
    }
};
