import * as Stats from '../lib/statistics.js';

Meteor.methods({
  calculateStats() {
    console.log('calculateStats');
    Stats.playerStatsInGames();
  }
})
