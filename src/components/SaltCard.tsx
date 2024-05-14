import React, { useState, useEffect, useMemo, useCallback } from "react";
import SelectionButton from "./SelectionButton";

interface SaltCardProps {
	salt: string;
	availableForms: string[];
	saltFormJson: any;
}

const SaltCard: React.FC<SaltCardProps> = ({
	salt,
	availableForms,
	saltFormJson,
}) => {
	const [selectedForm, setSelectedForm] = useState(availableForms[0]);
	const [selectedStrength, setSelectedStrength] = useState("");
	const [selectedPacking, setSelectedPacking] = useState("");
	const [lowestPrice, setLowestPrice] = useState<number | null>(null);

	const allStrengths = useMemo(() => {
		const strengthsSet = new Set<string>();
		Object.keys(saltFormJson).forEach((form) => {
			Object.keys(saltFormJson[form]).forEach((strength) => {
				strengthsSet.add(strength);
			});
		});
		return Array.from(strengthsSet);
	}, [saltFormJson]);

	const allPackings = useMemo(() => {
		const packingsSet = new Set<string>();
		Object.keys(saltFormJson).forEach((form) => {
			Object.keys(saltFormJson[form]).forEach((strength) => {
				Object.keys(saltFormJson[form][strength]).forEach((packing) => {
					packingsSet.add(packing);
				});
			});
		});
		return Array.from(packingsSet);
	}, [saltFormJson]);

	const strengths = useMemo(() => {
		return selectedForm
			? Object.keys(saltFormJson[selectedForm] || {})
			: [];
	}, [selectedForm, saltFormJson]);

	const packings = useMemo(() => {
		return selectedForm && selectedStrength
			? Object.keys(saltFormJson[selectedForm]?.[selectedStrength] || {})
			: [];
	}, [selectedForm, selectedStrength, saltFormJson]);

	useEffect(() => {
		setSelectedStrength(strengths[0] || "");
	}, [strengths]);

	useEffect(() => {
		setSelectedPacking(packings[0] || "");
	}, [packings]);

	useEffect(() => {
		if (selectedForm && selectedStrength && selectedPacking) {
			const packings =
				saltFormJson[selectedForm]?.[selectedStrength]?.[
					selectedPacking
				] || {};
			const prices = Object.values(packings)
				.flat()
				.filter((pharmacy: any) => pharmacy !== null)
				.map((pharmacy: any) => pharmacy.selling_price);
			setLowestPrice(prices.length > 0 ? Math.min(...prices) : null);
		} else {
			setLowestPrice(null);
		}
	}, [selectedForm, selectedStrength, selectedPacking, saltFormJson]);

	const handleFormSelect = useCallback((form: string) => {
		setSelectedForm(form);
	}, []);

	const handleStrengthSelect = useCallback((strength: string) => {
		setSelectedStrength(strength);
	}, []);

	const handlePackingSelect = useCallback((packing: string) => {
		setSelectedPacking(packing);
	}, []);

	return (
		<li className="gradient-salt shadow-salt grid grid-cols-3 px-8 py-8 rounded-2xl">
			<div className="grid grid-cols-2 gap-y-6">
				<div className="text-sm">Form: </div>
				<div className="flex flex-wrap items-center gap-4">
					{availableForms.map((form) => (
						<SelectionButton
							key={form}
							label={form}
							available={availableForms.includes(form)}
							selected={selectedForm === form}
							onClick={() => handleFormSelect(form)}
						/>
					))}
				</div>
				<div className="text-sm">Strength: </div>
				<div className="flex flex-wrap items-center gap-4">
					{allStrengths.map((strength) => (
						<SelectionButton
							key={strength}
							label={strength}
							available={strengths.includes(strength)}
							selected={selectedStrength === strength}
							onClick={() => handleStrengthSelect(strength)}
						/>
					))}
				</div>
				<div className="text-sm">Packaging: </div>
				<div className="flex flex-wrap items-center gap-4">
					{allPackings.map((packing) => (
						<SelectionButton
							key={packing}
							label={packing}
							available={packings.includes(packing)}
							selected={selectedPacking === packing}
							onClick={() => handlePackingSelect(packing)}
						/>
					))}
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
						From ₹{lowestPrice}
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
