function Request (msg, socket) {
  this.method = msg[0];
  this.url = msg[1];
  this.message = msg[2];
  this.socket = socket;
}

Request.prototype.param = function(key) {
  return this.message[key];
}

module.exports = Request;
