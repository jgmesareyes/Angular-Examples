import { Component, Inject } from '@angular/core';
import { Hero } from '../hero';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent {

  private data: any;

  constructor(public dialogRef: MatDialogRef<HeroDetailComponent>, @Inject(MAT_DIALOG_DATA) public hero: Hero) {
    this.data = hero;
  }

  close(): void {
    this.dialogRef.close();
  }

}
