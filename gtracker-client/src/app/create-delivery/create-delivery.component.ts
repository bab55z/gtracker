import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DeliveryService } from '../services/delivery.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { PackageService } from '../services/package.service';

@Component({
  selector: 'app-create-delivery',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './create-delivery.component.html',
  styleUrl: './create-delivery.component.scss'
})
export class CreateDeliveryComponent {
  displaySuggestions = false;
  suggestions: string[] = [];

  constructor(private deliveryService: DeliveryService, private packageService: PackageService, private router: Router, private http: HttpClient){}

  deliveryForm = new FormGroup({
    package_id : new FormControl<string>('',[Validators.required], ),
  });

  onSubmit() {
    this.deliveryService.insertDelivery({
      ...this.deliveryForm.value,
      start_time: (new Date).toISOString(),     
    })
    .subscribe(data => {
      this.router.navigate(['/admin']);
    });
  }

  onInputChange(event:any): void {
    const inputValue = event.target.value
    if (!inputValue.trim()) {
      this.suggestions = [];
      return;
    }

    this.packageService.getIdsSuggestion(inputValue).subscribe(
      (response) => {
        this.suggestions = response;
      },
      (error) => {
        console.error('Error fetching suggestions:', error);
      }
    );
  }

  selectSuggestion(suggestion: string): void {
    this.deliveryForm.setValue({package_id: suggestion });
    this.hideSuggestion()
  }

  showSuggestion(){
    this.displaySuggestions = true;
  }

  hideSuggestion(){
    this.displaySuggestions = false;
  }

  public itemTrackBy(index: number, item: string) {
    return index;
  }
}
