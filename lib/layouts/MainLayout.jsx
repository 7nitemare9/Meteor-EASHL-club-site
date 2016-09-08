import React from 'react';
import { StyleRoot } from 'radium';
import Header from '../ui/Header.jsx';
import Content from '../ui/Content.jsx';
import LatestMatches from '../ui/matches/LatestMatches.jsx';
import LatestInForum from '../ui/forum/LatestInForum.jsx';
import Calendar from '../ui/calendar/Calendar.jsx';
import Twitter from '../ui/twitter/Twitter.jsx';
import Streaming from '../ui/streams/Streaming.jsx';
import ShoutBox from '../ui/shoutbox/ShoutBox.jsx';
import Footer from '../ui/Footer.jsx';

const layoutStyle = {
  background: 'url("/assets/background.png")',
  backgroundSize: '100%',
  maxWidth: '1362px',
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'center'
};

const flexStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
  maxWidth: '1325px',
  margin: '0 -10px'
};

const bigRowStyle = {
  display: 'flex',
  flexFlow: 'column',
  margin: '-5px 10px'
}

export const MainLayout = ({content}) => (


      <StyleRoot>
        <div style={layoutStyle}>
          <div style={flexStyle}>
            <Header />
            {/*<div className="col-lg-6 col-md-8 b_img-responsive col-lg-push-3 b_bottom-padding" style={{minHeight: '530px'}}>*/}
            <div style={bigRowStyle}>
              <LatestMatches />
              <Calendar />
              <Streaming />
            </div>
            <Content content={content} />
            {/*</div>*/}
            <div style={bigRowStyle}>
              <LatestInForum />
              <Twitter />
              <ShoutBox />
            </div>
            <Footer />
          </div>
        </div>
      </StyleRoot>

        )
