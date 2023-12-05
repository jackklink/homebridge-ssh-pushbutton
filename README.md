homebridge-ssh-pushbubtton
==============

Supports triggering a single ssh command via a HomeKit Switch that acts like a Push Button on the HomeBridge platform.

## Installation

1. Install homebridge using: `npm install -g homebridge`
2. Install this plugin using: `npm install -g homebridge-ssh-pushbubtton`
3. Update your configuration file. See `sample-config.json` in this repository for a sample.

## Configuration

Configuration sample:

```
"accessories": [
	{
              "accessory": "SSH",
              "name": "iTunes Music",
              "command": "osascript -e 'tell application \"iTunes\" to play'",
              "ssh": {
                "user": "me",
                "host": "mymac",
                "port": 22,
                "password": "password (or use key)",
                "key": "path to private key file"
              }
	}
]
```
