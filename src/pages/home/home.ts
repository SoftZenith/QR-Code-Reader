import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NgxQRCodeModule } from "ngx-qrcode2";
import { BarcodeScanner } from "@ionic-native/barcode-scanner";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  qrData = null;
  scannedCode = null;
  
  constructor(public navCtrl: NavController, private barcodeScanner: BarcodeScanner) {

  }

  scanCode(): void{
    this.barcodeScanner.scan().then(barcodeData => {
      this.scannedCode = barcodeData.text;
    });
  }

}
