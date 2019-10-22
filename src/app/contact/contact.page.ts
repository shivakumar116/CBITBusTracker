import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  email: any;
  description: any;

  constructor(public toastController: ToastController, public afs: AngularFirestore) { }

  ngOnInit() {
  }

  async submit() {
    if ((this.email == null && this.description == null) || (this.email != null && this.description == null)
      || (this.email == null && this.description != null)) {
      const toast = await this.toastController.create({
        message: 'Both Email & Description are Mandatory',
        duration: 2000,
        position: 'bottom'
      });
      toast.present();
    }
    else {

      this.afs.doc(`feedback/${this.email}`).set({
        desc: this.description
      });
      const toas = await this.toastController.create({
        message: 'Success !! Sent to developer',
        duration: 2000,
        position: 'bottom'
      });
      toas.present();

      this.description = null;
      this.email;


    }
  }

}
