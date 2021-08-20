import { v4 as uuidv4 } from 'uuid';

export type RepFreq = 'day' | 'week' | 'month' | 'year' | 'sprint';
export class TaskItem {
  private readonly _id: string;
  private _repeatFreq: RepFreq = 'day';
  private _hrs = 0;
  private _totFTE = 0;
  private _totFTEOverPoP = 0;
  private _PoP = 2080;
  private _name = '';

  constructor() {
    this._id = uuidv4();
  }

  public get id() {
    return this._id;
  }

  public set name(name: string) {
    this._name = name;
  }
  public get name() {
    return this._name;
  }

  public set repeatFrequency(freq: RepFreq) {
    this._repeatFreq = freq;
  }
  public get repeatFrequency() {
    return this._repeatFreq;
  }

  public set hrs(hrs: number) {
    this._hrs = hrs;
    this.calcFTESubtotal();
  }
  public get hrs() {
    return this._hrs;
  }

  public set PoP(pop: number) {
    this._PoP = pop;
    this.calcFTEOverPoP();
  }

  public get totFTE() {
    return this._totFTE;
  }

  public get totFTEOverPoP() {
    return this._totFTEOverPoP;
  }

  private calcFTESubtotal() {
    let fteSubtotal = this._hrs;

    switch (this._repeatFreq) {
      case 'day':
        fteSubtotal *= 5 * 52;
        break;
      case 'week':
        fteSubtotal *= 52;
        break;
      case 'month':
        fteSubtotal *= 12;
        break;
      case 'sprint':
        fteSubtotal *= 26;
        break;
      default:
        break;
    }

    fteSubtotal /= 2080;
    fteSubtotal = parseFloat((Math.round(fteSubtotal * 100) / 100).toFixed(2));
    this._totFTE = fteSubtotal;
    this.calcFTEOverPoP();
  }

  private calcFTEOverPoP() {
    const interm = (this._totFTE * this._PoP) / 2080;
    this._totFTEOverPoP = parseFloat(
      (Math.round(interm * 1000) / 1000).toFixed(3)
    );
  }

  public updateVals() {
    console.log('vals updated');
  }
}
