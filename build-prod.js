/** Pipeline code to process custom project code for release version*/

const fs = require("fs");
const fse = require("fs-extra");
const path = require("path");
const { execSync } = require("child_process");

const version = process.argv[2];
const project = process.argv[3];

if (!version || !project) {
    console.error("Usage: npm run build:prod -- <version> <project_name>");
    process.exit(1);
}

const root = __dirname;

// Paths
const srcDir = path.join(root, "uploads/src");
const versionedDir = path.join(root, `uploads/src-${version}`);
const projectDir = path.join(root, `uploads/Builds/${project}`);

// 1. Copy uploads/src → uploads/src-VERSION
console.log(`Copying ${srcDir} → ${versionedDir}`);
fse.copySync(srcDir, versionedDir, { overwrite: true });

// 2. Minify custom JS/CSS in uploads/Builds/[project]
const files = fs.readdirSync(projectDir);

let jsOutput = path.join(versionedDir, `${project}.min.js`);
let cssOutput = path.join(versionedDir, `${project}.min.css`);

files.forEach(file => {
    const fullPath = path.join(projectDir, file);

    if (fs.statSync(fullPath).isFile()) {
        if (file.endsWith(".js")) {
            console.log("Minifying JS:", file);
            execSync(`npx terser "${fullPath}" -o "${jsOutput}" --compress --mangle`);
        }

        if (file.endsWith(".css")) {
            console.log("Minifying CSS:", file);
            execSync(`npx cleancss -o "${cssOutput}" "${fullPath}"`);
        }
    }
});

console.log("Build post-processing complete.");