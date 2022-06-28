const esbuild = require("esbuild");

Promise.all([
  esbuild.build({
    entryPoints: ["server/api.js"],
    bundle: true,
    outfile: "build/api.js",
    platform: "node",
  })
])
.then(() => {
  const fs = require("fs");
  const publicFiles = fs.readdirSync("public");
  fs.mkdirSync(`build/public`);
  const viewsFiles = fs.readdirSync("views");
  fs.mkdirSync(`build/views`);
  const extraResourcesFile = fs.readdirSync("extraResources");
  fs.mkdirSync(`build/extraResources`)
  return Promise.all([
    ...publicFiles.map((file) => {
      return new Promise((resolve) =>
        fs.copyFile(
          `public/${file}`,
          `build/public/${file}`,
          resolve
        )
      );
    }),
    ...viewsFiles.map((file) => {
      return new Promise((resolve) =>
        fs.copyFile(
          `views/${file}`,
          `build/views/${file}`,
          resolve
        )
      );
    }),
    ...extraResourcesFile.map((file) => {
      return new Promise((resolve) =>
        fs.copyFile(
          `extraResources/${file}`,
          `build/extraResources/${file}`,
          resolve
        )
      );
    }),
  ]);
})
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
