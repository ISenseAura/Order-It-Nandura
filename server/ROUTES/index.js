var express = require("express");
var router = express.Router();
var app = express();
var db = require("../plugins/Users");
let uni = require("uniqid");

router.get("/err", (req, res) => {
  res.render("error.ejs", { msg: "<h1> Oops! Something went wrong.</h1>" });
});

router.get("/receipt", (req, res) => {
  res.render("receipt");
});

router.post("/orderpb", (req, res) => {
  let det = req.body;
  console.log(det);
  //let aa = det.others.split(",");
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  let OID = "M9" + Math.round(Math.random() * 1000) + uni.time();

  let order = {
    name: det.name,
    number: det.number,
    address: det.address,
    amount: det.total,
    onotes: det.notes ? det.notes : "None",
    email: det.email ? det.email : "Not Provided",
    //from : det.shop,
    //productID: aa[1],
    product: det.product,
    deliverycharge: 0,
    date: det.date.replace("GMT+0530 (India Standard Time)", ""),
    status: "PENDING..",
    orderID: OID,
    fullIP: ip,
    userIP: ip.split(",")[0]
  };

  console.log(order);
  if (!db.data["orders"]) db.data["orders"] = {};
  let ouid = db.toId(
    det.name
      .trim()
      .replace(" ", "")
      .toLowerCase() + det.number
  );
  console.log(ouid);
  if (!db.data["users"]) db.data["users"] = {};
  db.data["users"][ouid.replace(" ", "")] = { ip: order.userIP };

  if (!db.data["orders"][ouid]) db.data["orders"][ouid] = [];
  db.data["orders"][ouid].push(order);
  db.data["orders"][OID] = order;

  let hr = order.date.split(" ")[4].split(":")[0];
  hr = parseInt(hr);
  console.log(hr);
  if (hr > 20) {
    res.render("error.ejs", {
      msg:
        "<h1> Sorry! The Service is temporary closed</h1><p><center> <b>The Service time is between 4:30 PM - 9:00 PM <br> Try ordering tomorrow, Cya!</b></center>"
    });

    return;
  }

  res.render("receipt.ejs", {
    name: order.name,
    product: order.product,
    oid: order.orderID,
    address: order.address,
    number: order.number,
    date: order.date,
    amount: order.amount
  });

  let html = `<center> <h3> RECEIPT </h3> <br>
</center>
<div style="font-size:21px;padding:5px 5px 5px 5px;margin:20px 20px 20px 20px;border:1px solid black;">
  
  <strong> Customer Details </strong> <br>
  <hr/>
  <table>
  <b> Name : </b> ${order.name}<br><br>
  <b> Number : </b> ${order.number}<br><br>
  <b> Email : </b> ${order.email}<br><br>
  <b> Address : </b> ${order.address} <br><br>
  <b> Order : </b> ${order.product} <br><br>
  <b> From : </b> ${order.from} <br><br>
  <b> Order ID : </b> ${OID} <br><br>
  <b> Order Notes : </b> ${order.onotes} <br><br>
  <b> Date & Time : </b> ${order.date} <br><br>
  <hr/>
  <b> Total Amount : </b> ${order.amount}
  </table>
</div>
<br>
<center> <button style="background:lime;width:80%;height:50px;font-size:20px;"> <a href="https://mayurcodes.in/desiredhub"> Go Back To Website </a></button>`;

  if (order.address.toLowerCase().trim() !== "testing") {
    sendMayur2(
      {
        html: html
      },
      (error, result, fullResult) => {
        if (error) console.error(error);
        console.log(result);
      }
    );

    sendSuraj2(
      {
        html: html
      },
      (error, result, fullResult) => {
        if (error) console.error(error);
        console.log(result);
      }
    );

    sendShreyas2(
      {
        html: html
      },
      (error, result, fullResult) => {
        if (error) console.error(error);
        console.log(result);
      }
    );

    sendVivek2(
      {
        html: html
      },
      (error, result, fullResult) => {
        if (error) console.error(error);
        console.log(result);
      }
    );
  }

  db.exportDatabase("orders");
  db.exportDatabase("users");
});

router.get("/fuckya", function(req, res) {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  if (!db.data["visitors"]) db.data["visitors"] = {};
  let uip = ip.split(",")[0];
  if (!db.data["visitors"][uip])
    db.data["visitors"][uip] = { ip: ip, time: [] };
  db.data["visitors"][uip].time.push(
    Date().replace("GMT+0530 (India Standard Time)", "")
  );
  db.exportDatabase("visitors");
  let visits = Object.keys(db.data["visitors"]).length;
  let json = {
    news:
      "The App has been updated please reinstall it OR clear cache of the app | We are offering FREE delivery Order Now! | Please read our Terms & Conditions before ordering | The App is still in it's beta version so you might face some technical issues | Non-Veg and Cake are not available for now.",
    time: `<span style='color:lime;'> 4:30PM - 9:00PM (OPEN)</span> <br><span style='color:orange;'>IPs Visited : <span id="visits">${visits}</span></span>`
  };
  console.log(json);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.json(json);
});

