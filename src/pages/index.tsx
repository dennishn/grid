import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { Grid, GridItem } from "@chakra-ui/react";
import { InfiniteGrid } from "@/components/infinite-grid/components/infinite-grid";
import type { Image } from "@/components/image";

import images from "../dummy-data.json";

type Image = {
	id: string;
	author: string;
	width: number;
	height: number;
	url: string;
	download_url: string;
};

const Home = ({ images }: InferGetStaticPropsType<typeof getStaticProps>) => {
	return (
		<InfiniteGrid>
			<Grid
				templateAreas={`
				  "a a a b b b c c"
				  "d d e e e f f f"
				  "g g g h h i i i"
				`}
				gridTemplateColumns={"repeat(8, 1fr)"}
				gridTemplateRows={"repeat(3, 1fr)"}
				w={{ base: "150vw", md: "100vw" }}
				h={{ base: "100vh", md: "125vh" }}
				gap={8}
				p={4}
			>
				<GridItem
					area="a"
					bgImage={images[0].download_url}
					bgSize="cover"
					rounded="3xl"
				/>
				<GridItem
					area="b"
					bgImage={images[1].download_url}
					bgSize="cover"
					rounded="3xl"
				/>
				<GridItem
					area="c"
					bgImage={images[2].download_url}
					bgSize="cover"
					rounded="3xl"
				/>
				<GridItem
					area="d"
					bgImage={images[3].download_url}
					bgSize="cover"
					rounded="3xl"
				/>
				<GridItem
					area="e"
					bgImage={images[4].download_url}
					bgSize="cover"
					rounded="3xl"
				/>
				<GridItem
					area="f"
					bgImage={images[5].download_url}
					bgSize="cover"
					rounded="3xl"
				/>{" "}
				<GridItem
					area="g"
					bgImage={images[6].download_url}
					bgSize="cover"
					rounded="3xl"
				/>
				<GridItem
					area="h"
					bgImage={images[7].download_url}
					bgSize="cover"
					rounded="3xl"
				/>
				<GridItem
					area="i"
					bgImage={images[8].download_url}
					bgSize="cover"
					rounded="3xl"
				/>
			</Grid>
		</InfiniteGrid>
	);
};

export const getStaticProps = (async () => {
	return {
		props: {
			images,
		},
	};
}) satisfies GetStaticProps<{ images: Array<Image> }>;

export default Home;
