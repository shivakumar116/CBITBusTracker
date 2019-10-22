import { Icon } from 'ionicons/dist/types/icon/icon';
import { UbusnoService } from './../ubusno.service';
import { driverlocation } from './../driverlocation.model';


import { AngularFirestore } from '@angular/fire/firestore';
import { Component, ViewChild } from '@angular/core';
import { Platform, NavController } from "@ionic/angular";
import { Geolocation } from '@ionic-native/geolocation/ngx'
import { AngularFirestoreModule, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorageModule, AngularFireStorage } from '@angular/fire/storage';
import { firestore } from "firebase/app";

import { Observable } from 'rxjs/Observable'
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  LatLng,
  MarkerOptions,
  Marker
} from "@ionic-native/google-maps";
import { MapType } from '@angular/compiler';
import { Toast } from '@ionic-native/toast/ngx';
import { ToastController } from '@ionic/angular';
import { Router } from "@angular/router";

declare var google;

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.page.html',
  styleUrls: ['./userhome.page.scss'],
})
export class UserhomePage {
  @ViewChild('map') mapElemet;

  map: GoogleMap;
  noofdrivers: number;
  latfromdb: number;
  lonfromdb: number;
  busnum: number = null;
  driverlocationRef: AngularFirestoreCollection<driverlocation>
  driverlocation$: Observable<driverlocation[]>
  maininfo: driverlocation
  Firsttime: boolean = true;
  mark: Marker;
  icon: any;
  angle: number;
  // bus = document.getElementById('bus').getElementsByTagName('input')[0];



  constructor(public afs: AngularFirestore, public platform: Platform, public ubusnos: UbusnoService, private toast: Toast, public toastController: ToastController,
    public router: Router) {
  }


  ngOnInit() {
  }

  ngAfterViewInit() {


    this.busnum = this.ubusnos.getubusno();
    let i = 0;
    this.driverlocationRef = this.afs.collection(`driverlocation`);
    this.driverlocation$ = this.driverlocationRef.valueChanges();
    this.driverlocation$.subscribe(info => {
      this.maininfo = info[0];
      this.noofdrivers = info.length;
      console.log(this.noofdrivers)
      for (i = 0; i < this.noofdrivers; i++) {
        this.maininfo = info[i];
        console.log(this.maininfo.busno)
        if (this.maininfo.busno === this.busnum) {

          this.latfromdb = this.maininfo.lat;
          this.lonfromdb = this.maininfo.lon;
          this.angle = this.maininfo.angle;

          break;
        }

        else {
          if (i + 1 == this.noofdrivers) {
            console.log(i)
            console.log("In Else Block")
            this.busnotonline();
          }
        }
      }

      this.platform.ready().then(() => {
        if (this.Firsttime == true) {
          this.loadMap();
          this.Firsttime = false;
        }
        else {
          this.marker();

        }
      });
    })



  }

  loadMap() {

    let mapOptions = {
      disableDefaultUI: false,
      controls: {
        zoom: true
      }
    }
    this.map = GoogleMaps.create('map', mapOptions);
    this.map.one(GoogleMapsEvent.MAP_READY).then((data: any) => {

      let coordinates: LatLng = new LatLng(this.latfromdb, this.lonfromdb);

      let position = {
        target: coordinates,
        zoom: 16
      };

      this.map.animateCamera(position);

      this.icon = {
        url: "assets/icon/shivaicon.png",
        size: {
          width: 40,
          height: 50
        },
        anchor: [15, 15],

      };

      let markerOptions: MarkerOptions = {
        position: coordinates,
        icon: this.icon,

      }

      this.mark = this.map.addMarkerSync(markerOptions);
      this.marker();
      //  .then((marker: Marker) => {
      //  this.mark = marker;
      //});


      //   this.mark.showInfoWindow()


    })
  }

  marker() {

    let coordinates: LatLng = new LatLng(this.latfromdb, this.lonfromdb);
    console.log(coordinates);

    //this.mark.setPosition(coordinates);
    this.mark.setPosition({
      lat: this.latfromdb,
      lng: this.lonfromdb
    })


    let position = {
      target: coordinates,
    };

    //this.map.animateCamera(position);
    this.map.moveCamera(position);
    this.mark.setRotation(this.angle)
    //this.map.setCameraTarget(coordinates);
  }


  async busnotonline() {
    const toast = await this.toastController.create({
      message: 'Bus number ' + this.busnum + ' is currently offline ',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
    this.router.navigate(['/ubusno'])
  }

  movecam() {
    let coordinates: LatLng = new LatLng(this.latfromdb, this.lonfromdb);
    let position = {
      target: coordinates,
      zoom: 16,
    };

    this.map.moveCamera(position);
  }

}
