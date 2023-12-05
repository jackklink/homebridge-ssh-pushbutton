var Service;
var Characteristic;

var ssh = require('ssh-exec'),
    assign = require('object-assign');

module.exports = function(homebridge) {
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  homebridge.registerAccessory('homebridge-ssh', 'SSH', SshAccessory);
}

function SshAccessory(log, config) {
  this.log = log;
  this.service = 'Switch';

  this.name = config['name'];
  this.command = config['command'];
  this.ssh = assign({
    user: config['user'],
    host: config['host'],
    password: config['password'],
    key: config['key']
  }, config['ssh']);
}

SshAccessory.prototype.setState = function(powerOn, callback) {
  var accessory = this;
  var state = powerOn ? 'on' : 'off';

  var stream = ssh(accessory.command, accessory.ssh);

  stream.on('error', function (err) {
    accessory.log('Error: ' + err);
    callback(err || new Error('Error setting ' + accessory.name + ' to ' + state));
  });

  stream.on('finish', function () {
    accessory.log('Set ' + accessory.name + ' to ' + state);
    callback(null);
  });
}

SshAccessory.prototype.getState = function(callback) {
  var accessory = this;
  callback(null);
}

SshAccessory.prototype.getServices = function() {
  var informationService = new Service.AccessoryInformation();
  var switchService = new Service.Switch(this.name);

  informationService
  .setCharacteristic(Characteristic.Manufacturer, 'SSH Manufacturer')
  .setCharacteristic(Characteristic.Model, 'SSH Model')
  .setCharacteristic(Characteristic.SerialNumber, 'SSH Serial Number');

  var characteristic = switchService.getCharacteristic(Characteristic.On)
  .on('set', this.setState.bind(this));

  return [switchService];
}
