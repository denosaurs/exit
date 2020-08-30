# exit

[![Tags](https://img.shields.io/github/release/denosaurs/exit)](https://github.com/denosaurs/exit/releases)
[![CI Status](https://img.shields.io/github/workflow/status/denosaurs/exit/check)](https://github.com/denosaurs/exit/actions)
[![License](https://img.shields.io/github/license/denosaurs/exit)](https://github.com/denosaurs/exit/blob/master/LICENSE)

Handle `SIGQUIT`, `SIGINT`, and `SIGTERM` in your application.

---

> ⚠️ Signals are still not very well supported in deno. As APIs become more

---

## stable this library will be updated. Currently not supported for windows

```typescript
import { onExit, exit } from "https://deno.land/x/exit/mod.ts";

onExit(() => {
  console.log("Program is exiting, doing some cleanup!");
});

onExit(async () => {
  console.log("I will be called after the first one!");
});

exit(0); // needed as signal hooks need to be disposed
```

## Other

### Contribution

Pull request, issues and feedback are very welcome. Code style is formatted with deno fmt and commit messages are done following Conventional Commits spec.

### Licence

Copyright 2020-present, the denosaurs team. All rights reserved. MIT license.
