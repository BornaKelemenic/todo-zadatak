import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoDetaljiComponent } from './components/todo-list/todo-detalji/todo-detalji.component';

const routes: Routes = [
  { path: '', component: TodoListComponent},
  { path: 'detalji/:id', component: TodoDetaljiComponent },
  { path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
