import React from 'react';
import AccountsUI from '../AccountsUI.jsx';
import Header from '../ui/Header.jsx';
import Content from '../ui/Content.jsx';
import LatestMatches from '../ui/matches/LatestMatches.jsx';
import LatestInForum from '../ui/forum/LatestInForum.jsx';
import Calendar from '../ui/calendar/Calendar.jsx';
import Twitter from '../ui/twitter/Twitter.jsx';
import Streaming from '../ui/streams/Streaming.jsx';
import ShoutBox from '../ui/shoutbox/ShoutBox.jsx';
import Footer from '../ui/Footer.jsx';

export const MainLayout = ({content}) => (


        <div className="container">
            <div className="container-fluid">
                <Header />
            </div>
            <div className="col-lg-6 col-md-8 b_img-responsive col-lg-push-3 b_bottom-padding" style={{minHeight: '530px'}}>
              <Content content={content} />
            </div>
            <LatestMatches />
            <LatestInForum />
            <Calendar />
            <Twitter />
            <Streaming />
            <ShoutBox />
            <Footer />
        </div>
        )


/*var temp = (  <div>
                <header>
                   <h2>Resolutions - {Session.get('test')}</h2>
                   <nav>
                       <a href="/">Resolutions</a>
                       <a href="/about">About</a>
                       <AccountsUI />
                   </nav>
               </header>
               <main>
                   {content}
               </main>
            </div>
      )*/
