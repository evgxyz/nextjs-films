
import {ReqStatus} from '@/units/status';
import {Film} from './film';
import _ from 'lodash';

// filmPage

export const filmDefault: Film = { 
  id: 0,
  title: '',
  genres: [],
  countries: [],
  year: 0,
}

// filmPage store

export interface FilmPageState {
  film: Film & {reqStatus: ReqStatus}
}

export const filmPageStateDefault: FilmPageState = {
  film: {...filmDefault, reqStatus: ReqStatus.NONE}
}
