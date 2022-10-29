//var pollingCheckbox = document.getElementById('enablePolling');
//var pollingInput    = 1       //document.getElementById('pollingTime');

$(function() {

    function loadLatestMeasurements(settings) {

    // Insert a div for the current time in the summary.
    $('#summary').html('<h2>OSTATNIE POMIARY:</h2>');
    
    // Load the latest air10  - air qualitty SDS011
    $.getJSON('data/latest/pm10', function(devices) {
      $.each(devices, function(device, data) {
      //Insert the most recent measurements into the #summary div.
        $('#summary').append('<div id="' + device + '">' + device + ' (air quality): <span class="measurement">' + data[1] + ' mg/m3 </span> <span class="time">(' + Highcharts.dateFormat('%b %e, %Y - %H:%M', new Date(data[0])) + ')</span></div>');
      });
    });

    // Load the latest air25 data. - air qualitty SDS011
    $.getJSON('data/latest/pm25', function(devices) {
      $.each(devices, function(device, data) {
        // Insert the most recent measurements into the #summary div.
        $('#summary').append('<div id="' + device + '">' + device + ' (air quality): <span class="measurement">' + data[1] + ' mg/m3 </span> <span class="time">(' + Highcharts.dateFormat('%b %e, %Y - %H:%M', new Date(data[0])) + ')</span></div>');
      });
    });

    // Load the latest humidity data.DHT011
    $.getJSON('data/latest/humidity2', function(devices) {
      $.each(devices, function(device, data) {

        // Insert the most recent measurements into the #summary div.
        $('#summary').append('<div id="' + device + '">' + device + ' (humidity): <span class="measurement">' + data[1] + ' %</span> <span class="time">(' + Highcharts.dateFormat('%b %e, %Y - %H:%M', new Date(data[0])) + ')</span></div>');
      });
    });

    // Load the latest cpu temperature data.
    //$.getJSON('data/latest/cpu', function(devices) {
    //  $.each(devices, function(device, data) {
        // Insert the most recent measurements into the #summary div.
    //    $('#summary').append('<div id="' + device + '">' + device + ' (temperature): <span class="measurement">' + data[1] + ' &deg;' + settings['t_unit'] + '</span> <span class="time">(' + Highcharts.dateFormat('%b %e, %Y - %H:%M', new Date(data[0])) + ')</span></div>');
    //  });
    //});
    
    // Load the latest temperature data. ds1820 x n + DTH011
    $.getJSON('data/latest/temperature', function(devices) {
      $.each(devices, function(device, data) {

        // Insert the most recent measurements into the #summary div.
        $('#summary').append('<div id="' + device + '">' + device + ' (temperature): <span class="measurement">' + data[1] + ' &deg;' + settings['t_unit'] + '</span> <span class="time">(' + Highcharts.dateFormat('%b %e, %Y - %H:%M', new Date(data[0])) + ')</span></div>');
      });
    });

    // Load the latest noise data.     - PT8005
    $.getJSON('data/latest/noise', function(devices) {
      $.each(devices, function(device, data) {
        // Insert the most recent measurements into the #summary div.
        $('#summary').append('<div id="' + device + '">' + device + ' ( noise): <span class="measurement">' + data[1] + ' dB </span> <span class="time">(' + Highcharts.dateFormat('%b %e, %Y - %H:%M', new Date(data[0])) + ')</span></div>');
      });
    });
 
 };
 
 

function noiseMsg(settings) {
    // Load the latest noise
    $.getJSON('data/latest/noise', function(devices) {
      $.each(devices, function(device, data) {
      //Insert the most recent measurements into the #summary div.
        $('#noiseLabel').append("ha≈Ças "+data[1]+" dB");
      });
   });
 };
   

 function coto(settings) {

    // Insert a div for the current time in the summary.
    $('#coto').html('<h2>100</h2>');
 };

  /**
   * refresh.
   */
 //  setTimeout(function(){
 //      window.location.reload(1);
 //  }, 10*5000);

  /**
   * Initial chart setup.
   */
  function initialSetup(settings) {

    // Get the current time.
    var now = new Date();

    // Use local timezone.
    Highcharts.setOptions({
      global: {
        useUTC: false
      }
    });

    // Calculate freezing temperature based on temperature unit.
    var freezing = (settings['t_unit'] == 'F') ? 32 : 0;
     
    // Set up the Highcharts graph.
    var chart = new Highcharts.Chart({
    //container: {
      
       chart: {
        renderTo: 'graph',
        zoomType: 'xy'
      },
      title: {
        text: 'Odczyt miernika:'
      },
      subtitle: {
        text: document.ontouchstart === undefined ? 'Zazanacz okno w obszarze wykresu, aby powiekszyc' : 'åciúnij wykres, aby powiÍkszyÊ'
      },
      
      xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {
          minute: '%H:%M',
          hour: '%H:%M',
          day: '%b %e',
          week: '%b %e',
          month: '%b \'%y',
          year: '%Y'
        },
        gridLineWidth: 1,
        min: now.getTime() - 24 * 60 * 60 * 1000,  // Default visible range of 1 day.
        max: now.getTime()
        
     
      },
     
       yAxis: [{
        title: {
          text: 'PM 10 (mg/m3)'            //µg/m3
        },

        labels: {
          formatter: function() {
            return (this.value/1)   + ' mg/m3'
          },
        },


        plotBands: [{
          from: 0,                
          to:  50,               
          color: '#CCDDEE'
        }]


      },

      {
        title: {
          text: 'PM 25 (mg/m3)'
        },
        labels: {
          formatter: function() {
            return this.value + ' mg/m3'
          },
        }
       } 
      ],

       navigator: {
        enabled: true
      },
      
      rangeSelector: {
        enabled: true,
        buttons: [{
          type: 'day',
          count: 1,
          text: '1d'
        }, {
          type: 'day',
          count: 2,
          text: '2d'
        }, {
          type: 'day',
          count: 3,
          text: '3d'
        }, {
          type: 'day',
          count: 4,
          text: '4d'
        }, {
          type: 'day',
          count: 5,
          text: '5d'
        }, {
          type: 'all',
          text: 'razem'
        }]
      },
      

      scrollbar: {
        enabled: true
      },
      tooltip: {
        shared: true,
      },
      legend: {
        layout: 'vertical'
      },
      plotOptions: {
        series: {
          marker: {
            radius: 4
          }
        }
      },
    // }
    });
     
    
    // Turn the loading text on.
    chart.showLoading();

    // Load a list of PM sensing devices.
    $.getJSON('data/devices/pm10', function(devices) {

      // Iterate through the devices...
      $.each(devices, function(device, label) {

        // Turn the loading text on.
        chart.showLoading();

        // Load the device temperature data.
        $.getJSON('data/device/' + device + '/pm10', function(data) {

          // opis serii w etykiecie dynamicznie pojawia sie przy wykresie

          var series = {
            name: label + ' (PM10)',
            id: device,
            data: data,
            tooltip: {
              valueSuffix: ' mmg/m3'
            }
          }
          chart.addSeries(series);

          // Load flags.
          $.getJSON('data/device/' + device + '/flags', function(flags) {

            // If there are flags...
            if (flags.length > 0) {

              // Define series for flags.
              var series = {
                type: 'flags',
                name: label + ' (flags)',
                onSeries: device,
                data: flags,
              }

              // Add the series.
              chart.addSeries(series);
            }
          });

          // Redraw.
          chart.redraw();

          // Hide the loading text.
          chart.hideLoading();
        });
      });
    });

    // Load a list of temperature sensing devices.
    $.getJSON('data/devices/temperature', function(devices) {

      // Iterate through the devices...
      $.each(devices, function(device, label) {

        // Turn the loading text on.
        chart.showLoading();

        // Load the device temperature data.
        $.getJSON('data/device/' + device + '/temperature', function(data) {

          // opis serii w etykiecie dynamicznie pojawia sie przy wykresie

          var series = {
            name: label + ' (temp)',
            id: device,
            data: data,
            tooltip: {
              valueSuffix: '  C'
            }
          }
          chart.addSeries(series);

          // Load flags.
          $.getJSON('data/device/' + device + '/flags', function(flags) {

            // If there are flags...
            if (flags.length > 0) {

              // Define series for flags.
              var series = {
                type: 'flags',
                name: label + ' (flags)',
                onSeries: device,
                data: flags,
              }

              // Add the series.
              chart.addSeries(series);
            }
          });

          // Redraw.
          chart.redraw();

          // Hide the loading text.
          chart.hideLoading();
        });
      });
    });

    // Load a list of PM25 sensing devices.
    $.getJSON('data/devices/pm25', function(devices) {

      // Iterate through the devices...
      $.each(devices, function(device, label) {

        // Turn the loading text on.
        chart.showLoading();

        // Load the device humidity data.
        $.getJSON('data/device/' + device + '/pm25', function(data) {

          // opis serii w etykiecie dynamicznie pojawia sie przy wykresie
          var series = {
            name: label + ' (PM25)',
            id: device,
            data: data,
            dashStyle: 'dot',
            tooltip: {
              valueSuffix: 'mmg/m3'
            },
            yAxis: 1
          }
          chart.addSeries(series);

          // Redraw.
          chart.redraw();

          // Hide the loading text.
          chart.hideLoading();
        });
      });
    });
  }

  // Load Atmospi settings and begin!
  $.getJSON('settings', function(settings) {

    // Load the latest measurements. - tu zablokowane
    loadLatestMeasurements(settings);
   
    noiseMsg(settings);
    //loadPM10(settings);
   // coto(settings); 
    
    // Set up the graph.
    initialSetup(settings);
    
    //setTimeout();

    //if (pollingInput.value < 1 || !pollingInput.value) {
    //  pollingInput.value = 1;
    //}
    //urlInput.value = defaultData; //this.value
    // We recreate instead of using chart update to make sure the loaded CSV
    // and such is completely gone.
    //pollingCheckbox.onchange = urlInput.onchange = pollingInput.onchange = createChart;
    //pollingCheckbox.onchange =loadLatestMeasurements(settings) = pollingInput.onchange =initialSetup(settings) ;

  });
});
