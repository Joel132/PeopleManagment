import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
  estado: boolean;
}

@Component({
  selector: 'app-dialog-baja',
  templateUrl: './dialog-baja.component.html',
  styleUrls: ['./dialog-baja.component.css']
})
export class DialogBajaComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogBajaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
  }

}
