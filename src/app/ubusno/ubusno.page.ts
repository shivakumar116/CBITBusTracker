import { UbusnoService } from './../ubusno.service';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Toast } from '@ionic-native/toast/ngx';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs/Observable'
import { AngularFirestoreModule, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorageModule, AngularFireStorage } from '@angular/fire/storage';
import { driverlocation } from './../driverlocation.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';




@Component({
  selector: 'app-ubusno',
  templateUrl: './ubusno.page.html',
  styleUrls: ['./ubusno.page.scss'],
})
export class UbusnoPage implements OnInit {


  driverlocationRef: AngularFirestoreCollection<driverlocation>
  driverlocation$: Observable<driverlocation[]>
  maininfo: driverlocation
  busesol: number[] = [];
  isbusol: boolean;
  busno: number = null;

  constructor(public ubusnos: UbusnoService,
    public router: Router, private toast: Toast,
    public toastController: ToastController, public afs: AngularFirestore,
    public diagnostic: Diagnostic) { }

  ngOnInit() {
  }
  public ubusno: number = null;

  ngAfterViewInit() {
    this.driverlocationRef = this.afs.collection(`driverlocation`);
    this.driverlocation$ = this.driverlocationRef.valueChanges();
    this.driverlocation$.subscribe(info => {
      for (let i = 0; i < info.length; i++) {
        console.log(info[i].busno);
        this.busesol[i] = info[i].busno;
      }
    });
    this.busesol.sort();
  }



  selectedbus() {
    this.ubusnos.setubusno(this.busno);
    this.router.navigate(['/userhome'])
  }

}
