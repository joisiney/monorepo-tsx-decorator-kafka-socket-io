import { Left } from './left';
import { Right } from './right';
export * from './left';
export * from './right';
export type Either<R, L> = Left<R, L> | Right<R, L>;
