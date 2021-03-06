import { Component } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';

declare var google: any;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {

  map: any;

  @ViewChild('map', { read: ElementRef, static: false }) mapRef: ElementRef;

  infoWindows: any = [];
  markers: any = [
    {
      title: "Guard House",
      latitude: "11.303283389988064",
      longitude: "124.70664341291824"
    },
    {
      title: "Registrars Office",
      latitude: "11.303407980629519",
      longitude: "124.70685845617439"
    },
    {
      title: "IT Department Office",
      latitude: "11.303467",
      longitude: "124.707058"
    },
    {
      title: "Gymnasium",
      latitude: "11.304451",
      longitude: "124.706248"
    },
    {
      title: "SASO",
      latitude: "11.304533",
      longitude: "124.706248"
    }
  ];

  constructor() { }

  ionViewDidEnter() {
    this.showMap();
  }

  addMarkersToMap(markers) {
    for (let marker of markers) {
      let position = new google.maps.LatLng(marker.latitude, marker.longitude);
      let mapMarker = new google.maps.Marker({
        position: position,
        title: marker.title,
        latitude: marker.latitude,
        longitude: marker.longitude
      });

      mapMarker.setMap(this.map);
      this.addInfoWindowToMarker(mapMarker);
    }

  }

  addInfoWindowToMarker(marker) {
    let infoWindowContent = '<div id="content">' +
      '<h2 style="color:red; id="firstHeading" class"firstHeading">' + marker.title + '</h2>' +
      '<p style="color:rgb(97, 92, 92);">Latitude: ' + marker.latitude + '</p>' +
      '<p style="color:rgb(97, 92, 92);">Longitude: ' + marker.longitude + '</p>' +
      '</div>';

    let infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent
    });

    marker.addListener('click',()=>{
      this.closeAllInfoWindows();
      infoWindow.open(this.map,marker);
    });
    this.infoWindows.push(infoWindow);
  }

  closeAllInfoWindows() {
    for (let window of this.infoWindows) {
      window.close();
    }
  }

  showMap() {
    const location = new google.maps.LatLng(11.303323521241202, 124.70667039897597);
    const options = {
      center: location,
      zoom: 20,
      disableDefaultUI: false
    }
    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
    this.addMarkersToMap(this.markers);
  }
}
