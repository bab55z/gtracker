import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})

export class MenuComponent {
  constructor(private router: Router) { 
  }

  title: string = 'Gtracker';
  currentUrl: string = '';
  menuItems : any[] = [
    {
      title:"Home",
      key:"home",
      link:"/",
    },
    {
      title:"Web Tracker",
      key:"tracker",
      link:"/tracker",
    },
    {
      title:"Web Driver",
      key:"driver",
      link:"/driver",
    },
    {
      title:"Web Admin",
      key:"admin",
      link:"/admin",
    },
    // {
    //   title:"Create Package",
    //   key:"create-package",
    //   link:"/create-package",
    // },
    // {
    //   title:"Create Delivery",
    //   key:"create-delivery",
    //   link:"/create-delivery",
    // },
  ];

  ngOnInit(){
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => {
        if(event instanceof NavigationEnd ){
          this.currentUrl = event.url;
        }
      });
  }

  routeIsAdmin(menuLink:string): boolean {
    const adminRoutes = ['/admin','/create-package','/create-delivery'];
    return adminRoutes.includes(this.currentUrl) && adminRoutes.includes(menuLink);
  }
}
