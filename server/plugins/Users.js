const fs = require("fs");

var Users = {
  data: [],
  users: [],

  importDatabase: function(roomid) {
    let file = "{}";
    try {
      file = fs.readFileSync("./databases/" + roomid + ".json").toString();
    } catch (e) {
      console.log(e.message);
    }
    this.data[roomid] = JSON.parse(file);
  },

  importDatabases: function() {
    let databases = fs.readdirSync("./databases");
    for (let i = 0, len = databases.length; i < len; i++) {
      let file = databases[i];
      if (!file.endsWith(".json")) continue;
      this.importDatabase(file.substr(0, file.indexOf(".json")));
    }
  },

  exportDatabase: function(name) {
    if (!(name in this.data)) return;
    fs.writeFileSync(
      "./databases/" + name + ".json",
      JSON.stringify(this.data[name])
        .split("},")
        .join("},\n")
    );
  },


  importUsers: function() {
    if (!this.data["users"]) return console.log("No users registered");
    let users = Object.keys(this.data["users"]);
    for (let i = 0; i < users.length; i++) {
      this.add(this.data["users"][users[i]]);
    }
    console.log("Successfully imported users");
  },

  toId: function(str) {
    return str.replace(/[^A-Z0-9]/gi, "").toLowerCase();
  }
};

module.exports = Users;