router.get("/chinese", function(req, res) {
  let json = {
    manch: 70,
    noods: 70,
    paneer: 110,
    fryrice: 70,
    finger: 60,
    bhel: 80
  };
  console.log(json);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.json(json);
});

router.get("/south", function(req, res) {
  let json = {
    cheesepaneerdosa: 125,
    paneerdosa: 85,
    cheesedosa: 105,
    masaladosa: 55,
    sambharvada: 45,
    idli: 35
  };
  console.log(json);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.json(json);
});

router.post("/checkorders", function(req, res) {
  let det = req.body;
  let ouid = db.toId(
    det.name
      .trim()
      .replace(" ", "")
      .toLowerCase() + det.number
  );

  let orders = db.data["orders"];
  let list = orders[ouid];

  let html = "";

  list.forEach(order => {
    let tr = `  <tr>
    <td>${order.date.replace("GMT+0530 (India Standard Time)", "")}</td>
    <td>${order.product}</td>
    <td>${order.number}</td>
    <td>${order.address}</td>
    
    <td>${order.status}</td>
    <td><button onclick="showOrder('${order.orderID}','${order.productID}','${
      order.product
    }','${order.sizecolor}','${order.sizecolor}','1','${order.date}','${
      order.amount
    }','','${ouid}')"> CANCEL ORDER </button> </td>
  </tr>`;
    html += tr;
  });

  res.render("checkorders.ejs", { orders: html, user: ouid, err: "" });
});

router.post("/cancelorder", function(req, res) {
  let det = req.body;
  let orders = db.data["orders"];
  let o2 = false;
  let i = 0;
  orders[det.ouid].forEach(a => {
    if (a.orderID == det.oid) {
      o2 = a;
      i = orders[det.ouid].indexOf(a);
    }
  });
  let order = o2;
  console.log(o2);
  if (!(det.oid in orders) || !o2)
    return res.render("error.ejs", {
      msg: `<h1> The Order ID is wrong! </h1> <center> <b> We could not find any orders with order id "${det.oid}""`
    });

  if (orders[det.oid].status == "CANCELLED" || o2.status == "CANCELLED")
    return res.render("error.ejs", {
      msg: `<h1> That Order is already cancelled! </h1> <center> <b> You have already cancelled the order with order id "${det.oid}""`
    });
  db.data["orders"][det.oid].status = "CANCELLED";
  db.data["orders"][det.ouid][i].status = "CANCELLED";
  db.exportDatabase("orders");
  let html = `<center> <h1> ORDER CANCELLED </h1> <br>
</center>
<div style="font-size:21px;padding:5px 5px 5px 5px;margin:20px 20px 20px 20px;border:1px solid black;">
  
  <strong> Customer Details </strong> <br>
  <hr/>
  <table>
  <b> Name : </b> ${order.name}<br><br>
  <b> Number : </b> ${order.number}<br><br>
  <b> Email : </b> ${order.email}<br><br>
  <b> Address : </b> ${order.address} <br><br>
  <b> Order : </b> ${order.product} <br><br>
  <b> From : </b> ${order.from} <br><br>
  <b> Order ID : </b> ${det.oid} <br><br>
  <b> Order Notes : </b> ${order.onotes} <br><br>
  <b> Date & Time : </b> ${order.date} <br><br>
  <hr/>
  <b> Total Amount : </b> ${order.amount}
  </table>
</div>
<br>
<center> <button style="background:lime;width:80%;height:50px;font-size:20px;"> <a href="https://mayurcodes.in/desiredhub"> Go Back To Website </a></button>`;

  sendMayur3(
    {
      html: html
    },
    (error, result, fullResult) => {
      if (error) console.error(error);
      console.log(result);
    }
  );

  sendSuraj2(
    {
      html: html
    },
    (error, result, fullResult) => {
      if (error) console.error(error);
      console.log(result);
    }
  );

  sendShreyas2(
    {
      html: html
    },
    (error, result, fullResult) => {
      if (error) console.error(error);
      console.log(result);
    }
  );

  sendVivek2(
    {
      html: html
    },
    (error, result, fullResult) => {
      if (error) console.error(error);
      console.log(result);
    }
  );

  res.render("error.ejs", {
    msg: `<h1> The Order has been cancelled! </h1> <center> <b> You have successfully cancelled the order with order id "${det.oid}""`
  });
});

router.get("/", function(req, res) {
  res.render("index", { comments: "test" });
});

module.exports = router;
