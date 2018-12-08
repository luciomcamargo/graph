import React from "react";
import Highcharts from "highcharts";
import Exporting from "highcharts/modules/exporting";
import HighchartsReact from "highcharts-react-official";
import axios from "axios";

Exporting(Highcharts);

export class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      briefdata: [],
      proposaldata: [],
      postlogdata: [],
      codes: []
    };
  }
  componentDidMount() {
    axios.get(`data.json`).then(res => {
      let briefdata = res.data.map(brief => brief.briefNetSpendInEuro);
      let proposaldata = res.data.map(proposal => proposal.proposalSpendInEuro);
      let postlogdata = res.data.map(postlog => postlog.postNetSpendInEuro);
      let codes = res.data.map(code => code.mip.code);

      this.setState({ briefdata: briefdata });
      this.setState({ proposaldata: proposaldata });
      this.setState({ postlogdata: postlogdata });
      this.setState({ codes: codes });
    });
  }

  render() {
    const { briefdata, proposaldata, postlogdata, codes } = this.state;
    const options = {
      title: {
        text: ""
      },
      chart: {
        type: "column",
        height: 590
      },
      colors: ["#74A146", "#F6AA3D", "#6E757B"],

      legend: {
        align: "center",
        verticalAlign: "top",
        layout: "horizontal",
        symbolRadius: 0
      },
      tooltip: {
        shared: true,
        useHTML: true,
        headerFormat: "<small>{point.key}</small><table>",
        pointFormat:
          '<tr><td style="color: {series.color}">{series.name}: </td>' +
          '<td style="text-align: right"><b>{point.y} €</b></td></tr>',
        footerFormat: "</table>",
        valueDecimals: 2
      },

      xAxis: {
        categories: codes,
        labels: {
          x: -10
        }
      },

      yAxis: {
        title: null,
        allowDecimals: false,
        tickAmount: 4,

        labels: {
          formatter: function() {
            return this.axis.defaultLabelFormatter.call(this) + " €";
          }
        }
      },

      series: [
        {
          id: 259,
          name: "Brief",

          data: briefdata
        },
        {
          id: 265,
          name: "Proposal",

          data: proposaldata
        },
        {
          id: 264,
          name: "Postlog Spend",

          data: postlogdata
        }
      ],

      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500
            },
            chartOptions: {
              legend: {
                align: "center",
                verticalAlign: "bottom",
                layout: "horizontal"
              },
              yAxis: {
                labels: {
                  align: "left",
                  x: 0,
                  y: -5
                },
                title: {
                  text: null
                }
              },
              subtitle: {
                text: null
              },
              credits: {
                enabled: false
              }
            }
          }
        ]
      }
    };
    return <HighchartsReact highcharts={Highcharts} options={options} />;
  }
}

export default Chart;
