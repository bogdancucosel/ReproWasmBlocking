// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

import { dotnet } from './_framework/dotnet.js'

const { setModuleImports, getAssemblyExports, getConfig } = await dotnet
    .withDiagnosticTracing(false)
    .withApplicationArgumentsFromQuery()
    .create();

setModuleImports('main.js', {
    window: {
        location: {
            href: () => globalThis.window.location.href
        }
    }
});

const config = getConfig();
const exports = await getAssemblyExports(config.mainAssemblyName);
const text = exports.MyClass.Greeting();
console.log(text);
await exports.MyClass.CreateFileSyncReadAsync("/testFromMain.txt");

document.getElementById('out').innerHTML = text;
document.getElementById('btn1').onclick = async () => {
    await exports.MyClass.CreateFileSyncReadAsync("/testFromBtn1.txt");
};
await dotnet.run();