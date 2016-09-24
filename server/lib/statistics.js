
const addTogether = function(obj1, obj2) {
  if (obj2.position > 0) {
    obj2.skgp = 1;
    obj2.glgp = 0;
    obj2.glso = 0;
  } else {
    obj2.skgp = 0;
    obj2.glgp = 1;
    obj2.glso = obj2.glga > 0 ? 0 : 1;
  }
  for (prop in obj1) {
    if (!isNaN(obj1[prop])) {
      obj1[prop] = parseInt(obj1[prop]) + parseInt(obj2[prop]);
    }
  }
  return obj1;
}

const firstGame = function(player) {
  if (player.position > 0) {
    player.skgp = 1;
    player.glgp = 0;
    player.glso = 0;
  } else {
    player.skgp = 0;
    player.glgp = 1;
    player.glso = player.glga > 0 ? 0 : 1;
  }
  return player;
}

export function playerStatsInGames() {
  let members = Players.find().fetch().map(member => member.name);
  let playerStats = {created_at: Date.now()};
  const matches = Matches.find().fetch();
  for (match in matches) {
    if (matches[match].timestamp < 1473724800) { continue; } //before september 13 2016 (release day nhl 17)
    let players = matches[match].game_players;
    for (player in players) {
      let name = players[player].personaName;
      if (members.includes(name)) {
        playerStats[name] = playerStats[name] ? addTogether(playerStats[name], players[player]) : firstGame(players[player]);
      }
    }
  }
  PlayerStats.insert(playerStats);
}
