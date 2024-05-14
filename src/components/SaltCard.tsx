import { useState, useEffect } from "react";

interface SaltCardProps {
	salt: string;
	availableForms: string[];
	saltFormJson: any;
}

const SaltCard = ({ salt, availableForms, saltFormJson }: SaltCardProps) => {
	const [selectedForm, setSelectedForm] = useState(availableForms[0]);
	const [selectedStrength, setSelectedStrength] = useState("");
	const [selectedPacking, setSelectedPacking] = useState("");
	const [strengths, setStrengths] = useState<string[]>([]);
	const [packings, setPackings] = useState<string[]>([]);
	const [allStrengths, setAllStrengths] = useState<string[]>([]);
	const [allPackings, setAllPackings] = useState<string[]>([]);
	const [lowestPrice, setLowestPrice] = useState<number | null>(null);

	useEffect(() => {
		const allForms = Object.keys(saltFormJson);
		const allStrengthsSet = new Set<string>();
		const allPackingsSet = new Set<string>();

		allForms.forEach((form) => {
			Object.keys(saltFormJson[form]).forEach((strength) => {
				allStrengthsSet.add(strength);
				Object.keys(saltFormJson[form][strength]).forEach((packing) => {
					allPackingsSet.add(packing);
				});
			});
		});

		setAllStrengths(Array.from(allStrengthsSet));
		setAllPackings(Array.from(allPackingsSet));
	}, [saltFormJson]);

	useEffect(() => {
		if (selectedForm) {
			const strengthsArray = Object.keys(
				saltFormJson[selectedForm] || {}
			);
			setStrengths(strengthsArray);
			setSelectedStrength(strengthsArray[0] || "");
		}
	}, [selectedForm, saltFormJson]);

	useEffect(() => {
		if (selectedForm && selectedStrength) {
			const packingsArray = Object.keys(
				saltFormJson[selectedForm]?.[selectedStrength] || {}
			);
			setPackings(packingsArray);
			setSelectedPacking(packingsArray[0] || "");
		}
	}, [selectedForm, selectedStrength, saltFormJson]);

	useEffect(() => {
		if (selectedForm && selectedStrength && selectedPacking) {
			const packings =
				saltFormJson[selectedForm]?.[selectedStrength]?.[
					selectedPacking
				] || {};
			const prices = Object.values(packings)
				.filter((pharmacy: any) => pharmacy !== null)
				.map((pharmacy: any) => pharmacy[0]?.selling_price);
			if (prices.length > 0) {
				setLowestPrice(Math.min(...prices));
			} else {
				setLowestPrice(null);
			}
		} else {
			setLowestPrice(null);
		}
	}, [selectedForm, selectedStrength, selectedPacking, saltFormJson]);

	const handleFormSelect = (form: string) => {
		setSelectedForm(form);
		const strengthsArray = Object.keys(saltFormJson[form] || {});
		setSelectedStrength(strengthsArray[0] || "");
		const packingsArray = Object.keys(
			saltFormJson[form]?.[strengthsArray[0]] || {}
		);
		setSelectedPacking(packingsArray[0] || "");
	};

	const handleStrengthSelect = (strength: string) => {
		setSelectedStrength(strength);
		const packingsArray = Object.keys(
			saltFormJson[selectedForm]?.[strength] || {}
		);
		setSelectedPacking(packingsArray[0] || "");
	};

	const handlePackingSelect = (packing: string) => {
		setSelectedPacking(packing);
	};

	const getButtonClass = (available: boolean, selected: boolean) => {
		let baseClass = "text-xs px-2.5 py-1.5 rounded-lg";
		if (available && selected) {
			return `${baseClass} font-semibold border-2 border-[#112D31] shadow-[0px_0px_11.54px_0px_#00C5A166]`;
		} else if (available && !selected) {
			return `${baseClass} border-2 text-[#555555] border-[#ABABAB]`;
		} else if (!available && selected) {
			return `${baseClass} border-2 border-[#112D31] border-dashed`;
		} else {
			return `${baseClass} border-2 text-[#555555] border-[#ABABAB] border-dashed`;
		}
	};

	return (
		<li className="gradient-salt shadow-salt grid grid-cols-3 px-8 py-8 rounded-2xl">
			<div className="grid grid-cols-2 gap-y-6">
				<div className="text-sm">Form: </div>
				<div className="flex flex-wrap items-center gap-4">
					{availableForms.map((form) => {
						const isSelected = selectedForm === form;
						const isAvailable = availableForms.includes(form);
						return (
							<button
								className={getButtonClass(
									isAvailable,
									isSelected
								)}
								key={form}
								onClick={() => handleFormSelect(form)}
							>
								{form}
							</button>
						);
					})}
				</div>
				<div className="text-sm">Strength: </div>
				<div className="flex flex-wrap items-center gap-4">
					{allStrengths.map((strength) => {
						const isSelected = selectedStrength === strength;
						const isAvailable = strengths.includes(strength);
						return (
							<button
								className={getButtonClass(
									isAvailable,
									isSelected
								)}
								key={strength}
								onClick={() => handleStrengthSelect(strength)}
							>
								{strength}
							</button>
						);
					})}
				</div>
				<div className="text-sm">Packaging: </div>
				<div className="flex flex-wrap items-center gap-4">
					{allPackings.map((packing) => {
						const isSelected = selectedPacking === packing;
						const isAvailable = packings.includes(packing);
						return (
							<button
								className={getButtonClass(
									isAvailable,
									isSelected
								)}
								key={packing}
								onClick={() => handlePackingSelect(packing)}
							>
								{packing}
							</button>
						);
					})}
				</div>
			</div>
			<div className="w-fit py-8 mx-auto flex flex-col items-center justify-center text-center">
				<h2 className="font-bold text-black text-xl mb-2">{salt}</h2>
				<p className="text-[#2A527A] text-xs">
					{selectedForm} | {selectedStrength} | {selectedPacking}
				</p>
			</div>

			<div className="font-[Inter] flex flex-col text-center justify-center items-center">
				{lowestPrice !== null ? (
					<div className="text-black font-extrabold text-3xl">
						From₹{lowestPrice}
					</div>
				) : (
					<div className="w-fit bg-white text-black rounded-md text-sm font-medium leading-[1.2rem] border border-[#A7D6D4] px-6 py-3">
						No stores selling this <br /> product near you
					</div>
				)}
			</div>
		</li>
	);
};

export default SaltCard;
