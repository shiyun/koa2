import _ from 'lodash'

const compose = _.flow;
const curry = _.curry;

export const add = curry((x, y) => x + y);
export const match = curry((what, str) => str.match(what));
export const filter = curry((f, arr) => arr.filter(f));
export const replace = curry((zj, restr, str) => str.replace(zj, restr));
export const map = curry((f, arr) => arr.map(f));
export const reduce = curry((f, a, arr) => arr.reduce(f, a));
export const split = curry((what, str) => str.split(what));
export const slice = curry((start, end, arr) => arr.slice(start, end));
export const uppercase = curry(x => x.toUpperCase());
export const join = curry((what, arr) => arr.join(what));
export const reverse = curry(arr => arr.reverse());
export const trace = curry((tag, x) => { console.log(tag, x); return x;})
export const prop = curry((prop, obj) => obj[prop]);
export const sortBy = curry((by, obj) => _.sortBy(obj, by))
export const getHeader = curry(str => str[0]);

/*module.exports = {
  add,
  match,
  filter,
  replace,
  map,
  reduce,
  split,
  slice,
  uppercase,
  join,
  reverse,
  trace,
  getHeader,
  prop,
  sortBy,
}*/