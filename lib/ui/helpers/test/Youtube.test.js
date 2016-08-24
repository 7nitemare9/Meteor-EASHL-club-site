import { chai } from 'meteor/practicalmeteor:chai';
import * as Youtube from '../Youtube.js';

describe('Youtube helper', function() {
  let adressTypes = {
    embed: 'https://www.youtube.com/embed/1mAg3',
    be: 'https://youtu.be/1mAg3',
    watch: 'https://www.youtube.com/watch?v=1mAg3'
  }
  describe('youtubeToImage will turn a youtube adress into a youtube-image', function() {
    let imageAdress = 'https://img.youtube.com/vi/1mAg3/0.jpg';
    it('should return an image adress if youtube-adress is for embedding', function() {
      expect(Youtube.youtubeToImage(adressTypes.embed))
      .to.equal(imageAdress);
    });
    it('shold return and image-adress if adress is youtu.be variant', function() {
      expect(Youtube.youtubeToImage(adressTypes.be))
      .to.equal(imageAdress);
    });
    it('shuld return an image-adress if adress is of watch?v= type', function() {
      expect(Youtube.youtubeToImage(adressTypes.watch))
      .to.equal(imageAdress);
    });
    it('should return an image-adress even if adress has list property', function() {
      expect(Youtube.youtubeToImage(adressTypes.embed + '&list=L15T'))
      .to.equal(imageAdress);
      expect(Youtube.youtubeToImage(adressTypes.be+ '&list=L15T'))
      .to.equal(imageAdress);
      expect(Youtube.youtubeToImage(adressTypes.watch + '&list=L15T'))
      .to.equal(imageAdress);
    });
  });
  describe('embedYoutube will turn any youtube-adress into an embedded-addres', function() {
    let embedAdress = 'https://www.youtube.com/embed/1mAg3';
    it('should return an embed-adress if supplied with an embed-adress', function() {
      expect(Youtube.embedYoutube(adressTypes.embed))
      .to.equal(embedAdress)
    });
    it('should return an embed-adress if supplied with a .be-adress', function() {
      expect(Youtube.embedYoutube(adressTypes.be))
      .to.equal(embedAdress);
    });
    it('should return an embed-adress if suppliod with a watch-adress', function() {
      expect(Youtube.embedYoutube(adressTypes.watch))
      .to.equal(embedAdress);
    });
  });
})
