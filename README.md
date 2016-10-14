# cv-from-msserver-dropbox (without msserver permission)

🔄 The *so...verbose* title illustrates it well

### Pain of xxx behind the scene

It's targetting at solving my personal pain of ass, as my typical worklow of updating resume looks like this:

( I'm a 🍎 user and i like MS office, but i don't the 💰 to purchase it )

1. Logged onto a MS Server
2. Open my cv and edit it using MS word
3. Save it & save it as pdf version
4. Upload both the `.docx` and `.pdf` version of CV to Dropbox to sync with my local PC

### Prerequisite

The scripts in this repo dependends on `node.js` and `npm`, so install the node.js & npm binaries first. They're already bundled with this repo - just is the `node` folder.

### How it works

It mainly takes advantage of the **awesome** `gulp.watch` api of the **awesome** streaming build system `gulp` to watch my actions/changes to CV(like editing and then hit saving). Then triggering series of other tasks, like generating the pdf version from the word version, and then sync all two versions to Dropbox.

| File | Description |
| --- | --- |
| `startup.bat` | It will be copied through `..\node bootstrap.js` towards the default startup folder of user on win7 `C:\Users\<user name>\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup`. This ensures that every time after the user logged in, the script `..\npm run gulp` will be auto executed as a mock of running a system sync service. It works as an alternative to the situation that user does not have the permission to touch system services on windows. |
| `path.json`   | After installation by `..\node bootstrap.js`, this file will be generated into this repo, it tells `gulpfile.js` the path to find the CV and the path **relative** to your Dropbox **root** repo to upload it to. It is the ONLY file you need to tweak after installation to the file you want to sync to dropbox on your own MS Server. |
| `saveAsPDF.js`| The  is a util script converting `.docx` file to `.pdf` file by running `cscript saveAsPDF.js <source> <target>` on MS CMD. |

### Install

1. download the `node` folder to local, assuming to the path called `%NODE_HOME%`
2. cd %NODE_HOME%
3. `git clone` this repo there
4. cd %THISREPO%
5. `..\node bootstrap.js` (only run it once)
6. change the empty `token` variable to your own [Dropbox token](https://www.dropbox.com/developers/reference/oauth-guide)
7. `..\npm run gulp` (only run it once)
8. all set, good to go!

### Node
[click here](/node) for more details
