const { ModuleFederationPlugin } = require('webpack').container;

const packageJsonDeps = require('./package.json').dependencies;

module.exports = function override(config, env) {
  if (!config.plugins) {
    config.plugins = [];
  }

  config.plugins.push(
    new ModuleFederationPlugin({
      name: 'lcu-page-builder',
      library: { type: 'var', name: 'lcu-page-builder' },
      filename: 'remoteEntry.js',
      // runtime: string | false,
      remotes: [],
      exposes: [],
      shared: {
        grapesjs: { singleton: true },
        react: {
          singleton: true,
          eager: true,
          requiredVersion: packageJsonDeps.react,
        },
        'react-dom': {
          singleton: true,
          eager: true,
          requiredVersion: packageJsonDeps['react-dom'],
        },
      },
    })
  );

  return config;
};
