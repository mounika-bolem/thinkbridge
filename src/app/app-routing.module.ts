import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { HomeComponent } from './home/home.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  { path: '', redirectTo: 'product/home', pathMatch: 'full'},
  { path: 'product/home', component: HomeComponent },
  { path: 'product/create', component: CreateComponent },
  { path: 'product/update/:id', component: UpdateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
