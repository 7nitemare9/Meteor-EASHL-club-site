import { ImgurTokens } from '../../lib/collections.js';

Meteor.methods({
  imgurAccessToken() {
    console.log(ImgurTokens.findOne());
    return ImgurTokens.findOne().access;
  },
  setImgurTokens() {
    ImgurTokens.upsert({}, {$set: {
      access: process.env.IMGUR_ACCESS_TOKEN,
      refresh: process.env.IMGUR_REFRESH_TOKEN,
      id: process.env.IMGUR_CLIENT_ID,
      secret: process.env.IMGUR_CLIENT_SECRET
    }});
  },
  updateImgurTokens() {
    var imgur = ImgurTokens.findOne();
    var data = Meteor.http.call('POST', 'https://api.imgur.com/oauth2/token', {params: {refresh_token: imgur.refresh, client_id: imgur.id, client_secret: imgur.secret, grant_type: 'refresh_token'}});
    console.log(data);
    ImgurTokens.upsert({}, {$set: {
      access: data.data.access_token,
      refresh: data.data.refresh_token
    }});
  }
});
