import { useTranslation } from "react-i18next";
import type { FunctionComponent } from "../common/types";
import { Accordion } from "../components/ui/Accordion";

export const Home = (): FunctionComponent => {
	const { t } = useTranslation();

	const faqContent = t("faq.content", { returnObjects: true }) as Array<{
		question: string;
		answer: string;
	}>;

	return (
		<div className="min-h-screen w-screen">
			<div className="bg-white">
				<div className="pt-12 md:pt-24 pb-4 md:pb-8">
					<h1 className="text-black text-xl md:text-4xl font-bold text-center">
						Frequently asked questions
					</h1>
				</div>
				<div className="max-w-screen-xl font-inter grid grid-cols-12 mx-auto p-6">
					<Accordion.Root
						className="col-span-12 divide-y-1 divide-gray-200 divide-solid w-full"
						type="multiple"
					>
						{faqContent.map((item, index) => (
							<Accordion.Item key={index} className="" value={`item-${index}`}>
								<Accordion.Header>
									<Accordion.Trigger
										className="flex justify-between w-full py-3 md:py-5 cursor-pointer hover:bg-gray-100 px-2 md:px-4 transition duration-300"
										value={`item-${index}`}
									>
										<span className="text-lg md:text-2xl block text-left font-bold">
											Q{index + 1}. {item.question}
										</span>
									</Accordion.Trigger>
								</Accordion.Header>
								<Accordion.Content value={`item-${index}`}>
									<p className="text-black text-base md:text-lg leading-relaxed">
										{item.answer}
									</p>
								</Accordion.Content>
							</Accordion.Item>
						))}
					</Accordion.Root>
				</div>
			</div>
		</div>
	);
};
