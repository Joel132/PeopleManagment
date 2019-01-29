import { LayoutModule } from '@angular/cdk/layout';
import { MatCheckboxModule,MatInputModule,MatButtonModule, MatOptionModule, MatGridListModule, MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule,MatCardModule} from '@angular/material';
import { NgModule } from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material/form-field';
import {TextFieldModule} from '@angular/cdk/text-field'
import {MatSelectModule} from '@angular/material/select';
import {MatNativeDateModule,MatSnackBarModule,MatDialogModule,MatTabsModule,MatProgressSpinnerModule} from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';
import {MatSliderModule} from '@angular/material/slider';


//editar_postulante


import  {Component} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatRippleModule} from '@angular/material/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@NgModule({
  imports: [MatDatepickerModule,MatRadioModule,MatSliderModule,MatNativeDateModule,MatSnackBarModule,MatDialogModule , 
    MatTabsModule, MatProgressSpinnerModule,MatOptionModule,MatSelectModule, MatGridListModule, MatButtonModule, MatCheckboxModule,MatInputModule,MatCardModule, MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule, MatMenuModule,
    MatDividerModule, MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, TextFieldModule
    
    ,MatRippleModule,FlexLayoutModule, MatExpansionModule,MatProgressBarModule
  ],
  
  
    exports: [ MatDatepickerModule,MatRadioModule,MatSliderModule,MatNativeDateModule,MatSnackBarModule,MatDialogModule ,MatTabsModule, MatProgressSpinnerModule,MatOptionModule,MatSelectModule, MatGridListModule, MatButtonModule, MatCheckboxModule,MatInputModule,
      MatCardModule, MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule, MatMenuModule,
      MatDividerModule, MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, TextFieldModule
  
      ,MatRippleModule,FlexLayoutModule,MatExpansionModule,MatProgressBarModule
  ]


})
export class MaterialModule { }
