# School

A drop in replacement for Eris for bot's looking to migrate to discordeno. The public api usage is similar copy to Eris but behind the scenes it uses discordeno.

## Usage (WARNING THIS FRAMEWORK DOESN'T WORK YET, THIS IS JUST THE PLAN TO MAKE USAGE POSSIBLE)

```bash
npm i @discordeno/deris && npm uninstall eris
```

## Warning

- This plugin does not support small bots. It does not have REST/Sharding functionality. Instead it requires you to provide a proxy rest url and a proxy rest authorization. 
- Deleted any properties/methods/options related to REST/Sharding managers.
- Deleted [Client.bulkEditCommandPermissions](https://discord.com/developers/docs/interactions/application-commands#batch-edit-application-command-permissions)
- Deleted Client.getActiveThreads
- Deleted all User bot functionality
- Deleted Client.editNickname
- Deleted Client.getGuildAuditLogs
- Deleted Client.joinVoiceChannel

## To Do

- Read Me
- 

## Credits

https://github.com/abalabahaha/eris

## Eris License

The MIT License (MIT)

Copyright (c) 2016-2021 abalabahaha

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
