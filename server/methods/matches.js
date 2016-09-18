Meteor.methods({
  /*
     EA adds a new id everytime you do a query, this combined with not storing names of player in the json for the match
     makes it annoying to get the player names. Luckily every created id for players is queriable so we query both the id's
     in the match data and we query the id's on in the team member data (which contains the name). Then we loop through each
     player from the game and compares it to the players in the teams until we find a match. Then we write the name to the
     player data from the match.

     EA it should not be this complicated!! Also storing data with these "random" id's as the keys
     is ridiculous. Looks like this also broke their own pages :D
    */
    getEAData() {
        const clubId = process.env.CLUB_ID;
        const platform = process.env.PLATFORM;

        /* Get match data */
        let data = Meteor.http.call('GET', `http://www.easports.com/iframe/nhl14proclubs/api/platforms/${platform}/clubs/${clubId}/matches`, { params: {
            filters: 'sum, pretty',
                match_type: 'gameType5',
                matches_returned: 10
        }}).data.raw;

        /* Loop through the matches */
        for (gm in data) {
          let game = data[gm];
          let match = {};
          match.game_teams = [];

          if (Matches.findOne({timestamp: game.timestamp})) {
            console.log('match skipped');
            continue;
          }

          /* collect game_teams data, and "flattening" details for compatability with old style */
          for (club in game.clubs) {
            let team = Object.assign(game.clubs[club], game.clubs[club].details);
            match.game_teams.push(team);
          }

          /* Get member data for both teams in the game. Combine info from club with player stats */
          let members = {};
          for (club in game.clubs) {
            members = Object.assign(members, Meteor.http.call('GET', `http://www.easports.com/iframe/nhl14proclubs/api/platforms/${platform}/clubs/${club}/members`).data.raw[0]);
          }
          let membersdata = [];
          for (member in members) {
            membersdata.push({member: members[member], data: Meteor.http.call('GET', `http://www.easports.com/iframe/nhl14proclubs/api/platforms/${platform}/members/${member}/stats`).data.raw});
          }

          /* Get player data from the players that was in the game compare with previous collected data and add name from team member data */
          match.game_players  = [];
          let i = 0;
          for (team in game.players) {
            for (player in game.players[team]) {
              match.game_players[i] = game.players[team][player];
              let gameMembersData = (Meteor.http.call('GET', `http://www.easports.com/iframe/nhl14proclubs/api/platforms/${platform}/members/${player}/stats`).data.raw);
              let tempGMD = gameMembersData[Object.keys(gameMembersData)[0]];
              delete tempGMD.memberId; // remove the id which is unique to this query
              let actualPlayer = {};
              for (let j = 0; j < membersdata.length; j++) {
                let tempMD = membersdata[j].data.length !== 0 ? membersdata[j].data[Object.keys(membersdata[j].data)[0]] : {memberId: 'non existant'}; //Make sure an empty object doesn't break the comparision
                delete tempMD.memberId; // remove id here aswell so we have comparable objects
                if (JSON.stringify(tempGMD) == JSON.stringify(tempMD)) {
                  actualPlayer = membersdata[j];
                  break;
                }
              }
              match.game_players[i].personaName = actualPlayer.member ? actualPlayer.member.name : 'Deleted';
              match.game_players[i].team = team;
              i++;
            }
          }

          /* add match id and timestamp and insert into database*/
          match.matchId = game.matchId;
          match.timestamp = game.timestamp;
          try {
            Matches.insert(match);
            console.log('game added');
          }
          catch(err) {
            console.log(err);
          }
        }

    },

    checkMatch() {
      let temp = Matches.find().fetch();
      temp.forEach(function(data) {
        console.log(data.timestamp);
        console.log(data.awayteam);
        console.log(data.awayscore);
        console.log(data.hometeam);
        console.log(data.homescore);
      })
    },

    listLastMatch() {
      const match = Matches.findOne({}, {sort: {timestamp: -1}, limit: 1});
      console.log(match);
    }
})
