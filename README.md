# Better Create Effect

Reason has been my DAW of choice for a long time, but although I love it to pieces it has some shortcomings in the keyboard shortcut department. Specifically, the interfaces for creating devices rely heavily on the mouse, which isn't particularly efficient and can be limited by your mouse or trackpad precision.

I was inspired by Ableton's easy Command-F search function, so I designed this Keyboard Maestro macro that emulates that.

![bce-demo](https://github.com/ebai101/better-create-effect/raw/master/resources/bce-demo.gif)

The JXA script `getPluginDb.scpt` searches the Reason menus to find every device listed in Reason, which is then output as JSON. The JSON is accessed by the HTML prompt from Keyboard Maestro, which allows for autocompletion in the search prompt.

The macro also keeps track of how many times you add a device, so your most used devices will filter to the top of your search results for easier use.

## Setup

Start by cloning the Github repo to your machine:

```shell
git clone https://github.com/ebai101/better-create-effect.git
```

You'll need to generate the database first. Make sure you have assistive access for Terminal enabled in System Preferences > Security & Privacy > Privacy:

<img src="https://github.com/ebai101/better-create-effect/raw/master/resources/systemprefs.png" alt="systemprefs" style="zoom:50%;" />

Once that's done, run these commands (with Reason open):

```shell
cd /path/to/better-create-effect
osascript getPluginDb.scpt > plugin_db.json
```

This will create the file `plugin_db.json` which contains metadata on every device available to Reason (including the built in devices). **Note:** I built this on Reason 11. If the script fails here, 

Now you can import the macro into Keyboard Maestro. At the top of the macro, you'll need to set the variable `BCEFolderLocation` to the absolute path of your better-create-effect folder:

![bcelocation](https://github.com/ebai101/better-create-effect/raw/master/resources/bcelocation.png)

Once this is done, you can set the hotkey and try it out!

## Troubleshooting

#### Errors when running `osascript`

If you already tried enabling assistive access for Terminal, and that didn't work, you can run it in Script Editor. Make sure assistive access is enabled for Script Editor, then open `getPluginDb.scpt` and run it. Copy the output in the Results pane, then paste that into a TextEdit document (or another text editor) and save the file as `plugin_db.json` in the better-create-object directory.

**If you're not using Reason 11,** you'll need to change the script slightly. Open `getPluginDb.scpt` in Script Editor. There's a line near the top that says:

```javascript
reason = Application('Reason 11');
```

Change the 'Reason 11' part to your Reason version (whatever the name of the application is on your system should be correct, i.e. if it's just called "Reason" then put that.)

## Todo

- Light and Blue theme
- Faster database rescan, possibly using Reason's cache files