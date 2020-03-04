const fs = require("fs-extra");
const fsbasic = require("fs");
const concat = require("concat");

(async function build() {
  const files = [
    //"./dist/shared-web-components/runtime-es5.js",
    "../../dist/external/runtime-es5.js",
    //"./dist/shared-web-components/polyfills-es5.js",
    "../../dist/external/polyfills-es5.js",
    //"./dist/shared-web-components/main-es5.js"
    "../../dist/external/main-es5.js"
  ];
  await fs.ensureDir("../../dist/element/external/");
  await concat(files, "../../dist/element/external/external.js");
  await fs.copyFile(
    "../../dist/external/styles.css",
    "../../dist/element/external/styles.css"
  );
  const path = "../../dist/element/external/external.js";
  await fsbasic.access(path, fsbasic.F_OK, err => {
    if (err) {
      console.log(err);
      return;
    }
  });
})();
