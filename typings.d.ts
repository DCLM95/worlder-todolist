import { Timestamp } from "firebase/firestore";
import { toUnicode } from "punycode";

export interface Incomplete {
  title: string;
  done: boolean;
  deleted: boolean;
  createdAt: timestamp;
  obj: object;
}

export interface Usertodos {
  title: string;
  done: boolean;
  deleted: boolean;
  createdAt: string;
  id: string;
}

export interface Obj {
  id: string;
}
