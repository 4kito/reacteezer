module.exports = function API(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo']
  };
};
