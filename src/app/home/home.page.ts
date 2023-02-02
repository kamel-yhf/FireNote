import { ChangeDetectorRef, Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { DataService, Note } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  notes: Note[] = [];
  constructor(
    private dataService: DataService,
    private cd: ChangeDetectorRef,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController
  ) {
    this.dataService.getNotes().subscribe((res) => {
      this.notes = res;
      this.cd.detectChanges();
    });
  }

  async openNote(note: Note) {
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      componentProps: { id: note.id },
      initialBreakpoint: 0.8,
    });

    await modal.present();
  }

  async addNote() {
    const alert = await this.alertCtrl.create({
      header: 'Ajouter une note',
      inputs: [
        {
          name: 'title',
          placeholder: 'Ma note',
          type: 'text',
        },
        {
          name: 'text',
          placeholder: 'Mon texte',
          type: 'textarea',
        },
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
        },
        {
          text: 'OK',
          handler: (res) => {
            this.dataService.addNote({ text: res.text, title: res.title });
          },
        },
      ],
    });

    await alert.present();
  }
}
