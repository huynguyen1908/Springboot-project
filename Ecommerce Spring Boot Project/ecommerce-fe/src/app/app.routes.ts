import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponentComponent } from './shared/login-component/login-component.component';
import { ProductComponentComponent } from './shared/product-component/product-component.component';
import {RegisterComponent} from './shared/register/register.component';
import {CartComponent} from './shared/cart/cart.component';
import {CartPopupComponent} from './shared/cart-popup/cart-popup.component';
import {ProductListComponent} from './admin/product-list/product-list.component';
import {AdminComponent} from './admin/admin.component';
import {OrderListComponent} from './admin/order-list/order-list.component';
import {CreateProductComponent} from './admin/create-product/create-product.component';
import {ProductDetailComponent} from './admin/product-detail/product-detail.component';
import {OrderDetailComponent} from './admin/order-detail/order-detail.component';
import {DashboardComponent} from './admin/dashboard/dashboard.component';
import {UserListComponent} from './admin/user-list/user-list.component';
import {AdminHeaderComponent} from './admin/admin-header/admin-header.component';
import {UserDetailComponent} from './admin/user-detail/user-detail.component';

export const routes: Routes = [
    {path: 'home', component:HomeComponent},
    {path: 'auth/login', component: LoginComponentComponent},
    {path: 'product', component: ProductComponentComponent},
    {path: 'auth/register', component: RegisterComponent},
    {path: 'cart', component: CartComponent},
    {path: 'cart-popup', component: CartPopupComponent},
  // {path:'user-detail', component: UserDetailComponent},
    {
      path: 'admin',
      component: AdminComponent,
      children: [
        {path:'product-list', component: ProductListComponent},
        {path:'create-product', component: CreateProductComponent},
        {path:'product-detail/:productId', component: ProductDetailComponent},
        {path:'order-list', component: OrderListComponent},
        {path:'order-detail/:orderId', component: OrderDetailComponent},
        {path:'dashboard', component: DashboardComponent},
        {path:'user-list', component: UserListComponent},
        {path:'user-detail/:userId', component: UserDetailComponent},
        {path:'admin-header', component: AdminHeaderComponent},
        {path:'', redirectTo:'auth/login', pathMatch:'full'}
      ]
    },
    {path:'', redirectTo:'auth/login', pathMatch:'full'}

];
