
import path from "path";
import fs from "fs/promises";

import mri from "mri";
import { createCanvas, loadImage } from "canvas";


let options = mri(process.argv.slice(2), {
  boolean: ["open","verbose","recursive"],
  alias: {
    open: "o",
    recursive: "r"
  },
  default: {
    align: "auto",
    scale: 1
  }
});

let targetDir = options._[0] || ".";

let iconFiles = []; 

async function readdirRecurse(targetDir = ".") {
  
  let files = [];
  const entries = await fs.readdir(targetDir, { withFileTypes: true });

  for (let file of entries) {
    if (file.isDirectory()) {
      files = files.concat(await readdirRecurse(path.join(targetDir, file.name)));
    } else {
      files.push(path.join(targetDir, file.name));
    }
  }
  
  return files;
}

if (options.recursive) {
  iconFiles = await readdirRecurse(targetDir);
}
else {
  iconFiles = await fs.readdir(targetDir);
}

iconFiles = iconFiles.filter(fn => fn.toLowerCase().endsWith(".svg"));

console.log(iconFiles);

for (let iconFile of iconFiles) {
  
  let canvas = createCanvas(size, size);
  let ctx = canvas.getContext("2d");

}