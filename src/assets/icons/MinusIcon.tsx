import type { BaseIconProps } from "../../types/globals";
import type { ReactElement } from "react";

export const MinusIcon = ({
	size = 24,
	className,
	...props
}: BaseIconProps): ReactElement => {
	return (
		<svg
			className={className}
			fill="none"
			height={size}
			stroke="currentColor"
			strokeWidth={2}
			viewBox="0 0 24 24"
			width={size}
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path d="M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
};
