const { clearOutputFolder } = require("./clearfolder");
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

async function main() {
  clearOutputFolder("OUTPUT_HERE");

  // Call the conversion function
  await convertToEsm("PUT_JS_HERE", "OUTPUT_HERE");
}

main();

async function convertToEsm(src, dest) {
  const files = fs.readdirSync(src);

  for (const file of files) {
    const srcFile = path.join(src, file);
    const destFile = path.join(dest, file);

    // Copy the original JavaScript file to a new folder
    const destinationPath = path.join("OUTPUT_HERE/js", file);
    await fs.promises.copyFile(srcFile, destinationPath);

    if (fs.lstatSync(srcFile).isDirectory()) {
      // Recursively process directories
      if (!fs.existsSync(destFile)) {
        fs.mkdirSync(destFile);
      }
      await convertToEsm(srcFile, destFile);
    } else if (path.extname(file) === ".js") {
      // Convert JavaScript files to ESM using to-esm via child process
      await runToEsm(srcFile, dest);
    }
  }
}

async function runToEsm(srcFile, destDir) {
  return new Promise((resolve, reject) => {
    const child = spawn("npx", ["to-esm", srcFile, "--output", destDir]);

    child.stdout.on("data", (data) => {
      console.log(`stdout: ${data}`);
    });

    child.stderr.on("data", (data) => {
      console.error(`stderr: ${data}`);
    });

    child.on("close", (code) => {
      if (code === 0) {
        console.log(`Converted ${srcFile} to ${destDir}`);
        resolve();
      } else {
        reject(`Conversion failed with exit code ${code}`);
      }
    });
  });
}
