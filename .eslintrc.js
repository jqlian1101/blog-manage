module.exports = {
    extends: ["alloy", "alloy/react"],
    parser: "babel-eslint",
    settings: {
        // Warning: React version not specified in eslint-plugin-react settings.
        react: {
            version: "detect"
        },

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
    plugins: ["react-hooks"],
    rules: {
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": 0,
        "react/jsx-filename-extension": [0],
        "jsx-a11y/anchor-is-valid": [0],
        "no-invalid-this": 0,
        "no-template-curly-in-string": 0,
        "no-param-reassign": 0,
        "array-callback-return": 0
    }
};
