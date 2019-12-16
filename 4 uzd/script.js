// 1.
function validateForm() {
  var x = document.forms["forma"]["vardas"].value;
  var num = document.forms["forma"]["age"].value;
  var day = document.forms["forma"]["day"].value;
  var month = document.forms["forma"]["month"].value;
  var year = document.forms["forma"]["year"].value;
  var slapt = document.forms["forma"]["slaptazodis"].value;

  if (x == "" || !isInt(num) || !checkDate(year, month, day)) {
    if (x == "") {
      alert("Name must be filled out");
    }
    if (!isInt(num)) {
      alert("Age must be a positive integer");
    }
    return false;
  }
  var rowCount = document.getElementById("lentele").rows.length;

  var row = $(
    "<tr><td>" +
      x +
      "</td><td>" +
      num +
      "</td><td>" +
      day +
      "-" +
      month +
      "-" +
      year +
      "</td></tr> "
  );

  if (x == "Arturas") {
    // 2.
    jQuery("#artur").show();
  }
  row.appendTo("#lentele tbody");
  $("#straipsnis").css("fontSize", rowCount + 5 + "px"); //3
  $("#straipsnis").append(" " + slapt + " ");
  return false;
}

function isInt(value) {
  return (
    !isNaN(value) &&
    parseInt(Number(value)) == value &&
    !isNaN(parseInt(value, 10)) &&
    parseInt(Number(value)) > 0
  );
}

function checkDate(yearStr, monthStr, dayStr) {
  if (yearStr != parseInt(yearStr)) {
    alert("Neteisingai įvesti metai");
    return false;
  }
  if (monthStr != parseInt(monthStr)) {
    alert("Neteisingas mėnuo");
    return false;
  }
  if (dayStr != parseInt(dayStr)) {
    alert("Neteisinga diena");
    return false;
  }

  year = parseInt(yearStr);
  month = parseInt(monthStr) - 1; // Sausis - 0
  day = parseInt(dayStr);
  var date = new Date(); //Date() obj

  if (month < 0 || month > 11) {
    alert("Neteisingas mėnuo");
    return false;
  }
  if (year < 1900 || year > 2020) {
    alert("Neteisingi metai");
    return false;
  }
  if (day < 1 || day > 31 || (month == 1 && day > 29)) {
    alert("Neteisinga diena");
    return false;
  }

  if (date.getDate() != day) {
    alert("Neteisinga diena");
    return false;
  }
  if (date.getMonth() != month) {
    alert("Neteisingas mėnuo");
    return false;
  }
  if (date.getFullYear() != year) {
    alert("Neteisingi metai");
    return false;
  }
  return true;
}

// 4.
function submitJson() {
  var name = document.forms["forma2"]["vardas"].value;
  var email = document.forms["forma2"]["email"].value;
  var city = document.forms["forma2"]["city"].value;

  $.ajax({
    url: "https://jsonblob.com/api/jsonBlob",
    data: JSON.stringify({
      name: name,
      email: email,
      city: city
    }),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    type: "POST"
  }).then(success, error);

  function success(res, status, jqXHR) {
    console.log(res);
    getJson(jqXHR.getResponseHeader("Location"));
  }

  function error(errorMsg) {
    console.log(errMsg);
  }
  return false;
}

function getJson(url) {
  $.ajax({
    url: url,
    method: "GET"
  }).then(success, error);

  function success(res, status, jqXHR) {
    console.log(res);
    var row = $(
      "<tr><td>" +
        res.name +
        "</td><td>" +
        res.email +
        "</td><td>" +
        res.city +
        "</td></tr> "
    );

    row.appendTo("#lentele2 tbody");
  }

  function error(errorMsg) {
    console.log(errMsg);
  }
}
