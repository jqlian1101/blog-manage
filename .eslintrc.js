module.exports = {
    extends: ["alloy", "alloy/react"],
    parser: "babel-eslint",
    settings: {
        // 解决webpack require各类文件报路径错误
        "import/resolver": {
            alias: {
                map: [["src", "./src"]]
            }
        }
    },
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
        "no-invalid-this": 0,
        "no-template-curly-in-string": 0
    }
};
