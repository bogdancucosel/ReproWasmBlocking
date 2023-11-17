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

console.log('Start calling CreateFileSyncReadAsync from main.js');
await exports.MyClass.CreateFileSyncReadAsync("/testFromMain.txt");
console.log('End calling CreateFileSyncReadAsync from main.js');

document.getElementById('out').innerHTML = text;
document.getElementById('btn1').onclick = async () => {
    console.log('Start calling CreateFileSyncReadAsync from button click');
    await exports.MyClass.CreateFileSyncReadAsync("/testFromBtn1.txt");
    console.log('End calling CreateFileSyncReadAsync from button click');
};
await dotnet.run();