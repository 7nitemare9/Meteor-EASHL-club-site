import React from 'react';
import { mount } from 'react-mounter';
// import { render } from 'meteor/kadira:react-layout';

import { MainLayout } from './layouts/MainLayout.jsx';
import News from './ui/news/News.jsx';
import ShowNews from './ui/news/ShowNews.jsx';
import NewsArchive from './ui/news/Archive.jsx';
import Lineup  from './ui/lineup/Lineup.jsx';
import ShowPlayer from './ui/lineup/ShowPlayer.jsx';
import FanZone from './ui/fanzone/FanZone.jsx';
import Matches from './ui/matches/Matches.jsx';
import ShowMatch from './ui/matches/ShowMatch.jsx';
import ListMatches from './ui/matches/ListMatches.jsx';
import Forum from './ui/forum/Forum.jsx';
import ForumCategory from './ui/forum/ForumCategory.jsx';
import ForumThread from './ui/forum/ForumThread.jsx';
import EditPost from './ui/forum/EditPost.jsx';
import EditThread from './ui/forum/EditThread.jsx';
import TeamChat from './ui/teamchat/TeamChat.jsx';
import ClubInfo from './ui/clubinfo/ClubInfo.jsx';
import { Accounts } from 'meteor/std:accounts-ui';
import User from './ui/user/User.jsx';
import Event from './ui/event/Event.jsx';
import AdmFanZone from './ui/admin/FanZone.jsx';
import AdmNews from './ui/admin/News.jsx';
import AdmNewsEdit from './ui/admin/NewsEdit.jsx';
import AdmUsers from './ui/admin/Users.jsx';
import AdmForumCategory from './ui/admin/ForumCategory.jsx';
import AdmSchedule  from './ui/admin/Schedule.jsx';
import AdmEditEvent from './ui/admin/EditEvent.jsx';
import AdmClubInfo from './ui/admin/ClubInfo.jsx';
import AdmEditClubInfo from './ui/admin/EditClubInfo.jsx';
import AdmStreams from './ui/admin/Streams.jsx';
// const mount = render;

if(Meteor.isServer) {
  FlowRouter.setDeferScriptLoading(true);
}

FlowRouter.route('/', {
    action() {
        mount(MainLayout, {
            content: (<News />)
        })
    }
});

FlowRouter.route('/news/:id', {
    action(params) {
        mount(MainLayout, {
            content: (<ShowNews id={params.id} />)
        })
    }
});

FlowRouter.route('/news/archive/:page', {
  action(params) {
    mount(MainLayout, {
      content: (<NewsArchive page={params.page} />)
    })
  }
});

FlowRouter.route('/lineup', {
  action() {
    mount(MainLayout, {
      content: (<Lineup />)
    })
  }
});

FlowRouter.route('/lineup/:name', {
  action(params) {
    mount(MainLayout, {
      content: (<ShowPlayer player={params.name} />)
    })
  }
});

FlowRouter.route('/fanzone', {
  action() {
    mount(MainLayout, {
      content: (<FanZone />)
    })
  }
});

FlowRouter.route('/matches', {
  action() {
    mount(MainLayout, {
      content: (<Matches />)
    })
  }
});

FlowRouter.route('/matches/:id', {
  action(params) {
    mount(MainLayout, {
      content: (<ShowMatch id={params.id} />)
    })
  }
});

FlowRouter.route('/matches/list/:page', {
  action(params) {
    mount(MainLayout, {
      content: (<ListMatches page={params.page} />)
    })
  }
});

FlowRouter.route('/forum', {
  action() {
    mount(MainLayout, {
      content: (<Forum />)
    })
  }
});

FlowRouter.route('/forum/:category', {
  action(params) {
    mount(MainLayout, {
      content: (<ForumCategory name={params.category} />)
    })
  }
});

FlowRouter.route('/forum/thread/:id', {
  action(params) {
    mount(MainLayout, {
      content: (<ForumThread id={params.id} />)
    })
  }
});

FlowRouter.route('/forum/editpost/:id', {
  action(params) {
    mount(MainLayout, {
      content: (<EditPost id={params.id} />)
    })
  }
});

FlowRouter.route('/forum/editthread/:id', {
  action(params) {
    mount(MainLayout, {
      content: (<EditThread id={params.id} />)
    })
  }
});

FlowRouter.route('/teamchat', {
  action() {
    mount(MainLayout, {
      content: (<TeamChat />)
    })
  }
});

FlowRouter.route('/clubinfo/:page', {
  action(params) {
    mount(MainLayout, {
      content: (<ClubInfo page={params.page} />)
    })
  }
})

FlowRouter.route('/login', {
  action() {
    mount(MainLayout, {
      content: (<Accounts.ui.LoginForm />)
    })
  }
});

FlowRouter.route('/signout', {
  action() {
    mount(MainLayout, {
      content: (<Accounts.ui.LoginForm />)
    })
  }
});

FlowRouter.route('/user', {
  action() {
    mount(MainLayout, {
      content: (<User />)
    })
  }
});

FlowRouter.route('/event/:id', {
  action(params) {
    mount(MainLayout, {
      content: (<Event id={params.id} />)
    })
  }
});

FlowRouter.route('/admin/fanzone', {
    action() {
        mount(MainLayout, {
                content: (<AdmFanZone />)
        })
    }
});

FlowRouter.route('/admin/news', {
    action() {
        mount(MainLayout, {
                content: (<AdmNews />)
        })
    }
});

FlowRouter.route('/admin/newsedit/:id', {
  action(params) {
    mount(MainLayout, {
      content: (<AdmNewsEdit id={params.id}/>)
    })
  }
});

FlowRouter.route('/admin/users', {
  action() {
    mount(MainLayout, {
      content: (<AdmUsers />)
    })
  }
});

FlowRouter.route('/admin/forumcategory', {
  action() {
    mount(MainLayout, {
      content: (<AdmForumCategory />)
    })
  }
});

FlowRouter.route('/admin/schedule', {
  action() {
    mount(MainLayout, {
      content: (<AdmSchedule />)
    })
  }
});

FlowRouter.route('/admin/editevent/:id', {
  action(params) {
    mount(MainLayout, {
      content: (<AdmEditEvent id={params.id} />)
    })
  }
});

FlowRouter.route('/admin/clubinfo', {
  action() {
    mount(MainLayout, {
      content: (<AdmClubInfo />)
    })
  }
});

FlowRouter.route('/admin/editclubinfo/:id', {
  action(params) {
    mount(MainLayout, {
      content: (<AdmEditClubInfo id={params.id} />)
    })
  }
});

FlowRouter.route('/admin/streams', {
  action() {
    mount(MainLayout, {
      content: (<AdmStreams />)
    })
  }
});
