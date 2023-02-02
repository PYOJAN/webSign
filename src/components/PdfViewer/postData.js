import axios from "axios";

export function postData(data, coord) {
  const C = `${Math.ceil(coord.X)}, ${Math.ceil(coord.Y)}`;
  const S = `${Math.ceil(coord.W)}, ${Math.ceil(coord.H)}`;
  // console.log(data.split("data:application/pdf;base64,")[1]);
  var data = JSON.stringify({
    request: {
      command: "pkiNetworkSign",
      ts: "",
      txn: "TXN-262",
      certificate: {
        attribute: ["AP=1", "CN=", "SN=", "TC=SG"],
      },
      file: {
        attribute: ["type=pdf"],
      },
      pdf: {
        page: 1,
        cood: C,
        size: S,
        invisiablesign: "no",
        enableltv: "no",
        enabletimestamp: "no",
        location: "New Delhi",
        reason: "Tax Invoice",
        dateformat: "dd-MMM-yyyy hh:mm tt",
        customtext: "Your custome text here",
      },
      data: encodeURIComponent(data.split("data:application/pdf;base64,")[1]),
    },
  });

  var config = {
    method: "post",
    url: "http://127.0.0.1:1620",
    headers: {
      Accept:
        '"text/html,application/xhtml+xml,application/json,application/xml;q=0.9,image/webp,*/*;q=0.8":',
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log(response.data.response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}
