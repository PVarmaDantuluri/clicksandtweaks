import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { ImgUploadComponent } from './components/img-upload/img-upload.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, ImgUploadComponent],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'clicks-and-tweaks';
  cloudinaryInfo  = localStorage.getItem('cloudinaryInfo');

  ngOnInit(): void {
    console.log('home');
    console.log('tesing the app component');
  }
}
