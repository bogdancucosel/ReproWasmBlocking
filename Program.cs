using System;
using System.IO;
using System.Runtime.InteropServices.JavaScript;
using System.Threading.Tasks;

// Console.WriteLine("Hello, Browser!");

public partial class MyClass
{
    //[JSExport]
    //internal static string Greeting()
    //{
    //    var text = $"Hello, World! Greetings from {GetHRef()}";
    //    Console.WriteLine(text);
    //    return text;
    //}

    [JSExport]
    public static async Task CreateFileSyncReadAsync(string path)
    {
        var text = "The text written to the file";
        File.WriteAllText(path, text);
        Console.WriteLine($"Sync written to file {path}: {text}");

        var textReadSync = File.ReadAllText(path);
        Console.WriteLine($"Sync read file {path}: {textReadSync}");

        Console.WriteLine("Will start to read async the file; this will block when called from onclick of the button...");
        var textReadAsync = await File.ReadAllTextAsync(path);
        Console.WriteLine($"Async read file {path}: {textReadAsync}");
    }

    //[JSImport("window.location.href", "main.js")]
    //internal static partial string GetHRef();
}
