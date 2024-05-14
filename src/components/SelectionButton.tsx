import React from "react";

interface SelectionButtonProps {
	label: string;
	available: boolean;
	selected: boolean;
	onClick: () => void;
}

const SelectionButton: React.FC<SelectionButtonProps> = ({
	label,
	available,
	selected,
	onClick,
}) => {
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
		<button
			className={getButtonClass(available, selected)}
			onClick={onClick}
		>
			{label}
		</button>
	);
};

export default SelectionButton;
