Tracker.autorun(function() {
  if (Meteor.user()) {
    if (FlowRouter.current().path === '/login') {
      if(Meteor.user().profile.name || Meteor.user().profile.gamertag) {
        FlowRouter.go('/');
      } else {
        FlowRouter.go('/user');
      }
    }
  }
  if (!Meteor.user()) {
    if (FlowRouter.current().path === '/signout') {
      FlowRouter.go('/');
    }
  }
});
