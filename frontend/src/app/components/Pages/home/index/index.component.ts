import { Component } from '@angular/core';
import {  RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-index',
  imports: [RouterOutlet],
  standalone: true,
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {

}
