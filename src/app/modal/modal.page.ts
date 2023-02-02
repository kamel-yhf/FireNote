import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { DataService, Note } from '../services/data.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  @Input() id!: string;
  note: any;

  constructor(
    private dataService: DataService,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.dataService.getNoteById(this.id).subscribe((res) => {
      this.note = res;
    });
  }

  async deleteNote() {
    await this.dataService.deleteNote(this.note);
    this.modalCtrl.dismiss();
    const toast = await this.toastCtrl.create({
      message: 'Note supprimé',
      duration: 2000,
      icon: 'checkmark-sharp',
      mode: 'md',
    });
    toast.present();
  }

  async updateNote() {
    await this.dataService.updateNote(this.note);
    const toast = await this.toastCtrl.create({
      message: 'Note modifier',
      duration: 2000,
      icon: 'checkmark-sharp',
      mode: 'md',
    });
    toast.present();
  }
}

