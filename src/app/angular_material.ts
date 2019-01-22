import { MatCheckboxModule,MatInputModule,
  MatButtonModule, MatOptionModule, MatSelectModule, MatGridListModule, MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule} from '@angular/material';
import { NgModule } from '@angular/core';



import {MatNativeDateModule,MatSnackBarModule,MatDialogModule, MatTableModule, MatPaginatorModule , 
  MatSortModule,MatTabsModule, 
  MatFormFieldModule, MatProgressSpinnerModule} from '@angular/material';

import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';
import {MatSliderModule} from '@angular/material/slider';
import {MatDividerModule} from '@angular/material/divider';

import {MatCardModule} from '@angular/material/card';


@NgModule({
  imports: [MatDatepickerModule,MatRadioModule,MatSliderModule,MatDividerModule,  MatNativeDateModule,MatSnackBarModule,MatDialogModule, MatTableModule, MatPaginatorModule , 
    MatSortModule,MatTabsModule, MatFormFieldModule, MatProgressSpinnerModule,MatButtonModule, MatCheckboxModule,MatInputModule,
    MatCardModule, MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule,MatOptionModule, MatSelectModule, MatGridListModule],
  
  
    exports: [MatDatepickerModule,MatRadioModule,MatSliderModule,MatDividerModule,MatNativeDateModule,MatSnackBarModule,MatDialogModule, MatTableModule, MatPaginatorModule , 
    MatSortModule,MatTabsModule, MatFormFieldModule, MatProgressSpinnerModule,MatButtonModule, MatCheckboxModule,MatInputModule,
    MatCardModule, MatToolbarModule, MatSidenavModule, MatIconModule,MatOptionModule, MatSelectModule, MatGridListModule,  MatListModule],
})
export class MaterialModule { }
