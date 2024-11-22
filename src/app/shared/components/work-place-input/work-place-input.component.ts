import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'app-work-place-input',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatIconModule,
    FlexLayoutModule
  ],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => WorkPlaceInputComponent),
    multi: true
  }],
  templateUrl: './work-place-input.component.html',
  styleUrls: ['./work-place-input-components.scss']
})
export class WorkPlaceInputComponent implements ControlValueAccessor, OnInit {
  @Input() availablePlaces: string[] = [];
  
  placeCtrl = new FormControl('', [Validators.required]);
  selectedPlaces: string[] = [];
  filteredPlaces: string[] = [];


  ngOnInit() {
    this.filteredPlaces = [...this.availablePlaces];

    this.placeCtrl.setValidators([
      () => this.selectedPlaces.length === 0 ? { 'required': true } : null
    ]);

    this.placeCtrl.valueChanges.subscribe(value => {
      if (typeof value === 'string') {
        this.filteredPlaces = this._filterPlaces(value);
      }
    });
  }

  private _filterPlaces(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.availablePlaces.filter(place => 
      place.toLowerCase().includes(filterValue)
    );
  }

  onChange = (_: any) => {};
  onTouch = () => {};
  
  writeValue(value: string[]): void {
    if (value) {
      this.selectedPlaces = value;
    }
  }
  
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  
  addCustomPlace(): void {
    const value = this.placeCtrl.value;
    if (value && typeof value === 'string' && value.trim()) {
      if (!this.selectedPlaces.includes(value)) {
        this.selectedPlaces = [...this.selectedPlaces, value.trim()];
        this.onChange(this.selectedPlaces);
        this.placeCtrl.updateValueAndValidity();
      }
      this.placeCtrl.setValue('');
    }
  }
  
  removePlace(place: string): void {
    this.selectedPlaces = this.selectedPlaces.filter(p => p !== place);
    this.onChange(this.selectedPlaces);
    this.placeCtrl.updateValueAndValidity();
  }
  
  onPlaceSelected(event: any): void {
    const value = event.option.value;
    if (value && !this.selectedPlaces.includes(value)) {
      this.selectedPlaces = [...this.selectedPlaces, value];
      this.onChange(this.selectedPlaces);
      this.placeCtrl.setValue('');
      this.placeCtrl.updateValueAndValidity();
    }
  }
} 