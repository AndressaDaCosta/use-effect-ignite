// useEffect -> Side-effect -> Efeito Colateral

import { useEffect, useState } from 'react';

function avisarAPI() {
	console.log('Lista salva!');
}

export function App() {
	const [list, setList] = useState<string[]>([]);
	const [filter, setFilter] = useState('');

	useEffect(() => {
		console.log(list);
		avisarAPI();
	}, [list]);

	useEffect(() => {
		fetch('https://api.github.com/users/diego3g/repos')
			.then((response) => response.json())
			.then((data) => {
				setList(data.map((item: any) => item.full_name));
			});
	}, []);

	const filteredList = list.filter((item) => item.includes(filter));

	function addToList() {
		setList((state) => [...state, 'Novo Item']);
	}

	return (
		<div>
			<input
				type="text"
				onChange={(e) => setFilter(e.target.value)}
				value={filter}
			/>
			<ul>
				{list.map((item) => (
					<li>{item}</li>
				))}
			</ul>
			<ul>
				{filteredList.map((item) => (
					<li>{item}</li>
				))}
			</ul>
			<button onClick={addToList}>Add to List</button>
		</div>
	);
}
