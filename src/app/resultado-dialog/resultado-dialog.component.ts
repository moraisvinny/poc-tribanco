import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-resultado-dialog',
  templateUrl: './resultado-dialog.component.html',
  styleUrls: ['./resultado-dialog.component.scss']
})
export class ResultadoDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data);
  }

}
