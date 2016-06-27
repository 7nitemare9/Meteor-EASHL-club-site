var multer = require( 'multer' );

let multerMid = multer();
Picker.middleware( multerMid.any() );

Picker.route( '/admin/imageupload', function( params, request, response, next ) {
  Imgur.upload({
    apiKey: `Bearer ${process.env.IMGUR_ACCESS_TOKEN}`,
    image: request.files[0].buffer.toString('base64'),
    album: "8Z4IE"
  }, (error, data) => {
    if (error) {
      throw error;
    } else {
      response.writeHead(200, {"Content-Type": "application/json"});
      response.end(JSON.stringify({link: data.link}));
    }
  })
});
