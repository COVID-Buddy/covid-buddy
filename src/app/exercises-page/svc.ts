import { Injectable } from '@angular/core';
import { Field } from './types';

@Injectable()
export class ExerciseService {
  newField(type: string, name: string): Field {
    const newObj: any = {
      type,
      name,
    };

    switch (type) {
      case 'textarea':
        newObj.rows = null;
        break;
      case 'input':
        newObj.label = '';
        newObj.placeholder = '';
        newObj.inputType = 'text';
        break;
      case 'radio':
      case 'dropdown':
        newObj.label = '';
        newObj.values = [];
        break;
      case 'paragraph':
        delete (newObj.name);
        newObj.text = '';
        break;
      case 'grid':
        delete (newObj.name);
        newObj.columns = [];
        break;
      case 'table':
        newObj.columns = [];
        newObj.rows = 1;
        break;
      case 'rating':
        newObj.label = '';
        newObj.stars = null;
        break;
      case 'list':
        newObj.initial = 1;
        break;
      default:
        return;
    }

    return newObj;
  }

  slugify(input: string): string {
    return input.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
  }
}
