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
import AdmFanZone from './ui/admin/FanZone.jsx';
import AdmNews from './ui/admin/News.jsx';

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
