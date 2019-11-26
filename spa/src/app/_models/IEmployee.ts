import { IPhoto } from './IPhoto';

export interface IEmployee {
  eid: number;
  username: string;
  efirstname: string;
  elastname: string;
  age: number;
  egender: string;
  edateofbirth: Date;
  eemail: string;
  elanguages: string;
  eskills: string;
  ereligion: string;
  enationality: string;
  ecaste: string;
  created: Date;
  lastActive: Date;
  photoUrl?: string;
  photos?: IPhoto[];

}
