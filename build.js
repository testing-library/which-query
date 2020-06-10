#!/usr/bin/env node

// shamelessly copied from react devtools as it's doing exactly what i need.

const { execSync } = require("child_process");
const { readFileSync, writeFileSync, createWriteStream } = require("fs");
const { join } = require("path");
const { copy, ensureDir, move, remove } = require("fs-extra");
const archiver = require("archiver");
const { getGitCommit } = require("./git");

// These files are copied along with Webpack-bundled files
// to produce the final web extension
const STATIC_FILES = ["icons", "pages", "lib"];

const preProcess = async (destinationPath, tempPath) => {
  await remove(destinationPath); // Clean up from previously completed builds
  await remove(tempPath); // Clean up from any previously failed builds
  await ensureDir(tempPath); // Create temp dir for this new build
};

const build = async (tempPath, manifestPath) => {
  const binPath = join(tempPath, "bin");
  const zipPath = join(tempPath, "zip");

  const webpackPath = join(__dirname, "node_modules", ".bin", "webpack");
  execSync(
    `${webpackPath} --config webpack.config.js --output-path ${binPath}`,
    {
      cwd: __dirname,
      env: process.env,
      stdio: "inherit",
    }
  );
  // execSync(
  //   `${webpackPath} --config webpack.backend.js --output-path ${binPath}`,
  //   {
  //     cwd: __dirname,
  //     env: process.env,
  //     stdio: 'inherit',
  //   },
  // );

  // Make temp dir
  await ensureDir(zipPath);

  const copiedManifestPath = join(zipPath, "manifest.json");

  // Copy unbuilt source files to zip dir to be packaged:
  await copy(binPath, join(zipPath, "dist"));
  await copy(manifestPath, copiedManifestPath);
  await Promise.all(
    STATIC_FILES.map((file) => copy(join(__dirname, file), join(zipPath, file)))
  );

  const commit = getGitCommit();
  const dateString = new Date().toLocaleDateString();
  const manifest = JSON.parse(readFileSync(copiedManifestPath).toString());
  const versionDateString = `${manifest.version} (${dateString})`;
  if (manifest.version_name) {
    // eslint-disable-next-line babel/camelcase
    manifest.version_name = versionDateString;
  }
  manifest.description += `\n\nCreated from revision ${commit} on ${dateString}.`;

  writeFileSync(copiedManifestPath, JSON.stringify(manifest, null, 2));

  // Pack the extension
  const archive = archiver("zip", { zlib: { level: 9 } });
  const zipStream = createWriteStream(
    join(tempPath, "TestingLibraryDevTools.zip")
  );
  await new Promise((resolve, reject) => {
    archive
      .directory(zipPath, false)
      .on("error", (err) => reject(err))
      .pipe(zipStream);
    archive.finalize();
    zipStream.on("close", () => resolve());
  });
};

const postProcess = async (tempPath, destinationPath) => {
  const unpackedSourcePath = join(tempPath, "zip");
  const packedSourcePath = join(tempPath, "TestingLibraryDevTools.zip");
  const packedDestPath = join(destinationPath, "TestingLibraryDevTools.zip");
  const unpackedDestPath = join(destinationPath, "unpacked");

  await move(unpackedSourcePath, unpackedDestPath); // Copy built files to destination
  await move(packedSourcePath, packedDestPath); // Copy built files to destination
  await remove(tempPath); // Clean up temp directory and files
};

const main = async (buildId) => {
  const root = join(__dirname, buildId);
  const manifestPath = join(root, "manifest.json");
  const destinationPath = join(root, "build");

  try {
    const tempPath = join(__dirname, "build", buildId);
    await preProcess(destinationPath, tempPath);
    await build(tempPath, manifestPath);

    const builtUnpackedPath = join(destinationPath, "unpacked");
    await postProcess(tempPath, destinationPath);

    return builtUnpackedPath;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    // eslint-disable-next-line no-process-exit
    process.exit(1);
  }

  return null;
};

module.exports = main;
