import { chai } from 'meteor/practicalmeteor:chai';
import * as NewsHelper from '../NewsHelper.js';


describe('NewsHelper', function() {
  describe('getImage will respond with an image resulting from the news object', function() {
    it('should return test.jpg if no image or youtube value exist', function() {
      expect(NewsHelper.getImage({image: '', youtube: ''})).to.equal('test.jpg');
    });
    it('should return an image if it there is an image value', function() {
      expect(NewsHelper.getImage({image: 'existing.jpg', youtube: ''})).to.equal('existing.jpg');
    });
    it('should return an image based on a youtube-video-adress as youtube value', function() {
      expect(NewsHelper.getImage({image: '', youtube: 'https://youtube.com/watch?v=1mAg3'}))
      .to.equal('https://img.youtube.com/vi/1mAg3/0.jpg');
    });
    it('should return an image based of youtube even if adress is in array', function() {
      expect(NewsHelper.getImage({image: '', youtube: ['https://youtube.com/watch?v=1mAg3tw0']}))
      .to.equal('https://img.youtube.com/vi/1mAg3tw0/0.jpg');
    });
  });
});
