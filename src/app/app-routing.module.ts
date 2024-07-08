import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductesListComponent } from './components/productes-list/productes-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

const routes: Routes = [
  {
    path: '',
    component: ProductesListComponent,
  },
  {
    path: 'productDetails/:id',
    component: ProductDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
