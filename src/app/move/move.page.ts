import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Network } from '@ionic-native/network/ngx';
import { ToastController } from '@ionic/angular';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';


@Component({
  selector: 'app-move',
  templateUrl: './move.page.html',
  styleUrls: ['./move.page.scss'],
})
export class MovePage implements OnInit {

  constructor(public router: Router, public network: Network, public toastController: ToastController) { }

  isnetworkava: boolean;
  a: string;
  ngOnInit() {
  }


  async ngAfterViewInit() {
    this.a = this.network.type;
    if (this.a == 'none') {
      this.isnetworkava = false;
    }
    else {
      this.isnetworkava = true;
    }

    this.network.onDisconnect().subscribe(() => {
      this.isnetworkava = false;
    })

    this.network.onConnect().subscribe(() => {
      this.isnetworkava = true;
    })

  }

  async user() {
    if (this.isnetworkava == true) {
      this.router.navigate(['/ubusno']);
    }
    else {
      const to = await this.toastController.create({
        message: 'No Internet Connection :) ',
        duration: 2000,
        position: 'bottom'
      });
      to.present();
    }
  }

  async driver() {
    if (this.isnetworkava == true) {
      this.router.navigate(['/dbusno']);
    }
    else {
      const to = await this.toastController.create({
        message: 'No Internet Connection :) ',
        duration: 2000,
        position: 'bottom'
      });
      to.present();
    }
  }

  async contact() {
    if (this.isnetworkava == true) {
      this.router.navigate(['/contact']);
    }
    else {
      const to = await this.toastController.create({
        message: 'No Internet Connection :) ',
        duration: 2000,
        position: 'bottom'
      });
      to.present();
    }
  }


}
