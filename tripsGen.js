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
function New_Schema_RandomDataGenerator(n,did) {
  const data = [];
  for (var i = 0; i < n; i++) {
    const tempTime = RandomTimeGenerator(2022);
    const temploc = RandomLocationGenerator(2, 23, 72);
    const tempRev = RandomRevenueGenerator();
    const tempCity = RandomCityGenerator();
    const temp = {
      tid: did +i + 1,
      did: did,
      stime: tempTime[0],
      etime: tempTime[1],
      sloc: temploc[0],
      eloc: temploc[1],
      revenue: tempRev,
      city_id: tempCity.id,
    };

    data.push(temp);
  }
  return data;
}



function RandomDriverDataGenerator(n, min, max) {
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

    const trips = RandomDataGenerator(Math.floor(Math.random() * (max - min) + min));

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

function New_Schema_RandomDriverDataGenerator(n, min, max) {
  const drivers = [];
  const new_trips =[];
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

    const trips = New_Schema_RandomDataGenerator(Math.floor(Math.random() * (max - min) + min), did);

    const obj = {
      did: did,
      fname: fname,
      lname: lname,
      bdate: bdate,
      dlno: dlno,
      working: working,
    };

    drivers.push(obj);
    trips.forEach((e)=>{
      new_trips.push(e)
    })
    

  }
  return [drivers,new_trips];
}


const New_jsonContent = New_Schema_RandomDriverDataGenerator(360,120,360);


fs.writeFile("./new_drivers.json", JSON.stringify(New_jsonContent[0]), "utf8", function (err) {
  if (err) {
    return console.log(err);
  }
  console.log("The Drivers file was saved!");
});

fs.writeFile("./new_Trips.json", JSON.stringify(New_jsonContent[1]), "utf8", function (err) {
  if (err) {
    return console.log(err);
  }

  console.log("The Trips file was saved!");
});


// const jsonContent = JSON.stringify(RandomDriverDataGenerator(360,120,360));

// fs.writeFile("./newData.json", jsonContent, "utf8", function (err) {
//   if (err) {
//     return console.log(err);
//   }

//   console.log("The file was saved!");
// });
