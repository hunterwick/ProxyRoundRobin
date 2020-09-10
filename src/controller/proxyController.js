const fs = require("fs");
const lineReader = require("line-reader");
const { resolve } = require("path");
const { rejects } = require("assert");

class proxieController {
  proxies = [];

  async init(filePath) {
    let eachLine = function (filePath, data, iteratee) {
      return new Promise((resolve, reject) => {
        lineReader.eachLine(filePath, iteratee, () => {
          resolve();
        });
      });
    };
    let data = [];
    await eachLine(filePath, data, (line) => {
      let splitedLine = line.split(":");

      //  console.log("SplitedLine", splitedLine);
      data.push({ ip: splitedLine[0], port: splitedLine[1] });
      //console.log("La line ", data);
    }).then(() => {
      //console.log("je suis apres", data);
      this.proxies = data.slice();
      // console.log("FUCKERY", this.proxies);
    });
  }
}

async function app() {
  let controller = new proxieController();
  await controller.init(
    "C:/Users/kalag/Desktop/handmadechecker/Cdiscount/data/proxies.txt"
  );
  console.log("OUSIDE", controller.proxies);
}

app();
