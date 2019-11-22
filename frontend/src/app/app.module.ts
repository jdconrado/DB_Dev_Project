import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './catalog/products/products.component';
import {VendorComponent } from './vendor/vendor.component';
import { ProfileComponent } from './profile/profile.component';
import { CatalogComponent } from './catalog/catalog.component';
import { CatalogService } from './catalog/catalog.service';
import { UsersService } from './users.service';
import { ImagesService} from './images.service';
import { ShoppingService} from './shopping.service';
import { AuthenticationService } from './authentication.service'
import { HttpClientModule } from '@angular/common/http';
import { OrderComponent } from './order/order.component';
import { ShoppingcartComponent, comfirmQuantity, shopElement} from './shoppingcart/shoppingcart.component';
import { ToastrModule  } from 'ngx-toastr';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { PedidosComponent } from './pedidos/pedidos.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'vendor', component: VendorComponent },
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'order', component: OrderComponent },
  { path: 'pedidos', component: PedidosComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    SignupComponent,
    HomeComponent,
    ProductsComponent,
    VendorComponent,
    ProfileComponent,
    CatalogComponent,
    OrderComponent,
    ShoppingcartComponent,
    comfirmQuantity,
    shopElement,
    PedidosComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    })
  ],
  providers: [
    CatalogService,
    UsersService,
    AuthenticationService,
    ImagesService,
    ShoppingService
  ],
  bootstrap: [AppComponent],
  entryComponents:[
    comfirmQuantity
  ],
})
export class AppModule { }
