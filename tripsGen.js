const fs = require("fs");
const fnames = require("./fname.json");
const lnames = require("./lname.json");
const months = require("./months.json");
const city = require("./cities.json");
const states = require("./statesCode.json");

function RandomBirthDateGenerator() {
  var m = Math.floor(Math.random() * 100) % 11;
  var d = Math.floor(Math.random() * (28 - 1) + 1);
  var y = Math.floor(Math.random() * (2000 - 1960) + 1960);
  const temp = months[m] + " " + d + ", " + y + " 00:00:00";
  const bdate = new Date(temp);
  return bdate;
}

function RandomDriverIdGenerator() {
  var id = Math.floor(Math.random() * (999999 - 100000) + 100000);
  return Number(id);
}

function RandomFnameGenerator() {
  var a = Math.floor(Math.random() * (999 - 1) + 1);
  return fnames[a];
}
function RandomLnameGenerator() {
  var a = Math.floor(Math.random() * (999 - 1) + 1);
  return lnames[a];
}

function RandomLicenseGenerator() {
  var y = Math.floor(Math.random() * (2010 - 1960) + 1960);
  var z = Math.floor(Math.random() * 10000000);
  var c = Math.floor(Math.random() * (30 - 1) + 1);
  var s = Math.floor(Math.random() * 100) % 36;
  const licence = states[s] + c + " " + y + z;
  return licence;
}

function RandomRevenueGenerator() {
  return Math.floor(Math.random() * 1000);
}

function RandomCityGenerator() {
  const a = Math.floor(Math.random() * 100) % 9;
  return city[a];
}

function RandomTimeGenerator(year) {
  const ans = [];
  const ye = String(year);
  var x = Math.floor(Math.random() * 100) % 11;
  //    Math.random() * (max - min) + min; --> for generating random numbers in a range
  var y = Math.floor(Math.random() * (12 - 9) + 9);
  var z = Math.floor(Math.random() * (16 - 12) + 12);
  var d = Math.floor(Math.random() * (28 - 1) + 1);
  var m = Math.floor(Math.random() * (59 - 1) + 1);
  var m2 = Math.floor(Math.random() * (59 - 1) + 1);
  var s = Math.floor(Math.random() * (59 - 1) + 1);
  var s2 = Math.floor(Math.random() * (59 - 1) + 1);

  const temp = months[x] + " " + d + ", " + ye + " " + y + ":" + m + ":" + s;
  const temp2 = months[x] + " " + d + ", " + ye + " " + z + ":" + m2 + ":" + s2;
  const a = new Date(temp);
  const a2 = new Date(temp2);
  ans.push(a);
  ans.push(a2);
  return ans;
}

function RandomLocationGenerator() {
  const set = new Set();
  while (set.size < 2) {
    var arr = [];
    var x1 = Math.floor(Math.random() * (37 - 6) + 6);
    var x2 = Math.floor(Math.random() * (9999 - 1) + 1);
    x = x1 + "." + x2;
    var y1 = Math.floor(Math.random() * (97 - 68) + 68);
    var y2 = Math.floor(Math.random() * (9999 - 1) + 1);
    y = y1 + "." + y2;
    arr.push(x, y);
    set.add(arr);
  }
  const array = Array.from(set);
  return array;
}

// console.log(RandomLocationGenerator());
// console.log(RandomTimeGenerator(2023));
// console.log(RandomRevenueGenerator());
// console.log(RandomCityGenerator());
// console.log(RandomBirthDateGenerator());
// console.log(RandomLicenseGenerator());

function RandomDataGenerator(n) {
  const data = [];
  for (var i = 0; i < n; i++) {
    const tempTime = RandomTimeGenerator(2022);
    const temploc = RandomLocationGenerator(2, 23, 72);
    const tempRev = RandomRevenueGenerator();
    const tempCity = RandomCityGenerator();
    const temp = {
      tid: i + 1,
      stime: tempTime[0],
      etime: tempTime[1],
      sloc: temploc[0],
      eloc: temploc[1],
      revenue: tempRev,
      city: tempCity,
    };

    data.push(temp);
  }
  return data;
}

function RandomDriverDataGenerator(n) {
  const data = [];
  for (let i = 0; i < n; i++) {
    const did = RandomDriverIdGenerator();
    const fname = RandomFnameGenerator();
    const lname = RandomLnameGenerator();
    const bdate = RandomBirthDateGenerator();
    const dlno = RandomLicenseGenerator();
    var x = Math.floor(Math.random * 1000);
    const working = true;
    if (x % 69 == 0) {
      working = false;
    }
    const trips = RandomDataGenerator(360);

    const obj = {
      did: did,
      fname: fname,
      lname: lname,
      bdate: bdate,
      dlno: dlno,
      working: working,
      trips: trips,
    };
    data.push(obj);
  }
  return data;
}

const jsonContent = JSON.stringify(RandomDriverDataGenerator(100));

fs.writeFile("./final.json", jsonContent, "utf8", function (err) {
  if (err) {
    return console.log(err);
  }

  console.log("The file was saved!");
});
