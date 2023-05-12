import type { LengthOption } from './validator.interface';

export function indexOf<T>(array: Array<T>, target: any): null | number {
	const index = array.indexOf(target);
	return index === -1 ? null : index;
}

export function include<T>(array: Array<T>, target: any): boolean {
	return indexOf(array, target) !== null;
}

export function match<T>(base: T, regex: RegExp): boolean {
	return regex.test(String(base));
}

export function typed(value: any): string {
	return typeof value;
}

export function isDefined(value: any): boolean {
	return typed(value) !== 'undefined';
}

export function length<T>(base: T, option: LengthOption): boolean {
	const min = isDefined(option.min) ? option.min : 0;
	const max = option.max;

	if (max <= min) {
		throw new Error('`max` should be greater than `min`');
	}

	if (typeof base === 'string') {
		const length = base.length;
		return length >= min && length <= max;
	}

	if (typeof base === 'number') {
		return base >= min && base <= max;
	}

	if (base instanceof Array) {
		const length = base.length;
		return length >= min && length <= max;
	}

	throw new Error('`base` type are not calculable');
}
