import React from 'react';
import AccountsUI from '../AccountsUI.jsx';
import Header from '../ui/Header.jsx';
import Content from '../ui/Content.jsx';

export const MainLayout = ({content}) => (
    

        <div className="container">
            <div className="container-fluid">
                <Header />
            </div>
            <Content content={content} />
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
