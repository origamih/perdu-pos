module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "jquery": true,
        "jasmine": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "indent": [
            "warn",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            0,
            "double"
        ],
        "semi": [
            0,
            "always"
        ],
        "no-unused-vars": [
            "warn"
        ],
        "no-undef": [
            2
        ],
        "no-empty": [
            "warn"
        ],
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error"
    }
};