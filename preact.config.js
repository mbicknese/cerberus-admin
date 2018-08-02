import preactCliTypeScript from 'preact-cli-plugin-typescript'

export default (config, env, helpers) => {
  preactCliTypeScript(config)

  let { rule } = helpers.getLoadersByName(config, 'babel-loader')[0]
  let babelConfig = rule.options

  babelConfig.presets[0][1].exclude.push('transform-async-to-generator')
  babelConfig.plugins.push('fast-async')
}
