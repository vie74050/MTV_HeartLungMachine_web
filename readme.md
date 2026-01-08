# Unity Model Task Viewer - Identify Errors #

(c) 2023 May 4 Vienna Ly  
[![Creative Commons License](https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-nc-sa/4.0/)

## App description ##

Variant of BCIT Unity Task Viewer web handler for builds published by **MTV_identifyErrors Unity project** Engine v 2022.1.7f1.  

This web handler will:

- Set up all the required browser-side UI elements
- Handle Unity scene loading and comms
- Read HTML table for optional description overrides for items specified in table

## DEVELOPMENT ##

Using npm and webpack. Use `npm install` to get started.

- For dev, use `npm run start` for watch mode.
- To updatet the code, build using `npm run build` will bundle the web scripts to `./uploads/src/`.  

### Unity model handlers ###

See `main.js`.  

#### Loading WebGL ####

The `LoadUnity` code in `LoaderSetup.ts` is for Unity WebGL builds from engine version 2022.x.  
Refer to the latest Unity engine documentation if another version of Unity editor was used for the build.

#### FromUnity handlers ####

Calls from Unity scene to web are handled by methods prefixed `FromUnity_` and must be in global scope:

- `window.FromUnity_ApplicationStarted`
- `window.FromUnity_Select`
- `window.FromUnity_SetListItems`

Which must correspond to the functions called in the **Unity Project** `Assets\Plugins\JSLibs`.

## DEPLOYMENT ##

### GitHub Pages Option ###

Deploy bundle to `uploads` folder, use `npm run deploy`.  
Webpack will package the bundles to `uploads`, and deploy to GitHub Pages (`gh-pages` branch).  

### BCIT LMS (Private - requires access) Option ###

If deploying to Learning Hub instead of GitHub, manually upload the `./uploads/Builds` to LMS shared files `scripts/interactive/UnityModelTaskViewer_HeartLungMachine`.

## Unity model set up ##

**Unity Project** Repo: [gihub heartLungCo2Flushing](https://github.com/vie74050/heartLungCo2Flushing)

The actual 3D model Unity files within `./uploads/Builds/[3D project name]/Build` are built from the **Unity Project**, and not part of the scope of this repo.

The Unity model should be put in `./uploads/Builds` and have the structure:

```text
[3D project name]
    |_ Build      --> the `gz` and/or `unityweb` files copied from Unity build
    |_ index.html --> loads src from server
    |_ local.html --> loads src from local built files
    |_ .htaccess  --> for server headers, compression handling
```

- The `[3D project name]` should be descriptive of the Unity scene build.
- If the server can handle `gz` format, then the `unityweb` is not required.

## Editable portion - html `<table>` ##

The `table` within the body intended to be be edited after build to include optional custom description overrides for items in the scene. Meant to be editable within LMS WYSIWYG editor so markup should be kept **barebones** table markup.

The first column is expected to be key string which references:

- game object name (as set up in Unity scene) or
- scene name (as set up in Unity) or
- prompt identifiers: `Info prompt`, `Show answers prompt`

The second column are the corresponding description texts.

### HTML Table Features ###

e.g.

| Name from Unity /keyword         | Description                                                                            |
|----------------------------------|----------------------------------------------------------------------------------------|
| Info prompt *                    | The prompt that appears with the inspection quiz before submit                         |
| Show answers prompt *            | The prompt that appears after user submits answer                                      |
| Scene 1                          | Scene start message for wrapped camera scene 1                                         |
| Game Object Name                 | Optional feedback description associated with normal tape, if user marked as unsterile |
| Game Object Name - ERROR         | Feedback description associated with unsterile tape                                    |

```html
  <table>
      <thead>
        <tr>
          <th>Name from Unity /keyword</th>
          <th>Description</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>Info prompt</td>
          <td>
            <p>Select all unsterile items, if any.</p>
          </td>
        </tr>
        <tr>
          <td>Show answers prompt</td>
          <td>
            <p>
              Hover over the icons to see the rationale of why the item is
              unsterile
            </p>
          </td>
        </tr>
        <tr>
          <td>Scene 1</td>
          <td>
            <p>Scene start message for wrapped camera scene 1</p>
          </td>
        </tr>
        <tr>
          <td>Game Object Name</td>
          <td>
            <p>Optional feedback description associated with normal tape, if user marked as unsterile</p>
          </td>
        </tr>
        <tr>
          <td>Game Object Name - ERROR</td>
          <td>
            <p>Feedback description associated with unsterile tape</p>
          </td>
        </tr>
      </tbody>
    </table>
```

> \* Info promp and Show answers prompt: These are special optional keywords to use to over-ride default prompt texts.
