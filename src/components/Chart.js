import React from "react";
import Highcharts from "highcharts";
import Exporting from "highcharts/modules/exporting";
import HighchartsReact from "highcharts-react-official";
import DarkUnica from "highcharts/themes/dark-unica";

//import addSteamGraph from "highcharts/modules/streamgraph";
//import addSeries from "highcharts/modules/series-label";
//import addAnnotations from "highcharts/modules/annotations";
//import addExporting from "highcharts/modules/exporting";

//addSteamGraph(Highcharts);
//addSeries(Highcharts);
//addAnnotations(Highcharts);
//addExporting(Highcharts);

Exporting(Highcharts);
DarkUnica(Highcharts);

function getData(n) {
  var arr = [],
    i,
    x,
    a,
    b,
    c,
    spike;
  for (
    i = 0, x = Date.UTC(new Date().getUTCFullYear(), 0, 1) - n * 36e5;
    i < n;
    i = i + 1, x = x + 36e5
  ) {
    if (i % 100 === 0) {
      a = 2 * Math.random();
    }
    if (i % 1000 === 0) {
      b = 2 * Math.random();
    }
    if (i % 10000 === 0) {
      c = 2 * Math.random();
    }
    if (i % 50000 === 0) {
      spike = 10;
    } else {
      spike = 0;
    }
    arr.push([x, 2 * Math.sin(i / 100) + a + b + c + spike + Math.random()]);
  }
  return arr;
}
var n = 500000,
  data = getData(n);

console.time("line");

const options = {
  chart: {
    zoomType: "x",
    height: 590
  },

  title: {
    text: "Highcharts drawing " + n + " points"
  },

  subtitle: {
    text: "Using the Boost module"
  },

  tooltip: {
    valueDecimals: 2
  },

  xAxis: {
    type: "datetime"
  },

  series: [
    {
      data: data,
      lineWidth: 0.5,
      name: "Hourly data points"
    }
  ]
};
console.timeEnd("line");

const Chart = () => (
  <HighchartsReact highcharts={Highcharts} options={options} />
);

export default Chart;
