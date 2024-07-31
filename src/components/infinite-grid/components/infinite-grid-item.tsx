import { useMotionValue } from "framer-motion";
import type { ReactNode } from "react";
import { useEffect } from "react";
import { autorun } from "mobx";
import type { ItemParams } from "@/components/infinite-grid/lib/item";
import { MotionBox } from "@/components/infinite-grid/components/motion-box";

export type InfiniteGridItemProps = {
	item: ItemParams;
	children: ReactNode;
};

const InfiniteGridItem = ({ item, children }: InfiniteGridItemProps) => {
	const x = useMotionValue(item.center.x);
	const y = useMotionValue(item.center.y);

	useEffect(() => {
		return autorun(() => {
			x.set(item.center.x);
			y.set(item.center.y);
		});
	}, [item.center.x, item.center.y, x, y]);

	return (
		<MotionBox
			className="infinite-grid-item"
			pos="absolute"
			w={item.width}
			h={item.height}
			style={{ x, y }}
		>
			{children}
		</MotionBox>
	);
};

export { InfiniteGridItem };
