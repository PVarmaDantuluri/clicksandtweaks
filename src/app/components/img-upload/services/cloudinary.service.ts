import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CloudinaryFolder } from '../../../models/folders';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {
  constructor() {}

  // Upload multiple images
  uploadImages(files: File[], folderName: CloudinaryFolder): Promise<string[]> {
    const uploadPromises = files.map(file => this.uploadFile(file, folderName));
    return Promise.all(uploadPromises);
  }

  // Upload a single file
  private async uploadFile(file: File, folderName: CloudinaryFolder): Promise<string> {
    const cloudinaryInfo = localStorage.getItem('cloudinaryInfo');
    if (cloudinaryInfo) {
      const { cloudName, uploadPreset } = JSON.parse(cloudinaryInfo);
      const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);
      formData.append('folder', folderName); // Dynamic folder name
  
      const response = await fetch(uploadUrl, {
        method: 'POST',
        body: formData
      });
  
      if (!response.ok) {
        throw new Error('Upload failed');
      }
  
      const data = await response.json();
      return data.secure_url;
    }
    throw new Error('No cloudinary info');
  }
  

  async getUploadedImages(folderName: CloudinaryFolder): Promise<string[]> {
    const response = await fetch(`http://localhost:3000/api/images?folder=${folderName}`);
    if (!response.ok) {
      throw new Error('Failed to fetch images');
    }
    return await response.json();
  }
}
