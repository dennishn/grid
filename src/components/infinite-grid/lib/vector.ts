import { makeObservable, observable } from "mobx";

export type VectorParams = {
	x: number;
	y: number;
};

export class Vector {
	x: number;
	y: number;

	constructor(params: VectorParams) {
		this.x = params.x;
		this.y = params.y;
		makeObservable(this, {
			x: observable,
			y: observable,
		});
	}

	distanceTo(other: Vector) {
		return Math.sqrt((other.x - this.x) ** 2 + (other.y - this.y) ** 2);
	}

	clone() {
		return new Vector({ x: this.x, y: this.y });
	}
}
