Meteor.methods({
  addClubInfo(data) {
    if (Roles.userIsInRole(Meteor.user(), ['Admin'])) {
      if (ClubInfos.find({page: data.page})) {
        try {
          ClubInfos.insert(data);
        }
        catch(err) {
          throw new Meteor.Error(`could not add club-info: ${err}`);
        }
      } else {
        throw new Meteor.Error('page already exist');
      }
    } else {
      throw new Meteor.Error('Only admins can add club-info');
    }
  },

  updateClubInfo(id, data) {
    if (Roles.userIsInRole(Meteor.user()), ['Admin']) {
      try {
        ClubInfos.upsert({_id: id}, {$set: {page: data.page, title: data.title, text: data.text}});
      }
      catch(err) {
        throw new Meteor.Error(`Could not update club-info: ${err}`);
      }
    } else {
      throw new Meteor.Error(`Only admins can update club-info`);
    }
  },

  deleteClubInfo(id) {
    if (Roles.userIsInRole(Meteor.user(), ['Admin'])) {
      try {
        ClubInfos.remove({_id: id});
      }
      catch(err) {
        throw new Meteor.Error(`Could not delete club-info: ${err}`);
      }
    } else {
      throw new Meteor.Error(`Only admins can delete club-info`);
    }
  }
});
