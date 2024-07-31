import { useEventListener } from "@chakra-ui/hooks";
import { Lethargy } from "lethargy-ts";

const lethargy = new Lethargy();

type WheelListener = (e: WheelEvent) => void;

export const useWheel = (listener: WheelListener) => {
	useEventListener("wheel", (e) => {
		if (lethargy.check(e)) {
			listener(e);
		}
	});
};
