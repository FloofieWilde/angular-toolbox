import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'adjustColor',
  standalone: true,
})
export class AdjustColorPipe implements PipeTransform {

  transform(color: string, amount: number): string {
    if (!amount) return color;
    if (!color) return 'inherit';

    let rgb = this.hexToRgb(color) || this.extractRgb(color);
    if (!rgb) return color; // Retourne la couleur d'origine si invalide

    rgb = this.adjustBrightness(rgb, amount);
    console.log(this.rgbToHex(rgb));
    return this.rgbToHex(rgb);
  }

  // Convertit une couleur hexadécimale en RGB
  private hexToRgb(hex: string): number[] | null {
    if (!/^#?[0-9A-Fa-f]{6}$/.test(hex)) return null;
    hex = hex.replace('#', '');
    return [
      parseInt(hex.substring(0, 2), 16),
      parseInt(hex.substring(2, 4), 16),
      parseInt(hex.substring(4, 6), 16),
    ];
  }

  // Extrait RGB depuis une chaîne de type "rgb(255, 255, 255)"
  private extractRgb(rgbString: string): number[] | null {
    const match = rgbString.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    return match ? [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])] : null;
  }

  // Ajuste la luminosité de la couleur
  private adjustBrightness(rgb: number[], amount: number): number[] {
    return rgb.map(channel => Math.min(255, Math.max(0, channel + amount)));
  }

  // Convertit une couleur RGB en hexadécimal
  private rgbToHex(rgb: number[]): string {
    return `#${rgb.map(c => c.toString(16).padStart(2, '0')).join('')}`;
  }
}
