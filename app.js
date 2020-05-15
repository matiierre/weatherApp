window.addEventListener('load', () => {
    let long;
    let lat;
    let titulo = document.querySelector('.titulo');


    navigator.permissions.query({ name: 'geolocation' })
        .then(data => {

            if (data.state == "denied") {
                alert("POR FAVOR DA PERMISOS DE UBICACION");
                titulo.style.color = "red";
                titulo.textContent = "POR FAVOR HABILITE LA UBICACION";

            }
        });



    if (navigator.geolocation) {


        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            let temperatureDescription = document.querySelector('.temperature-description');
            let temperatureDegree = document.querySelector('.temperature-degree');
            let pais = document.querySelector('.location-country');
            let temperatureTime = document.querySelector('.location-time');
            let locationTimezone = document.querySelector('.location-timezone');
            let temperatureSensation = document.querySelector('.temperature-feel_like');
            let temperatureIcon = document.querySelector('.location-icon');
            let degreeSection = document.querySelector('.temperature');
            const temperatureSpan = document.querySelector('.temperature span');
            const sensationSpan = document.querySelector('.feel span ');
            const apikey = '255029ee6651fb07d03ad452490d7c66';
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apikey}&units=metric`;

            fetch(api).then(data => {
                return data.json();
            }).then(data => {
                var temperature = data.main.temp;
                var sensacionTermica = data.main.feels_like;
                const city = data.name;
                const time = data.dt;
                const country = data.sys.country;
                const description = data.weather[0].description;
                const icon = data.weather[0].icon;
                temperature = Math.floor(temperature);
                sensacionTermica = Math.floor(sensacionTermica);
                //Formula para cambiar de celcius to farenheit

                let farenheit = (temperature * (9 / 5) + 32);
                let farenheitSensation = (sensacionTermica * (9 / 5) + 32);

                //Aca se cambiar los elementos del dom con lo que trae la api

                temperatureDegree.textContent = 'Temp: ' + temperature;
                temperatureSensation.textContent = 'Feel like: ' + sensacionTermica;
                locationTimezone.textContent = 'City: ' + city;
                pais.textContent = 'Country: ' + country;
                temperatureDescription.textContent = 'Description: ' + description;
                var d = new Date(time * 1000);
                temperatureTime.textContent = 'Time: ' + d.toLocaleTimeString('es-ES', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' });
                temperatureIcon
                temperatureIcon.setAttribute('src', `http://openweathermap.org/img/wn/${icon}@2x.png`);

                //Aca se cambia por grados farenheigt o celcius

                degreeSection.addEventListener("click", () => {


                    if (temperatureSpan.textContent === "C") {

                        temperatureSpan.textContent = "F";
                        sensationSpan.textContent = "F";
                        temperatureDegree.textContent = "Temp:" + Math.floor(farenheit);
                        temperatureSensation.textContent = "Feel like:" + Math.floor(farenheitSensation);
                    } else {
                        temperatureSpan.textContent = 'C';
                        sensationSpan.textContent = "C";
                        temperatureDegree.textContent = "Temp: " + temperature;
                        temperatureSensation.textContent = "Feel like: " + sensacionTermica;
                    }
                })



            })
        });

    }
})