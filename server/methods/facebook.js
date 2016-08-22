import Request from 'request';

Meteor.methods({
  publishToFacebook(id) {
    const url = encodeURIComponent(`${process.env.URL}/news/${id}`);
    const params = {
      uri: `https://graph.facebook.com/v2.7/${process.env.FBK_PAGE_ID}/feed?link=${url}&access_token=${process.env.FBK_ACCESS_TOKEN}`,
      method: 'POST',
      headers: {"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"},
    }
    const req = Request(params);
    req.on('error', error => {
      console.log(error);
    });
    req.on('data', data => {
      console.log(data.toString());
    });
    req.on('response', response => {
      console.log(response);
    });
  }
})
