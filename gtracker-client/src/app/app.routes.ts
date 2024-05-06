import { Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { Page404Component } from './page-404/page-404.component';
import { HomeComponent } from './home/home.component';
import { TrackerComponent } from './tracker/tracker.component';
import { DriverComponent } from './driver/driver.component';
import { CreatePackageComponent } from './create-package/create-package.component';
import { CreateDeliveryComponent } from './create-delivery/create-delivery.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'admin', component: AdminComponent },
    { path: 'tracker', component: TrackerComponent },
    { path: 'driver', component: DriverComponent },
    { path: 'create-package', component: CreatePackageComponent },
    { path: 'create-delivery', component: CreateDeliveryComponent },
    { path: '**', component: Page404Component }
];
