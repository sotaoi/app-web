const getBundleJson = () => {
  delete require.cache[require.resolve('@sotaoi/omni/bundle.json')];
  const BundleJson = require('@sotaoi/omni/bundle.json');
  BundleJson.installed = !!BundleJson.installed;
  BundleJson.master = !!BundleJson.master;
  return BundleJson;
};

module.exports = { getBundleJson };
