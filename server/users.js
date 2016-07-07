Accounts.onCreateUser(function(options, user){
  if (user.profile == undefined) user.profile = {};
  user.profile.gamertag = "";
  return user;
});
