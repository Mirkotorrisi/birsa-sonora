import React, { useState, useEffect, useRef } from "react";
import logoBrisa from "../images/logo_brisa.png";

export default function Map() {
  var container = useRef(null);

  var [location, setLocation] = useState({
    lat: 45.464303,
    lng: 9.190603,
  });
  var [map, setMap] = useState(null);
  const [pinsLocators, setPinLocators] = useState([
    {
      lat: 12,
      lng: 12,
      name: "Brisa Sonora",
      address: "Via Ten Salvatore Garozzo, 2",
      city: "Aci Sant'Antonio CT",
      phone: 3282581363,
      openingHours: "16:00 - 20:00",
    },
  ]);
  let infoPin = [];

  useEffect(
    function () {
      if (!container) return;
      if (!window.google) return;
      setMap(
        new window.google.maps.Map(container.current, {
          zoom: 13,
          center: {
            lat: location.lat,
            lng: location.lng,
          },
          style: { width: 320, height: 180, top: 160, left: 0 },
          zoomControl: true,
          mapTypeControl: false,
          scaleControl: false,
          streetViewControl: false,
          rotateControl: false,
          fullscreenControl: false,
        })
      );
    },
    [container, window.google]
  );

  useEffect(
    function () {
      if (!location.lat && !location.lng) return;
      if (map) {
        map.setCenter(
          new window.google.maps.LatLng(location.lat, location.lng)
        );
      }
    },
    [map, location]
  );

  useEffect(
    function () {
      if (!map || !pinsLocators) return;
      for (let index = 0; index < pinsLocators.length; index++) {
        const current = pinsLocators[index];

        const marker = new window.google.maps.Marker({
          position: { lat: Number(current.lat), lng: Number(current.lng) },
          map,
          icon: {
            url: logoBrisa,
          },
        });

        const info = new window.google.maps.InfoWindow();

        info.setPosition({
          lat: Number(current.lat),
          lng: Number(current.lng),
        });
        let infoText = `<b><a href='https://www.google.com/maps/dir/${
          location.lat
        },${location.lng}/${Number(current.lat)},${Number(
          current.lng
        )}' target="_blank" style="font-family: 'Arial'"> ${
          current.name
        } </a></b> <br /><p style="font-family: 'Arial'"> ${
          current.address
        } </p>`;
        infoText += current.city
          ? `<p style="font-family: 'Arial'">${current.city} </p>`
          : "";
        infoText += current.phone
          ? `<p style="font-family: 'Arial'"><a href="tel:${current.phone}>${current.phone}"</a> <br/>`
          : "";
        infoText += current.openingHours
          ? `<p style="font-family: 'Arial'">${current.openingHours}</p>`
          : "";
        infoPin.push(infoText);
        window.google.maps.event.addListener(marker, "click", function () {
          info.close();
          info.setContent(infoPin[index]);
          info.open(map, marker);
        });
      }
    },
    [map, pinsLocators, location]
  );

  useEffect(
    function () {
      if (!navigator) return;
      var handleLocation = function (position) {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      };

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(handleLocation);
      }
    },
    [navigator]
  );

  return <div ref={container} className="map_container"></div>;
}
