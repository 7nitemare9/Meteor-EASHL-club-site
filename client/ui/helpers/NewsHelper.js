import * as Youtube from './Youtube.js';

export function getImage(data) {
        if (data) {
            if (data.image.length != 0) {
                return data.image[0];
            } else if (data.youtube.length != 0) {
                console.log(typeof data.youtube);
                if(typeof data.youtube === "string") {
                  return Youtube.youtubeToImage(data.youtube);
                }
                return Youtube.youtubeToImage(data.youtube[0]);
            } else {
                return "test.jpg";
            }
        }
    }
