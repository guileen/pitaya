function Request (msg, socket, session) {
  this.method = msg[0];
  this.url = msg[1];
  this.message = msg[2] || {};
  this.socket = socket;
  this.session = session;
}

Request.prototype.param = function(key) {
  return this.message[key] ||(this.params && this.params[key]);
}

module.exports = Request;
