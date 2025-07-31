import React, { useState, createContext, useContext } from "react";
import { PlusIcon } from "../../assets/icons/PlusIcon";
import { MinusIcon } from "../../assets/icons/MinusIcon";

// Context for accordion state
type AccordionContextValue = {
	openItems: Set<string>;
	toggleItem: (value: string) => void;
};

const AccordionContext = createContext<AccordionContextValue | null>(null);

const useAccordionContext = (): AccordionContextValue => {
	const context = useContext(AccordionContext);
	if (!context) {
		throw new Error("Accordion components must be used within Accordion.Root");
	}
	return context;
};

// Root component
interface AccordionRootProps {
	children: React.ReactNode;
	type?: "single" | "multiple";
	className?: string;
}

const AccordionRoot = React.forwardRef<HTMLDivElement, AccordionRootProps>(
	({ children, type = "multiple", className, ...props }, ref) => {
		const [openItems, setOpenItems] = useState<Set<string>>(new Set());

		const toggleItem = (value: string): void => {
			setOpenItems((previous) => {
				const newSet = new Set(previous);
				if (type === "single") {
					// Single mode: close all others, toggle current
					newSet.clear();
					if (!previous.has(value)) {
						newSet.add(value);
					}
				} else {
					// Multiple mode: toggle current
					if (newSet.has(value)) {
						newSet.delete(value);
					} else {
						newSet.add(value);
					}
				}
				return newSet;
			});
		};

		return (
			<AccordionContext.Provider value={{ openItems, toggleItem }}>
				<div ref={ref} className={className} {...props}>
					{children}
				</div>
			</AccordionContext.Provider>
		);
	}
);

// Item component
interface AccordionItemProps {
	children: React.ReactNode;
	value: string;
	className?: string;
}

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
	({ children, value, className, ...props }, ref) => {
		const { openItems } = useAccordionContext();
		const isOpen = openItems.has(value);

		return (
			<div
				ref={ref}
				className={className}
				data-state={isOpen ? "open" : "closed"}
				{...props}
			>
				{children}
			</div>
		);
	}
);

// Header component
interface AccordionHeaderProps {
	children: React.ReactNode;
	className?: string;
}

const AccordionHeader = React.forwardRef<
	HTMLHeadingElement,
	AccordionHeaderProps
>(({ children, className, ...props }, ref) => (
	<h3 ref={ref} className={className} {...props}>
		{children}
	</h3>
));

// Trigger component
interface AccordionTriggerProps {
	children: React.ReactNode;
	value: string;
	className?: string;
}
const AccordionTrigger = React.forwardRef<
	HTMLButtonElement,
	AccordionTriggerProps
>(({ children, className, value, ...props }, ref) => {
	const { openItems, toggleItem } = useAccordionContext();
	const isOpen = openItems.has(value);

	return (
		<button
			ref={ref}
			className={`${className} flex gap-6 justify-between items-center`}
			data-state={isOpen ? "open" : "closed"}
			type="button"
			onClick={() => {
				toggleItem(value);
			}}
			{...props}
		>
			<div className="flex-1">{children}</div>
			{isOpen ? (
				<MinusIcon className="size-5 md:size-7 text-black" />
			) : (
				<PlusIcon className="size-5 md:size-7 text-black" />
			)}
		</button>
	);
});

// Content component
interface AccordionContentProps {
	children: React.ReactNode;
	value: string;
	className?: string;
}

const AccordionContent = React.forwardRef<
	HTMLDivElement,
	AccordionContentProps
>(({ children, value, className, ...props }, ref) => {
	const { openItems } = useAccordionContext();
	const isOpen = openItems.has(value);

	return (
		<div
			ref={ref}
			data-state={isOpen ? "open" : "closed"}
			role="region"
			className={`grid transition-all duration-300 ease-out ${
				isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
			} ${className || ""}`}
			{...props}
		>
			<div className="overflow-hidden">
				<div
					className={`transition-all duration-300 px-2 md:px-4 ease-out ${isOpen ? "pt-6 pb-8 opacity-100" : "py-0 opacity-0"}`}
				>
					{children}
				</div>
			</div>
		</div>
	);
});

// Display names
AccordionRoot.displayName = "Accordion";
AccordionItem.displayName = "AccordionItem";
AccordionHeader.displayName = "AccordionHeader";
AccordionTrigger.displayName = "AccordionTrigger";
AccordionContent.displayName = "AccordionContent";

// Exports
export const Accordion = {
	Root: AccordionRoot,
	Item: AccordionItem,
	Header: AccordionHeader,
	Trigger: AccordionTrigger,
	Content: AccordionContent,
};

export type {
	AccordionRootProps,
	AccordionItemProps,
	AccordionHeaderProps,
	AccordionTriggerProps,
	AccordionContentProps,
};
