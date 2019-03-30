const plugins = [

];

const defaultEnv = {

}

module.exports = {
  presets: [
    "@babel/preset-react",
    [
      "@babel/preset-env", {
        debug: false,
        exclude: ["@babel/plugin-transform-typeof-symbol"],
        modules: false,
        loose: true,
        corejs: 3,
        targets: {
          browsers: ["last 2 versions", "ie >= 11"]
        },
        // useBuiltIns: 'entry',
      }
    ]
  ],
  plugins: [
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-proposal-export-default-from",
    ["@babel/plugin-transform-runtime", {
      corejs: 3,
    }]
  ],
};
