import { Component, OnInit } from '@angular/core';
import { CloudinaryService } from './services/cloudinary.service';
import { CommonModule } from '@angular/common';
import { CloudinaryFolder } from '../../models/folders';

@Component({
  selector: 'app-img-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './img-upload.component.html',
  styleUrl: './img-upload.component.scss'
})
export class ImgUploadComponent  implements OnInit{
  selectedFiles: File[] = [];
  uploadedImages: { url: string; public_id: string }[] = [];
  isUploading = false;
  cloudinaryFolder = CloudinaryFolder

  constructor(private cloudinaryService: CloudinaryService) {}

  ngOnInit() {
    this.loadImages();
  }

  onFileSelected(event: any) {
    this.selectedFiles = Array.from(event.target.files);
  }

  async uploadImages(folderName: CloudinaryFolder) {
    if (this.selectedFiles.length === 0) {
      alert('Please select images');
      return;
    }

    this.isUploading = true;
    try {
      const urls = await this.cloudinaryService.uploadImages(this.selectedFiles, folderName);
      //this.uploadedImages.push(...urls);
      console.log('Uploaded Image URLs:', urls);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      this.isUploading = false;
    }
  }

  async loadImages() {
    this.uploadedImages = await this.cloudinaryService.getUploadedImages(CloudinaryFolder.Homepage);
  }

  onDeleteImage(public_id: string, index: number) {
    this.cloudinaryService.deleteImage(public_id).subscribe({
      next: () => {
        this.uploadedImages.splice(index, 1);
        console.log(`🗑️ Deleted image with public_id: ${public_id}`);
      },
      error: (err) => {
        console.error('❌ Failed to delete image:', err);
      }
    });
  }
  
}
