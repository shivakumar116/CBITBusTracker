import { Platform } from '@ionic/angular';
import { DbusnoService } from './../dbusno.service';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ToastController } from '@ionic/angular';
import { AngularFirestoreModule, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorageModule, AngularFireStorage } from '@angular/fire/storage';
import { firestore } from "firebase/app";
import { AngularFirestore } from '@angular/fire/firestore';
import { driverkey } from './../driverkey.model';
import { Observable } from 'rxjs/Observable'
import { driverlocation } from './../driverlocation.model';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';



@Component({
  selector: 'app-dbusno',
  templateUrl: './dbusno.page.html',
  styleUrls: ['./dbusno.page.scss'],
})
export class DbusnoPage implements OnInit {

  driverlocationRef: AngularFirestoreCollection<driverlocation>
  driverlocation$: Observable<driverlocation[]>
  maininfo: driverlocation

  constructor(public router: Router, public navCtrl: NavController, public dbusnos: DbusnoService, public toastController: ToastController,
    public afs: AngularFirestore,
    public platform: Platform,
    public diagnostic: Diagnostic) { }

  ngOnInit() {
  }

  public dbusno: number = null;
  public authkey: number;
  public authkeyfromdb: number;
  driverkeyRef: AngularFirestoreCollection<driverkey>
  driverkey$: Observable<driverkey[]>
  noofdrivers: number;
  gpsena: boolean;


  ngAfterViewInit() {

    this.diagnostic.isGpsLocationEnabled().then(
      (data: any) => this.gpsena = data,
    )

    this.driverkeyRef = this.afs.collection('driverkey')
    this.driverkey$ = this.driverkeyRef.valueChanges()
    this.driverkey$.subscribe(info => {
      this.authkeyfromdb = info[0].value;
    })


  }


  async savedbusno() {




    console.log(this.gpsena)
    if (this.dbusno == null && this.authkey == null) {
      const to = await this.toastController.create({
        message: 'Bus Number & Access Key cannot be empty !',
        duration: 2000,
        position: 'bottom'
      });
      to.present();

    }
    else {
      if (this.authkey == this.authkeyfromdb && this.gpsena == true && this.dbusno != null) {
        this.dbusnos.setdbusno(this.dbusno);
        console.log("Acesss Given")
        this.router.navigate(['/home'])
      }
      else if (this.dbusno == null) {
        const toa = await this.toastController.create({
          message: 'Bus number cannot be empty !',
          duration: 2000,
          position: 'bottom'
        });
        toa.present();
      }
      else if (this.authkey == null) {
        const toa = await this.toastController.create({
          message: 'Access Key cannot be empty !',
          duration: 2000,
          position: 'bottom'
        });
        toa.present();
      }
      else if (this.gpsena == false || this.gpsena == undefined) {
        const t = await this.toastController.create({
          message: 'Turn on GPS & Try again !!',
          duration: 2000,
          position: 'bottom'
        });
        t.present();
        this.router.navigate(['/move'])
      }
      else {
        const t = await this.toastController.create({
          message: 'invalid driver access key',
          duration: 2000,
          position: 'bottom'
        });
        t.present();
      }
    }

  }

}


