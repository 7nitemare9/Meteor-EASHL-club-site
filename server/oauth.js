ServiceConfiguration.configurations.remove({service: 'google'});
ServiceConfiguration.configurations.insert({
  service: 'google',
  clientId: process.env.GGL_CLIENT_ID,
  secret: process.env.GGL_CLIENT_SECRET
});
