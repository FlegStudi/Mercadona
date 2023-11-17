import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './admin/authentication/authentication.component';
import { CatalogueComponent } from './catalogue/catalogue/catalogue.component';
import { AdminInterfaceComponent } from './admin/admin-interface/admin-interface.component';
import { PromotionsComponent } from './admin/promotions/promotions.component';
import { CategoriesComponent } from './admin/categories/categories.component';
import { ProductsComponent } from './admin/products/products.component';
import { AuthenticationService } from './services/authentication.service';

const routes: Routes = [
  { path: 'Admin', component: AuthenticationComponent },
  { path: 'AdminInterface', component: AdminInterfaceComponent , canActivate: [AuthenticationService],
  children: [
    { path: 'promotions', component: PromotionsComponent },
    { path: 'categories', component: CategoriesComponent },
    { path: 'products', component: ProductsComponent},
    { path: '', component: CatalogueComponent}
  ]},
  { path: '', component: CatalogueComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
