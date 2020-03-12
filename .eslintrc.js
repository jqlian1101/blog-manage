module.exports = {
    extends: ["alloy", "alloy/react"],
    parser: "babel-eslint",
    env: {
        browser: true,
        es6: true,
        node: true
    },
    parserOptions: {
        ecmaVersion: 6,
        sourceType: "module"
    },

    rules: {
        "react/jsx-filename-extension": [0],
        "jsx-a11y/anchor-is-valid": [0],
        "no-invalid-this": 0
    }
};
