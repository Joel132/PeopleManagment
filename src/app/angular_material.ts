import { MatCheckboxModule,MatInputModule,
  MatButtonModule, MatOptionModule, MatGridListModule, MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule,MatCardModule} from '@angular/material';
import { NgModule } from '@angular/core';

import {MatMenuModule} from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material/form-field';
import {TextFieldModule} from '@angular/cdk/text-field'
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule,MatInputModule,
    MatCardModule, MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule, MatMenuModule,
    MatDividerModule, MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, TextFieldModule,
    MatSelectModule,MatOptionModule,MatGridListModule],
  exports: [MatButtonModule, MatCheckboxModule,MatInputModule,
    MatCardModule, MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule, MatMenuModule, 
    MatDividerModule, MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, TextFieldModule, 
    MatSelectModule,MatOptionModule,MatGridListModule],
})
export class MaterialModule { }
