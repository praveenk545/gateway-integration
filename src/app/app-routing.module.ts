import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ApplyFComponent } from './apply-f/apply-f.component';
import { TableComponent } from './table/table.component';
import { GatewayComponent } from './gateway/gateway.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'gt',
    component: GatewayComponent,
  },
  {
    path: 'apply',
    component: ApplyFComponent,
  },
  {
    path: 'table',
    component: TableComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
