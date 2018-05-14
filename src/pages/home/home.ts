import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NgxQRCodeModule } from "ngx-qrcode2";
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  qrData = null;
  scannedCode = null;
  msj=null;

  constructor(public navCtrl: NavController, private barcodeScanner: BarcodeScanner, private contacts: Contacts) {

  }

  scanCode(): void {
    this.barcodeScanner.scan().then(barcodeData => {
      this.scannedCode = barcodeData.text;
      
      let contact: Contact = this.contacts.create();
      contact.name= new ContactName(null,this.scannedCode.lastname,this.scannedCode.name);
      contact.phoneNumbers = [new ContactField('mobile', this.scannedCode.phone)];
      
      contact.save().then(
        () => {
          console.log('Contact Guardado!', contact);
          this.msj="El contacto se guardo correctamente";
          //this.dismiss({ estado: true, contacto: contact });
        },
        (error: any) => {
          console.error('Error al guardar el contacto.', error);
          //this.dismiss({ estado: false });
          this.msj="No se pudo guardar contacto";
        }
      );
      
    });
  }

}
