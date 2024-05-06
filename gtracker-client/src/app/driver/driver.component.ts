import { Component } from '@angular/core';
import { TrackerComponent } from '../tracker/tracker.component';

@Component({
  selector: 'app-driver',
  standalone: true,
  imports: [TrackerComponent],
  templateUrl: './driver.component.html',
  styleUrl: './driver.component.scss'
})
export class DriverComponent {

}
