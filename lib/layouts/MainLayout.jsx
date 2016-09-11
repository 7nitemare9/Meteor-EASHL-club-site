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
  backgroundImage: 'url("/assets/background.png")' ,
  backgroundSize: '100%',
  maxWidth: '1362px',
  minWidth: '1330px',
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'center',
  '@media (min-width: 983px) and (max-width: 1312px)': {
    maxWidth: '1083px',
    minWidth: '1053px'
  },
  '@media (max-width: 982px)': {
    maxWidth: '710px',
    minWidth: '660px'
  }
};

const flexStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
  maxWidth: '1325px',
  margin: '0 -10px',
  '@media (min-width: 983px) and (max-width: 1312px)': {
    maxWidth: '1050px'
  },
  '@media (max-width: 982px)': {
    maxWidth: '660px',
    minWidth: '660px'
  }
};

const bigAndMobile = {
  display: 'flex',
  flexFlow: 'column',
  margin: '-5px 10px',
  '@media (min-width: 983px) and (max-width: 1312px)': {
    display: 'none'
  }
}

const mediumRight = {
  display: 'none',
  '@media (min-width: 983px) and (max-width: 1312px)': {
    display: 'flex',
    flexFlow: 'column',
    margin: '-5px 10px'
  }
}

const mediumBottom = {
  display: 'none',
  '@media (min-width: 983px) and (max-width: 1312px)': {
    display: 'flex',
    flexFlow: 'row',
    margin: '10px -5px',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    flexBasis: '1040px'
  }
}

export const MainLayout = ({content}) => (


      <StyleRoot>
        <div style={layoutStyle}>
          <div style={flexStyle}>
            <Header />
            {/*<div className="col-lg-6 col-md-8 b_img-responsive col-lg-push-3 b_bottom-padding" style={{minHeight: '530px'}}>*/}
            <div style={bigAndMobile}>
              <LatestMatches />
              <Calendar />
              <Streaming />
            </div>
            <Content content={content}/>
            <div style={mediumRight}>
              <LatestMatches />
              <LatestInForum />
              <Calendar />
            </div>
            <div style={mediumBottom}>
              <Twitter />
              <Streaming />
              <ShoutBox />
            </div>
            {/*</div>*/}
            <div style={bigAndMobile}>
              <LatestInForum />
              <Twitter />
              <ShoutBox />
            </div>
            <Footer />
          </div>
        </div>
      </StyleRoot>

        )
