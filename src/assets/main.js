/**
 * This is a complex demo of how to set up a Highcharts chart, coupled to a
 * dynamic source and extended by drawing image sprites, wind arrow paths
 * and a second grid on top of the chart. The purpose of the demo is to inpire
 * developers to go beyond the basic chart types and show how the library can
 * be extended programmatically. This is what the demo does:
 *
 * - Loads weather forecast from www.yr.no in form of a JSON service.
 * - When the data arrives async, a Meteogram instance is created. We have
 *   created the Meteogram prototype to provide an organized structure of the
 *   different methods and subroutines associated with the demo.
 * - The parseData method parses the data from www.yr.no into several parallel
 *   arrays. These arrays are used directly as the data option for temperature,
 *   precipitation and air pressure.
 * - After this, the options structure is built, and the chart generated with
 *   the parsed data.
 * - On chart load, weather icons and the frames for the wind arrows are
 *   rendered using custom logic.
 */

 function Meteogram(json, container) {
    // Parallel arrays for the chart data, these are populated as the JSON file
    // is loaded
    this.symbols = [];
    this.humidity = [];
    this.winds = [];
    this.temperatures = [];
    this.pressures = [];

    // Initialize
    this.json = json;
    this.container = container;

    // Run
    this.parseData();
}



/**
 * Draw blocks around wind arrows, below the plot area
 */
Meteogram.prototype.drawBlocksForWindArrows = function (chart) {
    const xAxis = chart.xAxis[0];

    for (
        let pos = xAxis.min, max = xAxis.max, i = 0; pos <= max + 36e5; pos += 36e5,
        i += 1
    ) {

        // Get the X position
        const isLast = pos === max + 36e5,
            x = Math.round(xAxis.toPixels(pos)) + (isLast ? 0.5 : -0.5);

        // Draw the vertical dividers and ticks
        const isLong = this.resolution > 36e5 ?
            pos % this.resolution === 0 :
            i % 2 === 0;

        chart.renderer
            .path([
                'M', x, chart.plotTop + chart.plotHeight + (isLong ? 0 : 28),
                'L', x, chart.plotTop + chart.plotHeight + 32,
                'Z'
            ])
            .attr({
                stroke: chart.options.chart.plotBorderColor,
                'stroke-width': 1
            })
            .add();
    }

    // Center items in block
    chart.get('windbarbs').markerGroup.attr({
        translateX: chart.get('windbarbs').markerGroup.translateX + 8
    });

};

/**
 * Build and return the Highcharts options structure
 */
Meteogram.prototype.getChartOptions = function () {
    return {
        chart: {
            renderTo: this.container,
            marginBottom: 70,
            marginRight: 40,
            marginTop: 70,
            plotBorderWidth: 1,
            height: 400,
            alignTicks: false,
            scrollablePlotArea: {
                minWidth: 720
            }
        },

        defs: {
            patterns: [{
                id: 'precipitation-error',
                path: {
                    d: [
                        'M', 3.3, 0, 'L', -6.7, 10,
                        'M', 6.7, 0, 'L', -3.3, 10,
                        'M', 10, 0, 'L', 0, 10,
                        'M', 13.3, 0, 'L', 3.3, 10,
                        'M', 16.7, 0, 'L', 6.7, 10
                    ].join(' '),
                    stroke: '#68CFE8',
                    strokeWidth: 1
                }
            }]
        },

        title: {
            text: 'Hourly Weather (For Next 5 Days)',
            align: 'center',
            style: {
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis'
            }
        },

        credits: {
            text: 'Forecast from <a href="https://tomorrow.io">tomorrow.io</a>',
            href: 'https://tomorrow.io',
            position: {
                x: -40
            }
        },

        tooltip: {
            shared: true,
            useHTML: true,
            headerFormat: '<small>{point.x:%A, %b %e, %H:%M}</small>' +
                '<b>{point.point.symbolName}</b><br>'

        },

        xAxis: [{ // Bottom X axis
            type: 'datetime',
            tickInterval: 4 * 36e5, // four hours
            minorTickInterval: 36e5, // one hour
            tickLength: 0,
            gridLineWidth: 1,
            gridLineColor: 'rgba(128, 128, 128, 0.1)',
            startOnTick: true,
            endOnTick: true,
            minPadding: 0,
            maxPadding: 0,
            offset: 30,
            showLastLabel: true,
            labels: {
                format: '{value:%H}'
            },
            crosshair: true
        }, { // Top X axis
            linkedTo: 0,
            type: 'datetime',
            tickInterval: 24 * 3600 * 1000,
            labels: {
                format: '{value:<span style="font-size: 12px; font-weight: bold">%a</span> %b %e}',
                align: 'left',
                x: 3,
                y: -5
            },
            opposite: true,
            tickLength: 20,
            gridLineWidth: 0
        }],

        yAxis: [{ // temperature axis
            title: {
                text: null
            },
            labels: {
                format: '{value}°',
                style: {
                    fontSize: '10px'
                },
                x: -3
            },
            plotLines: [{ // zero plane
                value: 0,
                color: '#BBBBBB',
                width: 1,
                zIndex: 2
            }],
            maxPadding: 0.3,
            minRange: 8,
            tickInterval: 1,
            gridLineColor: 'rgba(128, 128, 128, 0.1)'

        }, { // humidity axis
            title: {
                text: null
            },
            labels: {
                enabled: false
            },
            gridLineWidth: 0,
            tickLength: 0,
            minRange: 10,
            min: 0

        }, { // Air pressure
            allowDecimals: false,
            title: { // Title on top of axis
                text: 'inHg',
                offset: 0,
                align: 'high',
                rotation: 0,
                style: {
                    fontSize: '10px',
                    color: "#f1af4c"
                },
                textAlign: 'left',
                x: 3
            },
            labels: {
                style: {
                    fontSize: '8px',
                    color: "#f1af4c"
                },
                y: 2,
                x: 3
            },
            gridLineWidth: 0,
            opposite: true,
            showLastLabel: false
        }],

        legend: {
            enabled: false
        },

        plotOptions: {
            series: {
                pointPlacement: 'between'
            }
        },


        series: [{
            name: 'Temperature',
            data: this.temperatures,
            type: 'spline',
            marker: {
                enabled: false,
                states: {
                    hover: {
                        enabled: true
                    }
                }
            },
            tooltip: {
                pointFormat: '<span style="color:{point.color}">\u25CF</span> ' +
                    '{series.name}: <b>{point.y}°F</b><br/>'
            },
            zIndex: 1,
            color: '#FF3333',
            negativeColor: '#48AFE8'
        }, {
            name: 'Humidity',
            data: this.humidity,
            type: 'column',
            color: '#7ab3ec',
            yAxis: 1,
            groupPadding: 0,
            pointPadding: 0,
            grouping: false,
            dataLabels: {
                enabled: !this.hasPrecipitationError,
                filter: {
                    operator: '>',
                    property: 'y',
                    value: 0
                },
                style: {
                    fontSize: '8px',
                    color: 'gray'
                }
            },
            tooltip: {
                valueSuffix: ' %'
            }
        }, {
            name: 'Air pressure',
            color: "#f1af4c",
            data: this.pressures,
            marker: {
                enabled: false
            },
            shadow: false,
            tooltip: {
                valueSuffix: ' inHg'
            },
            dashStyle: 'shortdot',
            yAxis: 2
        }, {
            name: 'Wind',
            type: 'windbarb',
            id: 'windbarbs',
            color: '#FF3333',
            lineWidth: 1.5,
            data: this.winds,
            vectorLength: 12,//18
            yOffset: -15,
            tooltip: {
                valueSuffix: ' mph'
            },
            gridLineWidth: 0
        }]
    };
};

