
export type Category = 'Dress' | 'Top' | 'Skirt' | 'Pants' | 'Jumpsuit';

export type Silhouette = 
  | 'A-Line' | 'Ball Gown' | 'Mermaid' | 'Sheath' | 'Empire' // Dresses
  | 'Peplum' | 'Crop' | 'Tunic' | 'Bodysuit' | 'Blouse' // Tops
  | 'Pencil' | 'Pleated' | 'Wrap' | 'Maxi' | 'Mini' // Skirts
  | 'Wide Leg' | 'Straight' | 'Tapered' | 'Culottes' | 'Cargo'; // Pants

export type Neckline = 'Sweetheart' | 'V-Neck' | 'Halter' | 'Boat Neck' | 'Off-the-Shoulder' | 'Square' | 'None';
export type SleeveStyle = 'Sleeveless' | 'Short' | 'Cap' | 'Three-Quarter' | 'Long' | 'Bell' | 'Bishop' | 'None';
export type Length = 'Mini' | 'Knee-Length' | 'Midi' | 'Maxi' | 'Floor-Length' | 'Tea-Length' | 'Ankle';

export interface DesignConfig {
  category: Category;
  silhouette: Silhouette;
  neckline: Neckline;
  sleeveStyle: SleeveStyle;
  length: Length;
  additionalNotes: string;
  fabricSourceType: 'link' | 'upload' | 'description';
  fabricData?: string;
}

export interface QuoteResult {
  estimatedPrice: string;
  laborHours: string;
  complexity: 'Low' | 'Medium' | 'High' | 'Exquisite';
  breakdown: string[];
  fabricAnalysis: string;
  aiVisualizationUrl?: string;
  sources?: { title: string; uri: string }[];
}
