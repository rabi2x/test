//var pollingCheckbox = document.getElementById('enablePolling');
//var pollingInput    = 1       //document.getElementById('pollingTime');
//var exec = require('child_process').exec;

var timeout = 0;
var interval = 0;
var getNOISE = 0;

var now = new Date();
var miliSEC = 1000   //  1sec = 1000 ms

$(function() {

    doTimeout();
    doInterval();
    setInterval(doInterval, miliSEC);
    //setInterval( noiseMsg(settings),miliSEC);


 function loadLatestMeasurements(settings) {

    // Insert a div for the current time in the summary.
    $('#summary').html('<h2>OSTATNIE POMIARY REJESTROWANE:</h2>');
    
    /* Load the latest air10  - air qualitty SDS011 */ 
    $.getJSON('data/latest/pm10', function(devices) {
      $.each(devices, function(device, data) {
      //Insert the most recent measurements into the #summary div.
        $('#summary').append('<div id="' + device + '">' + device + ' (air quality): <span class="measurement">' + data[1] + ' mg/m3 </span> <span class="time">(' + Highcharts.dateFormat('%b %e, %Y - %H:%M', new Date(data[0])) + ')</span></div>');
      });
    });
    
    /* Load the latest air25 data. - air qualitty SDS011 */
    $.getJSON('data/latest/pm25', function(devices) {
      $.each(devices, function(device, data) {
        // Insert the most recent measurements into the #summary div.
        $('#summary').append('<div id="' + device + '">' + device + ' (air quality): <span class="measurement">' + data[1] + ' mg/m3 </span> <span class="time">(' + Highcharts.dateFormat('%b %e, %Y - %H:%M', new Date(data[0])) + ')</span></div>');
      });
    });
    
    /* Load the latest noise data.     - PT8005   */
    $.getJSON('data/latest/noise', function(devices) {
      $.each(devices, function(device, data) {
        // Insert the most recent measurements into the #summary div.
        $('#summary').append('<div id="' + device + '">' + device + ' ( noise): <span class="measurement">' + data[1] + ' dB </span> <span class="time">(' + Highcharts.dateFormat('%b %e, %Y - %H:%M', new Date(data[0])) + ')</span></div>');
      });
    });
	
    /* Load the latest humidity data.DHT011 */
    $.getJSON('data/latest/humidity3', function(devices) {
      $.each(devices, function(device, data) {
        // Insert the most recent measurements into the #summary div.
        $('#summary').append('<div id="' + device + '">' + device + ' (humidity): <span class="measurement">' + data[1] + ' %</span> <span class="time">(' + Highcharts.dateFormat('%b %e, %Y - %H:%M', new Date(data[0])) + ')</span></div>');
      });
    });
     
    /* Load the latest temperature cpu, ds1820 x n + DTH011 
    $.getJSON('data/latest/temperature', function(devices) { 
      $.each(devices, function(device, data) {
      // Insert the most recent measurements into the #summary div.
        $('#summary').append('<div id="' + device + '">' + device + ' (temperature): <span class="measurement">' + data[1] + ' &deg;' + settings['t_unit'] + '</span> <span class="time">(' + Highcharts.dateFormat('%b %e, %Y - %H:%M', new Date(data[0])) + ')</span></div>');
     });
    });
    */
   
    /* Load the latest cpu temperature data. */
    $.getJSON('data/latest/cpu', function(devices) {
      $.each(devices, function(device, data) {
         // Insert the most recent measurements into the #summary div.
       $('#summary').append('<div id="' + device + '">' + device + ' (temperature): <span class="measurement">' + data[1] + ' &deg;' + settings['t_unit'] + '</span> <span class="time">(' + Highcharts.dateFormat('%b %e, %Y - %H:%M', new Date(data[0])) + ')</span></div>');
      });
    });
 };
 
 function doTimeout(){
    $('#timeout').html(timeout);
    //timeout++;
    timeout = noiseGet();      //isTime(); //now.getTime();
    setTimeout(doTimeout, 1000);
 };

 function doInterval(){
    $('#interval').html(interval);
    interval++;
 };

 function doNoise(){
    $('#getNOISE').html(getNOISE);
    getNOISE = noiseGet(settings); 
    setTimeout(doNoise, 1000);
 };

// --- procedura wyswietla ostatni pomiar NOISE [noiseLabel - etykieta na index.html ]
function noiseMsg(settings) {
    // Load the latest noise
    $.getJSON('data/latest/noise', function(devices) {
      $.each(devices, function(device, data) {
      //Insert the most recent measurements into the #summary div.
        $('#noiseLabel').append("ha??as "+data[1]+" dB");
      });
   });
 };
// https://stackoverflow.com/questions/11849387/javascript-setinterval-with-getjson
function noiseGet(settings) {
    // Load the latest noise
    $.getJSON('data/latest/noise', function(devices) {
      $.each(devices, function(device, data) {
      //Insert the most recent measurements into the #summary div.
      var me = this;
     
      me.pomiar.append(data[1]);
      //$('#getNOISE').html(pomiar);
      return me.pomiar;

      });
   });
 };
   

// --- procedura wyswietla ostatni pomiar pm10 [ pm10Label - etykieta na index.html ]
function pm10Msq(settings) {
    // Load the latest pm10
    $.getJSON('data/latest/pm10', function(devices) {
      $.each(devices, function(device, data) {
      //Insert the most recent measurements into the #summary div.
        $('#pm10Label').append("PM10 "+data[1]+" mg");
      });
   });
 };

function isTime() {
        var currentTime = new Date();
        var hours = currentTime.getHours();
        var minutes = currentTime.getMinutes();
        var seconds = currentTime.getSeconds();
        if (minutes < 10){
            minutes = "0" + minutes;
        }
        if (seconds < 10){
            seconds = "0" + seconds;
        }
        var v = hours + ":" + minutes + ":" + seconds + " ";
        if(hours > 11){
            v+="PM";
        } else {
            v+="AM"
        }
        return v;
        
 };

function update2Time() {
        var currentTime = new Date();
        var hours = currentTime.getHours();
        var minutes = currentTime.getMinutes();
        var seconds = currentTime.getSeconds();
        if (minutes < 10){
            minutes = "0" + minutes;
        }
        if (seconds < 10){
            seconds = "0" + seconds;
        }
        var v = hours + ":" + minutes + ":" + seconds + " ";
        if(hours > 11){
            v+="PM";
        } else {
            v+="AM"
        }
        //setTimeout("update2Time()",1000);
        //document.getElementById('timeIS').innerHTML=v;
        //return v;
        $('#timeIS').append(v);
 };
      
 function wyswietlTekst(settings) {
    // Insert a div for the current time in the summary.
    $('#coto').html('100');
 };

//const child = exec("cat /sys/class/thermal/thermal_zone0/temp", function (error, stdout, stderr) {
//    if (error !== null) {
//       console.log('exec error: ' + error);
//    } else {
//      $('#tCPU').append(stdout/1000);   
//    }
// });
 
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
        text: document.ontouchstart === undefined ? 'Zaznacz okno w obszarze wykresu' : '?ci?nij wykres, aby powi?kszy?'
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
          text: 'PM 10 (?g/m3)'            //?g/m3
        },

        labels: {
          formatter: function() {
            return (this.value/1)   + ' ?g/m3'
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
          text: 'PM 25 (?g/m3)'
        },
        labels: {
          formatter: function() {
            return this.value + ' ?g/m3'
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

  // ================================================================================================= wykresy 
  // ....................................................lista NOISE z flagami
    $.getJSON('data/devices/szum', function(devices) {

      // Iterate through the devices...
      $.each(devices, function(device, label) {

        // Turn the loading text on.
        chart.showLoading();

        // Load  data.
        $.getJSON('data/device/'+device+'/szum', function(data) {

          // opis serii w etykiecie dynamicznie pojawia sie przy wykresie
          var series = {
            name: label + ' (ha?as)',
            id: device,
            data: data,
            dashStyle: 'dot',
            tooltip: {
              valueSuffix: 'dB'
            },
            yAxis: 1
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

  // ....................................................lista CPU.temp z flagami
    $.getJSON('data/devices/procesorek', function(devices) {

      // Iterate through the devices...
      $.each(devices, function(device, label) {

        // Turn the loading text on.
        chart.showLoading();

        // Load  data.
        $.getJSON('data/device/'+device+'/procesorek', function(data) {

          // opis serii w etykiecie dynamicznie pojawia sie przy wykresie
          var series = {
            name: label + ' temp.',
            id: device,
            data: data,
            dashStyle: 'dot',
            tooltip: {
              valueSuffix: 'C'
            },
            yAxis: 1
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

  

  // ....................................................lista PM25 z flagami
    $.getJSON('data/devices/pm25', function(devices) {

      // Iterate through the devices...
      $.each(devices, function(device, label) {

        // Turn the loading text on.
        chart.showLoading();

        // Load PM25 data.
        $.getJSON('data/device/'+device+'/pm25', function(data) {

          // opis serii w etykiecie dynamicznie pojawia sie przy wykresie
          var series = {
            name: label + ' (py?)',
            id: device,
            data: data,
            dashStyle: 'dot',
            tooltip: {
              valueSuffix: '?g/m3'
            },
            yAxis: 1
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


  }

  // Load Atmospi settings and begin!
  $.getJSON('settings', function(settings) {

    // Load the latest measurements. - tu zablokowane
    loadLatestMeasurements(settings);
   
    noiseMsg(settings);
    pm10Msq(settings);

    //update2Time(settings);
    setInterval(update2Time(), 10000);
    
    //update2Time(settings); 
    wyswietlTekst(settings);
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
