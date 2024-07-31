import type { ReactNode } from "react";
import { useEffect, useMemo } from "react";
import { autorun } from "mobx";
import { useComponentSize } from "react-use-size";
import { useMotionValue, useMotionValueEvent, useSpring } from "framer-motion";
import { Box, useBreakpointValue } from "@chakra-ui/react";
import { Grid } from "@/components/infinite-grid/lib/grid";
import { Vector } from "@/components/infinite-grid/lib/vector";
import { useWheel } from "@/components/infinite-grid/hooks/use-wheel";
import { MotionBox } from "@/components/infinite-grid/components/motion-box";
import { InfiniteGridItem } from "@/components/infinite-grid/components/infinite-grid-item";

interface InfiniteGridProps {
	width?: number | string;
	height?: number | string;
	children: ReactNode;
}

const springConfig = { mass: 0.2, damping: 40, stiffness: 200 };

export const InfiniteGrid = ({
	width = "100%",
	height = "100%",
	children,
}: InfiniteGridProps) => {
	const content = useComponentSize();
	const panSensitivity = useBreakpointValue({ base: 12, md: 18, sm: 24 });

	const grid = useMemo(
		() =>
			new Grid({
				width: content.width,
				height: content.height,
			}),
		[content.width, content.height],
	);

	const x = useMotionValue(0);
	const y = useMotionValue(0);

	const springs = {
		x: useSpring(0, springConfig),
		y: useSpring(0, springConfig),
	};

	useMotionValueEvent(springs.x, "change", (val) => {
		grid.setCameraPosition(
			new Vector({
				x: val,
				y: springs.y.get(),
			}),
		);
	});

	useMotionValueEvent(springs.y, "change", (val) => {
		grid.setCameraPosition(
			new Vector({
				x: springs.x.get(),
				y: val,
			}),
		);
	});

	useWheel((e) => {
		springs.x.set(springs.x.get() + e.deltaX * 8);
		springs.y.set(springs.y.get() + e.deltaY * 8);
	});

	useEffect(() => {
		return autorun(() => {
			x.set(-grid.cameraPosition.x);
			y.set(-grid.cameraPosition.y);
		});
	}, [grid, x, y]);

	if (!panSensitivity) {
		return null;
	}

	return (
		<MotionBox
			className="infinite-grid"
			key={grid.id}
			w={width}
			h={height}
			overflow="hidden"
			touchAction="none"
			onPan={(e, pointInfo) => {
				springs.x.set(
					springs.x.get() - pointInfo.delta.x * panSensitivity,
				);
				springs.y.set(
					springs.y.get() - pointInfo.delta.y * panSensitivity,
				);
			}}
		>
			<MotionBox
				className="infinite-grid-content"
				w="100%"
				h="100%"
				pos="relative"
				display="flex"
				alignItems="center"
				justifyContent="center"
				style={{ x, y }}
			>
				<Box
					pos="absolute"
					inset={0}
					className="infinite-grid-measurer"
				>
					<Box
						// to measure the size of the content
						ref={content.ref}
						display="inline-block"
						visibility="hidden"
						minH="100%"
						minW="100%"
					>
						{children}
					</Box>
				</Box>
				{grid.items.map((item) => (
					<InfiniteGridItem key={item.id} item={item}>
						{children}
					</InfiniteGridItem>
				))}
			</MotionBox>
		</MotionBox>
	);
};
