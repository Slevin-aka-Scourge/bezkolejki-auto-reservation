const imaps = require("imap-simple");
async function cod(user, pass) {
  let cod;
  var config = {
    imap: {
      user: user,
      password: pass,
      host: "imap.rambler.ru",
      port: 993,
      tls: true,
      authTimeout: 3000,
    },
  };

  await imaps.connect(config).then(function (connection) {
    return connection.openBox("INBOX").then(function () {
      const searchCriteria = ["*"];
      const fetchOptions = {
        bodies: ["HEADER", "TEXT"],
        markSeen: false,
      };
      return connection
        .search(searchCriteria, fetchOptions)
        .then(function (messages) {
          let body = atob(messages[0].parts[1].body);
          //console.log(body)
          cod = body
            .match(/\=\".+\"\>/g)[0]
            .replace(/\r|\n|\t|\>|\<|\=|\"/g, "");
          console.log(cod);
          connection.end();
        });
    });
  });
  await cod;
  return cod;
}
module.exports.cod = cod;
