const capitaliseFirstLetterOfEveryWord = (str: string) => {
	const strLowerCase = str.toLowerCase();
	return strLowerCase
		.replace(/\b\w/g, (char) => char.toUpperCase())
		.replace(/'\w+/g, (match) => match.toLowerCase());
};

export { capitaliseFirstLetterOfEveryWord };
