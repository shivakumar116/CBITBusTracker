import { Router } from '@angular/router';
import { DbusnoService } from './../dbusno.service';
import { DbusnoPage } from './../dbusno/dbusno.page';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { Platform, NavController } from "@ionic/angular";
import { Geolocation } from '@ionic-native/geolocation/ngx'
import { AngularFirestoreModule, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorageModule, AngularFireStorage } from '@angular/fire/storage';
import { firestore } from "firebase/app";
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  LatLng,
  MarkerOptions,
  Marker
} from "@ionic-native/google-maps";
import { google } from 'google-maps'
import { Icon } from 'ionicons/dist/types/icon/icon';
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation/ngx'
import { BackgroundMode } from '@ionic-native/background-mode/ngx';



declare var google;



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('map') mapElemet;


  map: any;
  lat: number;
  lon: number;
  busno: number;
  driverlocation: any;
  Firsttime: boolean = true;
  subscription: any;
  mark: Marker;
  angle: number;
  gpsena: boolean;
  bgactive: boolean;


  constructor(public geo: Geolocation, public afs: AngularFirestore, public dbusnos: DbusnoService,
    public platform: Platform,
    public gmaps: GoogleMaps,
    public router: Router,
    public deviceOrientation: DeviceOrientation,
    private backgroundMode: BackgroundMode) {
  }




  ngAfterViewInit() {


    this.busno = this.dbusnos.getdbusno();
    console.log(this.busno);
    var self = this

    var options = { enableHighAccuracy: true };
    self.backgroundMode.enable();

    self.backgroundMode.on('activate').subscribe(function () {
      self.backgroundMode.disableWebViewOptimizations();
      console.log("In Bg");
      let wat = self.geo.watchPosition(options);
      self.subscription = wat.subscribe((data) => {
        console.log(data.coords.latitude, data.coords.longitude)
      })
    })



    let watch = this.geo.watchPosition(options);
    this.subscription = watch.subscribe((data) => {

      this.deviceOrientation.getCurrentHeading().then(
        (data: DeviceOrientationCompassHeading) => this.angle = data.magneticHeading,
        (error: any) => console.log(error)
      );


      this.lat = data.coords.latitude;
      this.lon = data.coords.longitude
      if (this.busno == null) {

      }
      else {

        if (this.angle == undefined) {
          this.angle = 1;
        }

        this.afs.doc(`driverlocation/${this.busno}`).set({
          lat: data.coords.latitude,
          lon: data.coords.longitude,
          busno: this.busno,
          angle: this.angle,

        });

        this.platform.ready().then(() => {
          if (this.Firsttime == true) {

            this.loadMap();
            this.Firsttime = false;

          }
          else {

            this.addmarker();

          }
        });


      }
    })

  }



  loadMap() {
    this.map = GoogleMaps.create('map');

    this.map.one(GoogleMapsEvent.MAP_READY).then((data: any) => {


      let coordinates: LatLng = new LatLng(this.lat, this.lon);

      let position = {
        target: coordinates,
        zoom: 16
      };

      this.map.animateCamera(position);

      let ic = {
        url: "assets/icon/shivaicon.png",
        size: {
          width: 40,
          height: 50
        },
        anchor: [15, 15],
      };

      let markerOptions: MarkerOptions = {
        position: coordinates,
        icon: ic,
      }

      this.mark = this.map.addMarkerSync(markerOptions);
      this.addmarker();
      //.then((marker: Marker) => {
      //this.mark = marker;
      //});

      // this.mark.showInfoWindow();

    })
  }

  addmarker() {
    //console.log("in add marker")
    let coordinates: LatLng = new LatLng(this.lat, this.lon);

    // console.log(coordinates)

    this.mark.setPosition({
      lat: this.lat,
      lng: this.lon,
    });
    //this.mark.set('position', coordinates)



    let position = {
      target: coordinates,
      zoom: 16,
    };

    // this.map.animateCamera(position);
    this.map.moveCamera(position);
    //console.log(this.angle)
    this.mark.setRotation(this.angle)
  }


  deletebus() {
    this.subscription.unsubscribe()
    this.afs.doc(`driverlocation/${this.busno}`).delete();
    this.router.navigate(['/move'])
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe()
    this.afs.doc(`driverlocation/${this.busno}`).delete();
  }
}
