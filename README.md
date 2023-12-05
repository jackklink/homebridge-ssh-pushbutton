homebridge-ssh-pushbubtton
==============

Supports triggering a single ssh command via a HomeKit Switch that acts like a Push Button on the HomeBridge platform.

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
