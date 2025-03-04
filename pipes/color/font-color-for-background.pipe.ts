import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fontColorForBackground',
  standalone: true
})
export class FontColorForBackgroundPipe implements PipeTransform {

  transform(bgColor: string): string {
    // rgb
    if (!bgColor) return 'inherit';

    if (bgColor.startsWith('rgb')) {
      const rgb = this.extractRgb(bgColor);
      return this.getTextColorFromRgb(rgb);
    }

    // hex color
    if (bgColor.startsWith('#')) {
      const rgb = this.hexToRgb(bgColor);
      return this.getTextColorFromRgb(rgb);
    }

    return 'inherit'; // Fallback to black
  }

  private extractRgb(rgb: string): number[] {
    const match = rgb.match(/^rgb\((\d+), (\d+), (\d+)\)$/);
    return match ? [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])] : [255, 255, 255]; // Fallback to white
  }

  // Convert hex to RGB (e.g., #ff0000 to [255, 0, 0])
  private hexToRgb(hex: string): number[] {
    let r: number, g: number, b: number;
    if (hex.length === 7) {
      r = parseInt(hex.slice(1, 3), 16);
      g = parseInt(hex.slice(3, 5), 16);
      b = parseInt(hex.slice(5, 7), 16);
    } else {
      r = g = b = 0;
    }
    return [r, g, b];
  }

  private getTextColorFromRgb(rgb: number[]): string {
    const [r, g, b] = rgb;
    const brightness = (r * 299 + g * 587 + b * 114) / 1000; // Using luminosity formula

    return brightness >= 128 ? 'black' : 'white'; // Return 'dark' for light bg, 'light' for dark bg
  }

}
