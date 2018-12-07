import React from "react";
import Highcharts from "highcharts";
import Exporting from "highcharts/modules/exporting";
import HighchartsReact from "highcharts-react-official";
import DarkUnica from "highcharts/themes/dark-unica";
import axios from "axios";

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

export class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  componentDidMount() {
    axios.get(`http://localhost:3000/db.json`).then(res => {
      this.setState({ data: res.data });
    });
  }

  render() {
    const options = {
      chart: {
        type: "area"
      },
      title: {
        text:
          "Historic and Estimated Worldwide Population Distribution by Region"
      },
      subtitle: {
        text: "Source: Wikipedia.org"
      },
      xAxis: {
        categories: ["1750", "1800", "1850", "1900", "1950", "1999", "2050"],
        tickmarkPlacement: "on",
        title: {
          enabled: false
        }
      },
      yAxis: {
        title: {
          text: "Percent"
        }
      },
      tooltip: {
        pointFormat:
          '<span style="color:{series.color}">{series.name}</span>: <b>{point.percentage:.1f}%</b> ({point.y:,.0f} millions)<br/>',
        split: true
      },
      plotOptions: {
        area: {
          stacking: "percent",
          lineColor: "#ffffff",
          lineWidth: 1,
          marker: {
            lineWidth: 1,
            lineColor: "#ffffff"
          }
        }
      },
      series: [
        {
          name: "Asia",
          data: [502, 635, 809, 947, 1402, 3634, 5268]
        },
        {
          name: "Africa",
          data: [106, 107, 111, 133, 221, 767, 1766]
        },
        {
          name: "Europe",
          data: [163, 203, 276, 408, 547, 729, 628]
        },
        {
          name: "America",
          data: [18, 31, 54, 156, 339, 818, 1201]
        },
        {
          name: "Oceania",
          data: [2, 2, 2, 6, 13, 30, 46]
        }
      ]
    };
    return <HighchartsReact highcharts={Highcharts} options={options} />;
  }
}

export default Chart;
