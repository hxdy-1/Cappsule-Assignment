import axios from "axios";
import { useCallback, useState } from "react";

const SearchBar = ({ setSaltArr, setNotFound }: any) => {
	const [input, setInput] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	// const [error, setError] = useState<string | null>(null);

	const handleSubmit = useCallback(
		async (e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			setLoading(true);
			try {
				const { data } = await axios.get(
					`https://backend.cappsule.co.in/api/v1/new_search?q=${input}&pharmacyIds=1,2,3`
				);
				// console.log(data.data.saltSuggestions);
				// console.log(data.data.saltSuggestions.length);
				if (data.data.saltSuggestions.length > 0) {
					setSaltArr(data.data.saltSuggestions);
					setNotFound(false);
				} else {
					setNotFound(true);
					setSaltArr([]);
				}
			} catch (error: Error | any) {
				// setError(error.message || "Something went wrong");
				console.log(error);
			} finally {
				setLoading(false);
			}
		},
		[input]
	);

	return (
		<form
			className="shadow-search w-full relative flex items-center rounded-full px-10"
			onSubmit={handleSubmit}
		>
			{input.length === 0 ? (
				<svg
					width="21"
					height="21"
					viewBox="0 0 21 21"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M16.031 14.617L20.314 18.899L18.899 20.314L14.617 16.031C13.0237 17.3082 11.042 18.0029 9 18C4.032 18 0 13.968 0 9C0 4.032 4.032 0 9 0C13.968 0 18 4.032 18 9C18.0029 11.042 17.3082 13.0237 16.031 14.617ZM14.025 13.875C15.2941 12.5699 16.0029 10.8204 16 9C16 5.133 12.867 2 9 2C5.133 2 2 5.133 2 9C2 12.867 5.133 16 9 16C10.8204 16.0029 12.5699 15.2941 13.875 14.025L14.025 13.875Z"
						fill="#555555"
					/>
				</svg>
			) : (
				<svg
					width="24"
					height="16"
					viewBox="0 0 24 16"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M0.292892 7.29289C-0.0976315 7.68342 -0.0976315 8.31658 0.292892 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928932C7.68054 0.538408 7.04738 0.538408 6.65685 0.928932L0.292892 7.29289ZM24 7L1 7V9L24 9V7Z"
						fill="#112D31"
					/>
				</svg>
			)}

			<input
				type="text"
				className="w-full px-10 py-4 border-none outline-none"
				placeholder="Type your medicine name here"
				value={input}
				onChange={(e) => setInput(e.target.value)}
			/>
			<button
				type="submit"
				className="text-[#2A527A] font-semibold px-4 py-2 rounded-md disabled:cursor-not-allowed"
				disabled={input.length === 0}
			>
				{loading ? "Searching..." : "Search"}
			</button>
			<span className="w-full absolute h-0.5 bg-[#CDCDCD] left-0 bottom-[-100%]"></span>
		</form>
	);
};

export default SearchBar;
