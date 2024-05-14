import { useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import SaltCard from "./components/SaltCard";

interface Salt {
	id: number;
	salt: string;
	available_forms: string[];
	salt_forms_json: any;
}

const commonClasses =
	"text-center font-semibold absolute left-0 right-0 bottom-[-180%]";

function App() {
	const [saltArr, setSaltArr] = useState<Salt[]>([]);
	const [notFound, setNotFound] = useState<boolean>(false);

	return (
		<>
			<h1 className="text-2xl text-center mb-16">
				Cappsule web development test
			</h1>
			<SearchBar setSaltArr={setSaltArr} setNotFound={setNotFound} />
			{saltArr && saltArr.length > 0 && (
				<ul className="flex flex-col gap-8 mt-28">
					{saltArr.map((salt) => (
						<SaltCard
							key={salt.id}
							salt={salt.salt}
							availableForms={salt.available_forms}
							saltFormJson={salt.salt_forms_json}
						/>
					))}
				</ul>
			)}
			{saltArr.length === 0 && !notFound && (
				<h3 className={`text-[#888888] ${commonClasses}`}>
					“ Find medicines with amazing discount “
				</h3>
			)}
			{notFound && (
				<h3 className={`text-red-400 ${commonClasses}`}>
					“ Your search did not produce any results “
				</h3>
			)}
		</>
	);
}

export default App;
