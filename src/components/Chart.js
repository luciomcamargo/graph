import React from "react";
import Highcharts from "highcharts/highstock";
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
      title: {
        text: "My stock chart"
      },
      chart: {
        height: 590
      },
      series: [
        {
          data: this.state.data
        }
      ]
    };
    return (
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={"stockChart"}
        options={options}
      />
    );
  }
}

export default Chart;
