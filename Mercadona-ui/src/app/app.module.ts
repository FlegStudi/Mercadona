import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CatalogueComponent } from './catalogue/catalogue/catalogue.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { AuthenticationComponent } from './admin/authentication/authentication.component';
import { AdminInterfaceComponent } from './admin/admin-interface/admin-interface.component';
import { NavbarComponent } from './admin/navbar/navbar.component';
import { PromotionsComponent } from './admin/promotions/promotions.component';
import { CategoriesComponent } from './admin/categories/categories.component';
import { ProductsComponent } from './admin/products/products.component';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { AuthenticationService } from './services/authentication.service';
import { AuthInterceptor } from './services/auth-interceptor';

export function tokenGetter() {
  return localStorage.getItem("jwt");
}

@NgModule({
  declarations: [
    AppComponent,
    CatalogueComponent,
    AuthenticationComponent,
    AdminInterfaceComponent,
    NavbarComponent,
    PromotionsComponent,
    CategoriesComponent,
    ProductsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["https://mercadona-api.azurewebsites.net"],
        disallowedRoutes: []
      }
    })
  ],
  providers: [AuthenticationService,  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }


