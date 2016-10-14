### Objective
Run `node.js` and `npm` on windows without **admin** permission

### Explanation
It's common that in certain environments where you have restricted permissions and do not have administrative permissions, you may want
to install some GUI app or binary cli tools for dev use.

However, in such an instance you cannot use the installer which requires administrative permissions and would otherwise set up the PATH variable in Windows,
which you cannot change anyways without admin permissions.

### Advice for usage
Remember without permission, we cannot set the `%PATH%` env variable, it would better to open a cmd under the root of this respository.

> (shift right-click “Open command window here”)

Personally, i did this as a temporary hook applies to one cmd instance ONLY,

> set PATH=PATH\TO\THISREPO;\PATH\TO\SOMEOTHERREPOS;%PATH%

### Tips

Launch env variable window directly from CMD:

```batch
rundll32 sysdm.cpl,EditEnvironmentVariables
```

Launch system services from CMD:

```batch
services.msc [start/stop]
```

### Reference
https://codyswartz.us/wp/finds/node-js-stand-alone-portable-with-npm
