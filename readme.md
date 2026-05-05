# Unity Model Task Viewer - Heart Lung Machine #

(c) 2026 May 4 Vienna Ly  
[![Creative Commons License](https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-nc-sa/4.0/)

## App description ##

Variant of BCIT Unity Task Viewer web handler for builds published by **MTV_identifyErrors Unity project** Engine v 2022.1.7f1.  

This web handler will:

- Handle Unity scene loading and comms
- Set up all the required browser-side UI elements

### Unity Model (pre-development) ###

The 3D asset is part of predevelopment, and managed in a separate repo for the project:

**Unity Project** Repo: [gihub heartLungCo2Flushing](https://github.com/vie74050/heartLungCo2Flushing)

The actual 3D model Unity files within `./uploads/Builds/[3D project name]/Build` are built from the **Unity Project**, and not part of the scope of this repo.  The project can build to a temp folder `src/Builds` -- this folder is not tracked.  

The Unity model `Build/` files should be put in `./uploads/Builds/[3D project name]/Build` and have the structure:

Each project folder should have the structure:

```text
[3D project name]
    |_ Build      --> the `gz` and/or `unityweb` files copied from Unity build
    |_ index.html --> from template, <table> content can be edited
    |_ .htaccess  --> for server headers, compression handling
```

- The `[3D project name]` should be descriptive of the Unity scene build.
- If the server can handle `gz` format, then the `unityweb` is not required.

Each Unity build will over-write `index.html`.  This is why we build first to `src/Builds` and only copy the `gz` and/or `unityweb`to `uploads/`.  

Move the `*.gz` or `*.unityweb` files only to the corresponding `uploads` folder:  
 `npm run mv-gz` or `npm run mv-unitweb`.

#### Loading WebGL ####

The `LoadUnity` code in `UnityLoaderSetup.ts` is for Unity WebGL builds from engine version 2022.x.  
Refer to the latest Unity engine documentation if another version of Unity editor was used for the build.

#### FromUnity handlers ####

**Naming convention**: Calls from Unity scene to web are handled by methods prefixed `FromUnity_` and must be in global scope:

- `window.FromUnity_ApplicationStarted`
- `window.FromUnity_Hover`
- `window.FromUnity_Select`
- `window.FromUnity_SetListItems`

These **must correspond** to the functions called in the **Unity Project** `Assets\Plugins\JSLibs`.

## DEVELOPMENT ##

Using npm and webpack. Use `npm install` to get started.

Using webpack will bundle src to `./uploads/src/`  

- For dev, use `npm run dev` to webpack for development watch mode.
- To stage or prod, use `npm run build` to bundle for production mode.

## CUSTOM CONTENT DEVELOPMENT ##

Custom scripts for activities should be put wuth the `uploads/Builds/[3D project name]` in the associated project.

### Checklist events ###

To listen for checklist events, add `data-event` to the list element:

```html

<li title="Click on the sink area" data-event="HandHygiene">Perform hand hygiene</li>

```

These can be handled in `custom.js` e.g:

```js

// look for list item with data-event matching objectName
const listItem = document.querySelector(`#scene-info li[data-event="${objectName}"]`);

```

## DEPLOYMENT ##

### GitHub Pages Option ###

To deploy to GitHub pages, use `npm run deploy` which will run `build` and upload the `uploads` folder to remote `gh-pages` branch.

For staging, the sources should point the `/uploads/src`.

#### Production Release ####

Use `npm run build:prod -- [year] [3D project name]`

1. Package any **custom** css and js in `uploads/Builds/[3D project name]`.
1. For live, all sources should point to a minified release version, i.e.

- `uploads/src-2026` 

Conventionally, the release version is the year.

### BCIT LMS (Private - requires access) Option ###

If deploying to Learning Hub instead of GitHub, manually upload the `./uploads/Builds` to LMS shared files `scripts/interactive/UnityModelTaskViewer_HeartLungMachine`.
