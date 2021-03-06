/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {

        this.bindEvents();


    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');


        //buscar el api en https://api.nasa.gov/index.htm
        var url = "https://api.nasa.gov/planetary/apod?api_key=to36LZGwYuYt77MftMuOuK0ubxKousIKiTDjcm8n";

        $("#cargarImagen").click(function(){

            console.log("Presionando el boton...");

            $.ajax({
                url: url,
                success: handleResult
            });

            function handleResult(result){
                $("#imagenNasa").attr("src", result.url);

                // Using http://responsiveimg.com library

                $("#imagenNasa").responsiveImg();

                $("#copyright").text("Copyright: " + result.copyright) ;
                $("#desc").text(result.explanation);
            }
        });

    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
       /* var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');*/

        console.log('Received Event: ' + id);

        console.log(device.cordova);
        $("#dispositivo").append("Modelo: "+device.model+"<br/>");
        $("#dispositivo").append("Plataforma: "+device.platform+"<br/>");
        $("#dispositivo").append("Version: "+device.version+"<br/>");

        console.log("Datos del GPS");
        navigator.geolocation.getCurrentPosition(function(geodata){
            var coordenadas = geodata.coords;
            $("#gps").text("La posicion latitude: "+coordenadas.latitude+", Longitud: "+coordenadas.longitude+", presición: "+coordenadas.accuracy);
        }, function(error){
            $("#gps").text("Error, codigo: "+error.code+", mensaje: "+error.message);
        }, { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true });
    }
};

app.initialize();



