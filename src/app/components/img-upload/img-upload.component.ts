// import { Component } from '@angular/core';
// import { CloudinaryService } from './services/cloudinary.service';
// import {fill} from "@cloudinary/url-gen/actions/resize";
// // Import the CloudinaryModule.
// //import {CloudinaryModule} from '@cloudinary/ng';

// // Import the Cloudinary classes.
// import {Cloudinary, CloudinaryImage} from '@cloudinary/url-gen';
// import { CommonModule } from '@angular/common';
// import { RouterOutlet } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { CloudinaryService } from './services/cloudinary.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-img-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './img-upload.component.html',
  styleUrl: './img-upload.component.scss'
})
export class ImgUploadComponent  implements OnInit{
  // imageUrls: string[] = []; 
  // uploading: boolean = false;
  // loading: boolean = false;
  // images: any;
  // img!: CloudinaryImage;


  // constructor(private cloudinaryService: CloudinaryService) { 

  //   // Create a Cloudinary instance and set your cloud name.
  //   const cld = new Cloudinary({
  //     cloud: {
  //       cloudName: 'demo'
  //     }
  //   });
  //   this.img = cld.image('docs/models');
  //   this.img.resize(fill().width(250).height(250));
   //}

  // // Handle drag over event
  // onDragOver(event: DragEvent): void {
  //   event.preventDefault(); // Allow drop
  //   event.stopPropagation();
  //   event.dataTransfer!.dropEffect = 'copy'; // Shows a "copy" cursor while dragging
  // }

  // // Handle drag leave event
  // onDragLeave(event: DragEvent): void {
  //   event.preventDefault();
  //   event.stopPropagation();
  // }

  // // Handle drop event
  // onDrop(event: DragEvent, folderName: string): void {
  //   event.preventDefault();
  //   event.stopPropagation();
  //   const files = event.dataTransfer?.files;
  //   if (files) {
  //     this.uploadFiles(files, folderName);
  //   }
  // }

  // // Handle file input selection
  // onFileSelected(event: any, folderName: string): void {
  //   const files = event.target.files;
  //   this.uploadFiles(files, folderName);
  // }

  // // Handle uploading the files to Cloudinary
  // uploadFiles(files: FileList, folderName: string): void {
  //   this.uploading = true;

  //   for (let i = 0; i < files.length; i++) {
  //     const file = files[i];
  //     this.cloudinaryService.uploadImageToFolder(file, folderName).subscribe({
  //       next: (response: any) => {
  //         // Add uploaded image URL to the array
  //         this.imageUrls.push(response.secure_url);
  //         this.uploading = false;
  //       },
  //       error: (error) => {
  //         console.error('Upload failed', error);
  //         this.uploading = false;
  //       }
  //     });
  //   }
  // }

  //  // Fetch images from the specified folder
  //  getImagesFromFolder(folderName: string): void {
  //   this.loading = true;
  //   this.cloudinaryService.getImagesFromFolder(folderName).subscribe({
  //     next: (response: any) => {
  //       this.images = response.resources;  // Store retrieved images
  //       this.loading = false;
  //     },
  //     error: (error) => {
  //       console.error('Error retrieving images', error);
  //       this.loading = false;
  //     }
  //   });
  // }

  selectedFiles: File[] = [];
  uploadedImages: string[] = [];
  isUploading = false;

  constructor(private cloudinaryService: CloudinaryService) {}

  ngOnInit() {
    this.loadImages();
  }

  onFileSelected(event: any) {
    this.selectedFiles = Array.from(event.target.files);
  }

  async uploadImages() {
    if (this.selectedFiles.length === 0) {
      alert('Please select images');
      return;
    }

    this.isUploading = true;
    try {
      const urls = await this.cloudinaryService.uploadImages(this.selectedFiles);
      //this.uploadedImages.push(...urls);
      console.log('Uploaded Image URLs:', urls);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      this.isUploading = false;
    }
  }

  async loadImages() {
    this.uploadedImages = await this.cloudinaryService.getUploadedImages();
  }
}
