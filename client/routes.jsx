import React from 'react';
import { mount } from 'react-mounter';

import { MainLayout } from './layouts/MainLayout.jsx';
import News from './ui/news/News.jsx';
import About from './about/About.jsx';

FlowRouter.route('/', {
    action() {
        mount(MainLayout, {
            content: (<News />)
        }
            
        )
    }
});

FlowRouter.route('/about', {
    action() {
        mount(MainLayout, {
                content: (<About />)
            }

        )
    }
});
