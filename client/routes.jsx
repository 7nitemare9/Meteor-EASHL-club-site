import React from 'react';
import { mount } from 'react-mounter';

import { MainLayout } from './layouts/MainLayout.jsx';
import News from './ui/news/News.jsx';
import ShowNews from './ui/news/ShowNews.jsx';
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
import { Accounts } from 'meteor/std:accounts-ui';
import User from './ui/user/User.jsx';
import AdmFanZone from './ui/admin/FanZone.jsx';
import AdmNews from './ui/admin/News.jsx';
import AdmNewsEdit from './ui/admin/NewsEdit.jsx';
import AdmUsers from './ui/admin/Users.jsx';

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

FlowRouter.route('/login', {
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
