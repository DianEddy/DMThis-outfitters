
import { Category, Silhouette, Neckline, SleeveStyle, Length } from './types';

export const CATEGORIES: Category[] = ['Dress', 'Top', 'Skirt', 'Pants', 'Jumpsuit'];

export const SILHOUETTES_BY_CATEGORY: Record<Category, Silhouette[]> = {
  'Dress': ['A-Line', 'Ball Gown', 'Mermaid', 'Sheath', 'Empire'],
  'Top': ['Peplum', 'Crop', 'Tunic', 'Bodysuit', 'Blouse'],
  'Skirt': ['Pencil', 'Pleated', 'Wrap', 'Maxi', 'Mini'],
  'Pants': ['Wide Leg', 'Straight', 'Tapered', 'Culottes', 'Cargo'],
  'Jumpsuit': ['Wide Leg', 'Straight', 'Tapered', 'Culottes', 'Cargo']
};

export const NECKLINES: Neckline[] = ['Sweetheart', 'V-Neck', 'Halter', 'Boat Neck', 'Off-the-Shoulder', 'Square', 'None'];
export const SLEEVES: SleeveStyle[] = ['Sleeveless', 'Short', 'Cap', 'Three-Quarter', 'Long', 'Bell', 'Bishop', 'None'];
export const LENGTHS: Length[] = ['Mini', 'Knee-Length', 'Midi', 'Maxi', 'Floor-Length', 'Tea-Length', 'Ankle'];
