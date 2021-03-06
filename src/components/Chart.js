import React from 'react';
import Highcharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios';

Exporting(Highcharts);

function justifyColumns(chart) {
  var categoriesWidth =
      chart.plotSizeX / (1 + chart.xAxis[0].max - chart.xAxis[0].min),
    distanceBetweenColumns = 0,
    each = Highcharts.each,
    sum,
    categories = chart.xAxis[0].categories,
    number;

  for (var i = 0; i < categories.length; i++) {
    sum = 0;
    each(chart.series, function(p, k) {
      if (p.visible) {
        each(p.data, function(ob, j) {
          if (ob.category == categories[i] && ob.y !== null) {
            sum++;
          }
        });
      }
    });

    distanceBetweenColumns = categoriesWidth / (sum + 1);
    number = 1;

    each(chart.series, function(p, k) {
      if (p.visible) {
        each(p.data, function(ob, j) {
          if (ob.category == categories[i] && ob.y !== null) {
            if (sum !== chart.series.length) {
              ob.graphic.element.x.baseVal.value =
                i * categoriesWidth +
                distanceBetweenColumns * number -
                ob.pointWidth / 2;
            }

            number++;
          }
        });
      }
    });
  }
}

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

      this.setState({
        briefdata: briefdata,
        proposaldata: proposaldata,
        postlogdata: postlogdata,
        codes: codes
      });
    });
  }

  render() {
    const { briefdata, proposaldata, postlogdata, codes } = this.state;
    Highcharts.setOptions({
      lang: {
        decimalPoint: ',',
        thousandsSep: '.'
      }
    });
    const options = {
      title: {
        text: ''
      },
      chart: {
        type: 'column',
        height: 540,
        events: {
          render() {
            justifyColumns(this);
          }
        }
      },
      colors: ['#74A146', '#F6AA3D', '#6E757B'],

      legend: {
        align: 'center',
        verticalAlign: 'top',
        layout: 'horizontal',
        symbolRadius: 0
      },
      tooltip: {
        shared: true,
        useHTML: true,
        headerFormat: '<small>{point.key}</small><table>',
        pointFormat:
          '<tr><td style="color: {series.color}">{series.name}: </td>' +
          '<td style="text-align: right"><b>{point.y}€</b></td></tr>',
        footerFormat: '</table>',
        valueDecimals: 2
      },
      plotOptions: {
        series: {
          pointPadding: 0,
          groupPadding: 0
        }
      },
      credits: {
        enabled: false
      },

      xAxis: {
        categories: codes,
        labels: {
          formatter: function() {
            if (this.value === 'ALJ') return this.value + ' (QA)';
            else return this.value + ' (AE)';
          }
        }
      },

      yAxis: {
        title: null,
        allowDecimals: false,
        tickAmount: 4,
        tickPositions: [0, 10000, 20000, 30000],

        labels: {
          formatter: function() {
            return this.axis.defaultLabelFormatter.call(this) + ' €';
          }
        }
      },

      series: [
        {
          id: 259,
          name: 'Brief',

          data: briefdata
        },
        {
          id: 265,
          name: 'Proposal',

          data: proposaldata
        },
        {
          id: 264,
          name: 'Postlog Spend',

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
                align: 'center',
                verticalAlign: 'bottom',
                layout: 'horizontal'
              },
              yAxis: {
                labels: {
                  align: 'left',
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
