import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TaradioComponent } from './taradio/taradio.component';
import { TestTableComponent } from './test-table/test-table.component';
import { TrackListComponent } from './track-list/track-list.component';

import { TaskListComponent } from './task-list/task-list.component';
import { DialogTableComponent } from './dialog-table/dialog-table.component';

import { AuthGuard } from './auth.guard'
import { AccessDeniedComponent } from './access-denied/access-denied.component';

const routes: Routes = [
  {path: '', redirectTo: 'dimanche', pathMatch: 'full' },
  { path: 'tracklist', component: TestTableComponent },  
  { path: 'dimanche', component: TaradioComponent },
  { path: 'tasks', component: TaskListComponent,canActivate: [AuthGuard] },
  { path: 'dialogtable', component: DialogTableComponent },
  { path: 'accessdenied', component: AccessDeniedComponent }

  
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],

  exports: [ RouterModule ]
})
export class AppRoutingModule {}