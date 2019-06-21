export interface Foreground {
  id?: string;
  name?: string;
  path?: string;
  downloadURL?: string;
  sort?: number;
  type?: string;
  fullscreen?: boolean;
  hidetime?: boolean; // should or shouldn't hide time block when slide active
  visible?: boolean;
  width?: number;
  positionPercents?: {
    // store on database
    x: number;
    y: number;
  };
  positionPixels?: {
    // for rendering only
    x: number;
    y: number;
  };
}
