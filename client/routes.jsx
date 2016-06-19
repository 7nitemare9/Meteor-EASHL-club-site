import React from 'react';
import { mount } from 'react-mounter';

import { MainLayout } from './layouts/MainLayout.jsx';
import News from './ui/news/News.jsx';
import ShowNews from './ui/news/ShowNews.jsx';
import About from './about/About.jsx';

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

FlowRouter.route('/about', {
    action() {
        mount(MainLayout, {
                content: (<About />)
        })
    }
});
