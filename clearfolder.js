// clear all subfolder

const fs = require("fs");
const path = require("path");

// Function to delete a directory and its contents
function deleteFolderRecursively(folderPath) {
  if (fs.existsSync(folderPath)) {
    fs.readdirSync(folderPath).forEach((file) => {
      const currentPath = path.join(folderPath, file);

      // Check if the path is a directory or file
      if (fs.lstatSync(currentPath).isDirectory()) {
        deleteFolderRecursively(currentPath);
      } else {
        // Delete file
        fs.unlinkSync(currentPath);
      }
    });

    // Remove the now-empty folder
    fs.rmdirSync(folderPath);
  }
}

// Function to get subfolders and clear the ones that match extensions
function clearSubfoldersWithExtensions(folderPath) {
  const subfolders = fs.readdirSync(folderPath).filter((file) => {
    const currentPath = path.join(folderPath, file);

    // Check if it's a directory and has a valid extension
    return fs.lstatSync(currentPath).isDirectory() && [".cjs", ".mjs", ".js"].includes(path.extname(file));
  });

  console.log("Subfolders to be cleared:", subfolders);

  // Clear all subfolders that match
  subfolders.forEach((subfolder) => {
    const subfolderPath = path.join(folderPath, subfolder);
    deleteFolderRecursively(subfolderPath);
  });
}

module.exports = {
  clearOutputFolder: clearSubfoldersWithExtensions,
};
