Meteor.methods({
  imgurAccessToken() {
    console.log(process.env.IMGUR_ACCESS_TOKEN);
    return process.env.IMGUR_ACCESS_TOKEN;
  }
});
