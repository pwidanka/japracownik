import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ControlContainer, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [
    FlexLayoutModule,
    MatDialogModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
  ],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective
    }
  ]
})
export class SkillsComponent implements OnInit {
  profilZawodowy = '';
  doswiadczenie = '';
  wyksztalcenie = '';
  skills: string[] = [];

  constructor(
    private dialog: MatDialog,
    private formGroupDirective: FormGroupDirective
  ) {}

  ngOnInit() {
    const parentForm = this.formGroupDirective.form;
    parentForm.patchValue({
      profilZawodowy: this.profilZawodowy,
      doswiadczenie: this.doswiadczenie,
      wyksztalcenie: this.wyksztalcenie,
      skills: this.skills
    });
  }

  openEditDialog(property: keyof SkillsComponent, tytul: string, event: Event): void {
    event.preventDefault();
    const dialogRef = this.dialog.open(TextAreaDialogComponent, {
      data: { value: this[property], tytul: tytul },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this[property] = result.value;
        const parentForm = this.formGroupDirective.form;
        parentForm.patchValue({ [property]: result.value });
      }
    });
  }

  openEditDialogSkill(skill: string, event: Event): void {
    event.preventDefault();
    const dialogRef = this.dialog.open(SkillsDialogComponent, {
      data: { skill, canDelete: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.action === 'delete') {
        this.skills = this.skills.filter(s => s !== skill);
      } else if (result?.action === 'save') {
        const index = this.skills.indexOf(skill);
        if (index !== -1) {
          this.skills[index] = result.skill;
        }
      }
    });
  }

  openAddDialogSkill(event: Event): void {
    event.preventDefault();
    const dialogRef = this.dialog.open(SkillsDialogComponent, {
      data: { skill: '', canDelete: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.action === 'save' && result.skill) {
        this.skills.push(result.skill);
      }
    });
  }

}

import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-textarea-dialog',
  standalone: true,
  imports: [FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatDialogModule],
  template: `
    <h2 mat-dialog-title>{{data.tytul}}</h2>
      <mat-dialog-content>
        <mat-form-field class="full-width">
          <textarea matInput [(ngModel)]="data.value" rows="6"></textarea>
        </mat-form-field>
      </mat-dialog-content>
      <mat-dialog-actions>
        <button mat-button (click)="onCancel()">Anuluj</button>
        <button mat-button (click)="onSave()">Zapisz</button>
      </mat-dialog-actions>
  `,
  styles: [`
    .full-width {
      min-width: 300px;
      width: 100%;
      textarea{
        resize: none;
      }
    }
  `]
})
export class TextAreaDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<TextAreaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onSave(): void {
    this.dialogRef.close(this.data);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}


@Component({
  selector: 'app-skills-dialog',
  imports: [FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatDialogModule],
  standalone: true,
  template:`
    <h1 mat-dialog-title>{{ data.skill ? 'Edytuj umiejętność' : 'Dodaj umiejętność' }}</h1>

    <div mat-dialog-content>
      <mat-form-field>
        <mat-label>Umiejętność</mat-label>
        <input matInput [(ngModel)]="data.skill">
      </mat-form-field>
    </div>

    <div mat-dialog-actions>
      <button mat-button (click)="onCancel()">Anuluj</button>
      <button mat-button (click)="onSave()">Zapisz</button>
      @if(data.canDelete){  
        <button mat-button (click)="onDelete()" color="warn">Usuń</button>
      }
    </div>
  `
})
export class SkillsDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<SkillsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { skill: string, canDelete: boolean }
  ) {}

  onSave(): void {
    this.dialogRef.close({ action: 'save', skill: this.data.skill });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onDelete(): void {
    this.dialogRef.close({ action: 'delete' });
  }
}