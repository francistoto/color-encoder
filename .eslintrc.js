module.exports = {
    "extends": "airbnb",
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
    "env": {
      "browser": true,
      "node": true,
      "es6": true,
      "mocha": true
    },
    "parserOptions": {
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "rules": {
        "react/jsx-filename-extension": [1, {"extensions": [".js", ".jsx"] }],
        "react/prop-types": 0,
        "import/no-extraneous-dependencies": ["error", {"devDependencies": true}],
        "comma-dangle": ["error", "ignore"]
    }
};