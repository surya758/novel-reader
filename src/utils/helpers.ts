const capitaliseFirstLetterOfEveryWord = (str: string) => {
	const strLowerCase = str.toLowerCase();
	return strLowerCase.replace(/\b\w/g, (char) => char.toUpperCase());
};

export { capitaliseFirstLetterOfEveryWord };