/**
 * Post-process the chart from the callback function, the second argument
 * Highcharts.Chart.
 */
Meteogram.prototype.onChartLoad = function (chart) {
    this.drawBlocksForWindArrows(chart);
};

/**
 * Create the chart. This function is called async when the data file is loaded
 * and parsed.
 */
Meteogram.prototype.createChart = function () {
    this.chart = new Highcharts.Chart(this.getChartOptions(), chart => {
        this.onChartLoad(chart);
    });
};

Meteogram.prototype.error = function () {
    document.getElementById('loading').innerHTML =
        '<i class="fa fa-frown-o"></i> Failed loading data, please try again later';
};

/**
 * Handle the data. This part of the code is not Highcharts specific, but deals
 * with yr.no's specific data format
 */
Meteogram.prototype.parseData = function () {

    let pointStart;

    if (!this.json) {
        return this.error();
    }

    const timezone = new Date().getTimezoneOffset();
    Highcharts.setOptions({global:{
        timezoneOffset: timezone
    }})

    // Loop over hourly (or 6-hourly) forecasts
    this.json.forEach((node, i) => {

        const x = Date.parse(node.startTime), to = x + 36e5;
        
        this.temperatures.push({
            x,
            y: Math.round(node.values.temperature)
        });

        this.humidity.push({
            x,
            y: Math.round(node.values.humidity)
        });

        if (i % 2 === 0) {
            this.winds.push({
                x,
                value: node.values.windSpeed,
                direction: node.values.windDirection
            });
        }

        this.pressures.push({
            x,
            y: Math.round(node.values.pressureSeaLevel)
        });

        if (i === 0) {
            pointStart = (x + to) / 2;
        }
    });

    // Create the chart when the data is loaded
    this.createChart();
};
// End of the Meteogram protype


// On DOM ready...

function getWeatherChart(json,div_id) {
    // Set the hash to the yr.no URL we want to parse
    var meteogram = new Meteogram(json, div_id);
    return meteogram;
}

function getTempMinMax(futureData,div_id) {
    var ranges = []
    futureData.forEach((node, i) => {
        const x = Date.parse(node.startTime)
        ranges.push([
            x,
            node.values.temperatureMin,
            node.values.temperatureMax
        ]);
    });

    Highcharts.chart(div_id, {

        title: {
            text: 'Temperature Ranges (Min, Max)'
        },

        xAxis: {
            tickInterval: 24 * 3600 * 1000,
            type: 'datetime',
            accessibility: {
                rangeDescription: 'Range: From current to next 15 days'
            }
        },

        yAxis: {
            title: {
                text: null
            }
        },

        tooltip: {
            crosshairs: true,
            shared: true,
            valueSuffix: ' °F'
        },

        series: [{
            name: 'Temperatures',
            data: ranges,
            type: 'arearange',
            lineWidth: 2,
            linkedTo: ':previous',
            color: "#f1af4c",
            fillColor: {
                linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 1
                },
                stops: [
                    [0, "#f1af4c"],
                    [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                ]
            },
            zIndex: 0,
            marker: {
                enabled: true,
                fillColor: '#7ab3ec',
                lineWidth: 2,
                lineColor: '#7ab3ec'
            }
        }]
    });
}