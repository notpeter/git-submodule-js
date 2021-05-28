# git-submodule-js

This modules is git submodule file (.gitmodules) de/serializer in javascript.

## Install

```sh
$ npm install git-submodule-js
```

## Usage

### .gitmodules content
```
[submodule "DbConnector"]
	path = DbConnector
	url = https://github.com/chaconinc/DbConnector

[submodule "DbConnector2"]
	path = DbConnector2
	url = https://github.com/chaconinc/DbConnector2
```

### String to JSON

```typescript
import fs from 'fs';
const content = fs.readFileSync('.gitmodules', 'utf8');
const result = deserialize(content);

/*
result:
{
	"DbConnector": {
		"path": "DbConnector",
		"url": "https://github.com/chaconinc/DbConnector"
	},
	"DbConnector2" {
		"path": "DbConnector2",
		"url": "https://github.com/chaconinc/DbConnector2"
	}
}
*/
```

### JSON to String

```typescript
serialize(result);

/*
[submodule "DbConnector"]
	path = DbConnector
	url = https://github.com/chaconinc/DbConnector

[submodule "DbConnector2"]
	path = DbConnector2
	url = https://github.com/chaconinc/DbConnector2
*/
```

---

Thanks.
