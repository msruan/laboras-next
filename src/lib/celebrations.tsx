import { Fireworks } from "@fireworks-js/react";
import Image from "next/image";
import type { ReactNode } from "react";
import Snowfall from "react-snowfall";
import { Assets } from "@/assets";
import { logger } from "./logger";

interface Celebration {
	isTimeToCelebrate(): boolean;
	launchVisuals(): ReactNode;
	customLogo: () => ReactNode;
}

class Christmas implements Celebration {
	isTimeToCelebrate() {
		const isDecember = new Date().getMonth() === 11;
		const today = new Date().getDate();
		return isDecember && today < 31;
	}

	launchVisuals() {
		return <Snowfall />;
	}

	customLogo() {
		return <Image src={Assets.images.celebrations.christmasLogo} alt="" />;
	}
}

class NewYear implements Celebration {
	isTimeToCelebrate() {
		const isDecember = new Date().getMonth() === 11;

		const isJanuary = new Date().getMonth() === 0;
		const today = new Date().getDate();

		if (isDecember && today === 31) {
			return true;
		}
		if (isJanuary) {
			return true;
		}
		return false;
	}

	launchVisuals() {
		return (
			<Fireworks
				autostart
				options={{ opacity: 0.5, mouse: { click: true } }}
				style={{
					top: 0,
					left: 0,
					width: "100%",
					height: "100%",
					position: "fixed",
				}}
			/>
		);
	}

	customLogo() {
		return <Image src={Assets.images.celebrations.newYearLogo} alt="" />;
	}
}

class Celebrant {
	public actualCelebration: Celebration | null = null;

	constructor(celebrations: Celebration[]) {
		const activeCelebrations = celebrations.filter((c) =>
			c.isTimeToCelebrate(),
		);
		
		if (activeCelebrations.length > 1) {
			//Todo: add a priority prop on celebrations to avoid this
			logger.warn("Multiple celebrations active, selecting first by priority");
		}
		this.actualCelebration = activeCelebrations[0] ?? null;
	}
}

const celebrations: Celebration[] = [new Christmas(), new NewYear()];

export default new Celebrant(celebrations);
