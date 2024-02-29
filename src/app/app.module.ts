import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApplyFComponent } from './apply-f/apply-f.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TableComponent } from './table/table.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { GatewayComponent } from './gateway/gateway.component';
import { GetComponent } from './get/get.component';

@NgModule({
  declarations: [
    AppComponent,
    ApplyFComponent,
    DashboardComponent,
    TableComponent,
    SidebarComponent,
    GatewayComponent,
    GetComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
