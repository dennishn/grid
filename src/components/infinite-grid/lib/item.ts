import type { Vector } from "@/components/infinite-grid/lib/vector";

export type ItemParams = {
	width: number;
	height: number;
	center: Vector;
};

export class Item {
	id: string;
	center: Vector;
	width: number;
	height: number;

	constructor(params: ItemParams) {
		this.id = crypto.randomUUID();
		this.center = params.center;
		this.width = params.width;
		this.height = params.height;
	}

	getQuadrant(point: Vector) {
		const vertical = point.y > this.center.y ? "bottom" : "top";
		const horizontal = point.x > this.center.x ? "right" : "left";
		return `${vertical}-${horizontal}`;
	}
}
