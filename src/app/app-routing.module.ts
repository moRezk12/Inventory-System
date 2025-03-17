import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {path : "" ,
    loadComponent: ()=> import('./layouts/layout/layout.component').then(m => m.LayoutComponent)
    , children: [
      {path : "" ,loadComponent: ()=> import('./Components/productlist/productlist.component').then(m => m.ProductlistComponent)},
      {path : "addproduct" ,loadComponent: ()=> import('./Components/addproduct/addproduct.component').then(m => m.AddproductComponent)},
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
