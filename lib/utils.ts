import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Flatten a nested object structure with dot notation
export function flattenObject(obj: any, prefix = ''): Record<string, any> {
  return Object.keys(obj).reduce((acc: Record<string, any>, key: string) => {
    const pre = prefix.length ? `${prefix}.` : '';
    
    if (
      typeof obj[key] === 'object' && 
      obj[key] !== null && 
      !Array.isArray(obj[key])
    ) {
      Object.assign(acc, flattenObject(obj[key], `${pre}${key}`));
    } else {
      acc[`${pre}${key}`] = obj[key];
    }
    
    return acc;
  }, {});
}

// Convert a flattened object back to nested structure
export function unflattenObject(obj: Record<string, any>): Record<string, any> {
  const result: Record<string, any> = {};
  
  Object.keys(obj).forEach((key) => {
    const parts = key.split('.');
    let current = result;
    
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      
      if (i === parts.length - 1) {
        current[part] = obj[key];
      } else {
        current[part] = current[part] || {};
        current = current[part];
      }
    }
  });
  
  return result;
}

// Generate a key for a new translation entry
export function generateTranslationKey(path: string, name: string): string {
  return path ? `${path}.${name}` : name;
}