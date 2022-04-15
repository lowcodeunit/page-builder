const { ModuleFederationPlugin } = require('webpack').container;

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
        shared: ['grapesjs', 'react', 'react-dom'],
      }),
    );

    return config;
}