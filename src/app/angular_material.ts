import { 
  MatCheckboxModule,
  MatInputModule,
  MatButtonModule,
  MatOptionModule, 
  MatGridListModule, 
  MatToolbarModule, 
  MatSidenavModule, 
  MatIconModule, 
  MatListModule,
  MatCardModule,
  MatMenuModule,
  MatDividerModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatFormFieldModule,
  MatSelectModule,
  MatNativeDateModule,
  MatSnackBarModule,
  MatDialogModule, 
  MatTabsModule, 
  MatProgressSpinnerModule,
  MatDatepickerModule,
  MatRadioModule,
  MatSliderModule,
  MatTooltipModule,
  MatExpansionModule
} from '@angular/material';
import {TextFieldModule} from '@angular/cdk/text-field';
import { NgModule } from '@angular/core';


import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [MatDatepickerModule,MatRadioModule,MatSliderModule,  
    MatNativeDateModule,MatSnackBarModule,MatDialogModule , 
    MatTabsModule, MatProgressSpinnerModule
    
    ,MatOptionModule, 
    MatSelectModule, MatGridListModule,
    MatButtonModule, MatCheckboxModule,MatInputModule,
    MatCardModule, MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule, MatMenuModule,
    MatDividerModule, MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, TextFieldModule,
    FlexLayoutModule,MatTooltipModule,MatExpansionModule
    
  ],
  
  
    exports: [MatDatepickerModule,MatRadioModule,MatSliderModule,  
      MatNativeDateModule,MatSnackBarModule,MatDialogModule , 
      MatTabsModule, MatProgressSpinnerModule
      
      ,MatOptionModule, 
      MatSelectModule, MatGridListModule,
      MatButtonModule, MatCheckboxModule,MatInputModule,
      MatCardModule, MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule, MatMenuModule,
      MatDividerModule, MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, TextFieldModule,
      FlexLayoutModule,MatTooltipModule,MatExpansionModule
      
  ]

})
export class MaterialModule { }
