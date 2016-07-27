ServiceConfiguration.configurations.remove({service: 'google'});
ServiceConfiguration.configurations.insert({
  service: 'google',
  clientId: process.env.GGL_CLIENT_ID,
  secret: process.env.GGL_CLIENT_SECRET
});

ServiceConfiguration.configurations.remove({service: 'facebook'});
ServiceConfiguration.configurations.insert({
  service: 'facebook',
  appId: process.env.FBK_APP_ID,
  secret: process.env.FBK_SECRET
});

ServiceConfiguration.configurations.remove({service: 'twitter'});
ServiceConfiguration.configurations.insert({
  service: 'twitter',
  consumerKey: process.env.TW_CONSUMER_KEY,
  secret: process.env.TW_CONSUMER_SECRET
})
