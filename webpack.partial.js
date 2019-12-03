module.exports = {
    module: {
        rules: [
            {
                test: /\.(gql|graphql)$/,
                loader: 'graphql-tag/loader'
            }
        ]
    }
};
