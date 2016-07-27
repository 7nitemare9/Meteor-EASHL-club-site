
export function youtubeToImage(image) {
      if(image.indexOf('embed/') !== -1) {
        return (image.replace(image.substring(0, image.indexOf('embed/') + 6), 'http://img.youtube.com/vi/').concat('/0.jpg'));
      } else if (image.indexOf('.be/') !== -1) {
        return (image.replace(image.substring(0, image.indexOf('.be/') + 4), 'http://img.youtube.com/vi/').concat('/0.jpg'));
      } else if (image.indexOf('watch?v=') !== -1) {
        return (image.replace(image.substring(0, image.indexOf('ch?v=') + 5), 'http://img.youtube.com/vi/').concat('/0.jpg'));
      } else {
        return "";
      }
    }

  export function embedYoutube(youtube) {
    let data = ""
    if (typeof youtube !== "string") {
      data = youtube[0];
    } else {
      data = youtube;
    }
    if (data.indexOf('embed') != -1) {
      return data;
    } else if (data.indexOf('.be/') != -1) {
      return (data.replace(data.substring(0, data.indexOf('.be/') + 4), 'https://www.youtube.com/embed/'));
    } else if (data.indexOf('watch?v=') != -1) {
      return (data.replace(data.substring(0, data.indexOf('ch?v=') + 5), 'https://www.youtube.com/embed/'));
    } else {
      return "";
    }

  }
