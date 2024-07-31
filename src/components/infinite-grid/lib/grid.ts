import { Vector } from "@/components/infinite-grid/lib/vector";
import { Item } from "@/components/infinite-grid/lib/item";
import { action, makeObservable, observable } from "mobx";

export type GridParams = {
	width: number;
	height: number;
};

export class Grid {
	id: string;
	cameraPosition: Vector;
	items: Array<Item>;
	width: number;
	height: number;

	constructor({ width, height }: GridParams) {
		this.id = crypto.randomUUID();
		this.width = width;
		this.height = height;
		this.cameraPosition = new Vector({ x: 0, y: 0 });
		this.items = [
			new Item({
				width,
				height,
				center: new Vector({ x: 0, y: 0 }),
			}),
			new Item({
				width,
				height,
				center: new Vector({ x: width, y: 0 }),
			}),
			new Item({
				width,
				height,
				center: new Vector({ x: 0, y: height }),
			}),
			new Item({
				width,
				height,
				center: new Vector({ x: width, y: height }),
			}),
		];
		makeObservable(this, {
			cameraPosition: observable,
			setCameraPosition: action,
		});
	}

	setCameraPosition(position: Vector) {
		this.cameraPosition = position;
		const closestItem = this.getClosestItem();
		const quadrant = closestItem.getQuadrant(this.cameraPosition);
		const anchor = closestItem.center.clone();
		if (quadrant === "top-right") {
			this.items[0].center.x = anchor.x;
			this.items[0].center.y = anchor.y;
			this.items[1].center.x = anchor.x;
			this.items[1].center.y = anchor.y - this.height;
			this.items[2].center.x = anchor.x + this.width;
			this.items[2].center.y = anchor.y - this.height;
			this.items[3].center.x = anchor.x + this.width;
			this.items[3].center.y = anchor.y;
		}
		if (quadrant === "top-left") {
			this.items[0].center.x = anchor.x;
			this.items[0].center.y = anchor.y;
			this.items[1].center.x = anchor.x;
			this.items[1].center.y = anchor.y - this.height;
			this.items[2].center.x = anchor.x - this.width;
			this.items[2].center.y = anchor.y - this.height;
			this.items[3].center.x = anchor.x - this.width;
			this.items[3].center.y = anchor.y;
		}
		if (quadrant === "bottom-left") {
			this.items[0].center.x = anchor.x;
			this.items[0].center.y = anchor.y;
			this.items[1].center.x = anchor.x;
			this.items[1].center.y = anchor.y + this.height;
			this.items[2].center.x = anchor.x - this.width;
			this.items[2].center.y = anchor.y + this.height;
			this.items[3].center.x = anchor.x - this.width;
			this.items[3].center.y = anchor.y;
		}
		if (quadrant === "bottom-right") {
			this.items[0].center.x = anchor.x;
			this.items[0].center.y = anchor.y;
			this.items[1].center.x = anchor.x;
			this.items[1].center.y = anchor.y + this.height;
			this.items[2].center.x = anchor.x + this.width;
			this.items[2].center.y = anchor.y + this.height;
			this.items[3].center.x = anchor.x + this.width;
			this.items[3].center.y = anchor.y;
		}
	}

	getClosestItem() {
		let minDistance = Infinity;
		let closestItem: Item | null = null;
		this.items.forEach((item) => {
			const distance = item.center.distanceTo(this.cameraPosition);
			if (distance < minDistance) {
				minDistance = distance;
				closestItem = item;
			}
		});
		return closestItem!;
	}
}
