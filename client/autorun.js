Tracker.autorun(function() {
  if (Meteor.user()) {
    if (FlowRouter.current().path === '/login') {
      if(Meteor.user().profile.name || Meteor.user().profile.gamertag) {
        if (Roles.userIsInRole(Meteor.user(), ['Team-member'])) {
          FlowRouter.go('/teamchat');
        } else {
          FlowRouter.go('/');
        }
      }else{
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
