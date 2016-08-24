
export function youtubeToImage(image) {
      image = ~image.indexOf('&list') ? image.substring(0, image.indexOf('&list')) : image;
      if(image.indexOf('embed/') !== -1) {
        return (image.replace(image.substring(0, image.indexOf('embed/') + 6), 'https://img.youtube.com/vi/').concat('/0.jpg'));
      } else if (image.indexOf('.be/') !== -1) {
        return (image.replace(image.substring(0, image.indexOf('.be/') + 4), 'https://img.youtube.com/vi/').concat('/0.jpg'));
      } else if (image.indexOf('watch?v=') !== -1) {
        return (image.replace(image.substring(0, image.indexOf('ch?v=') + 5), 'https://img.youtube.com/vi/').concat('/0.jpg'));
      } else {
        return "";
      }
    }

  export function embedYoutube(youtube) {
    youtube = typeof youtube !== 'string' ? youtube[0] : youtube;
    if (~youtube.indexOf('embed')) return youtube;
    else if (youtube.indexOf('.be/') != -1) {
      return (youtube.replace(youtube.substring(0, youtube.indexOf('.be/') + 4), 'https://www.youtube.com/embed/'));
    } else if (youtube.indexOf('watch?v=') != -1) {
      return (youtube.replace(youtube.substring(0, youtube.indexOf('ch?v=') + 5), 'https://www.youtube.com/embed/'));
    } else {
      return "";
    }
  }
