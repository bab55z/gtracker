import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { RouterLink } from '@angular/router';
import { Package, PackageService } from '../services/package.service';
import { CommonModule } from '@angular/common';
import { Delivery, DeliveryService } from '../services/delivery.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    MenuComponent,
    RouterLink,
    CommonModule
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  packages: Partial<Package>[] = [];
  deliveries: Partial<Delivery>[] = [];

  constructor(private packageService: PackageService, private deliveryService: DeliveryService){
    this.getAllPackages();
    this.getAllDeliveries();
  }

  getAllPackages(){
    this.packageService.getAllPackages()
    .subscribe(data => {
      this.packages = data;
    });
  }

  getAllDeliveries(){
    this.deliveryService.getAllDeliveries()
    .subscribe(data => {
      this.deliveries = data;
    });
  }
}
