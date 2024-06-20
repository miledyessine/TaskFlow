module.exports = {
    files: ["**/*.js"],
    ignores: ["node_modules"],

    rules: {
        "no-console": "off",
        "no-unused-vars": "warn",
        indent: ["error", 4],
        "linebreak-style": ["error", "unix"],
        quotes: ["error", "double"],
        semi: ["error", "always"],
    },

    settings: {
        "import/resolver": {
            node: {
                extensions: [".js", ".jsx"],
            },
        },
    },
};
