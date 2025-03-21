const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin")

module.exports = {
    entry: {
        index: "./src/popupIndex.tsx",
        popup: path.join(__dirname, 'src', 'popupIndex.tsx'),
        background: "./src/background.ts"
    },
    mode: "production",
    module: {
        rules: [
            {
              test: /\.tsx?$/,
               use: [
                 {
                  loader: "ts-loader",
                   options: {
                     compilerOptions: { noEmit: false },
                    }
                  }],
               exclude: /node_modules/,
            },
            {
              exclude: /node_modules/,
              test: /\.css$/i,
               use: [
                  "style-loader",
                  "css-loader"
               ],
               include: [
                path.resolve(__dirname, "not_exist_path")
                ],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
            
        ],

        
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { 
                    from: "manifest.json", to: "../manifest.json"
                }
            ],
        }),
    ],
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    output: {
        path: path.join(__dirname, "dist/js"),
        filename: "[name].js",
    },
};

function getHtmlPlugins(chunks) {
    return chunks.map(
        (chunk) =>
            new HTMLPlugin({
                title: "React extension",
                filename: `${chunk}.html`,
                chunks: [chunk],
            })
    );
}