import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ConfigurationComponent } from './configuration/configuration.component';

import { Ng2SmartTableModule } from 'ng2-smart-table';

import {MachineService} from "./services/machine.service";
import {ProductService} from "./services/product.service";
import {LineService} from "./services/line.service";
import {TypeService} from "./services/type.service";
import {FamilyService} from "./services/family.service";

import {DataTableModule,SharedModule,DialogModule} from 'primeng/primeng';
import {AccordionModule} from 'primeng/components/accordion/accordion';
import {MenuItem} from 'primeng/components/common/api';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {notMachinePipe} from './pipes/notMachinePipe';

@NgModule({
  declarations: [
    AppComponent,
    ConfigurationComponent,
    notMachinePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Ng2SmartTableModule,
    DataTableModule,
    SharedModule,
    DialogModule,
    AccordionModule,
    BrowserAnimationsModule
  ],
  providers: [MachineService,ProductService,LineService,TypeService,FamilyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
