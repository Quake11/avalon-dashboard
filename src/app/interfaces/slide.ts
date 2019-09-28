export interface Slide {
  id?: string;
  name?: string;
  path?: string;
  downloadURL?: string;
  youtubeUrl?: string;
  youtubeId?: string;
  sort?: number;
  type?: string;
  fullscreen?: boolean;
  hidetime?: boolean; // should or shouldn't hide time block when slide active
  visible?: boolean;
}
