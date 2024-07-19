const capitaliseFirstLetterOfEveryWord = (str: string) => {
	// Split the string into words
	return str
		.toLowerCase()
		.split(" ")
		.map((word) => {
			// Check if the word is an article, conjunction, or preposition
			if (
				[
					"a",
					"an",
					"the",
					"and",
					"but",
					"or",
					"for",
					"nor",
					"on",
					"at",
					"to",
					"from",
					"by",
					"in",
				].includes(word)
			) {
				// If it's the first word, capitalize it
				if (str.toLowerCase().indexOf(word) === 0) {
					return word.charAt(0).toUpperCase() + word.slice(1);
				}
				// Otherwise, keep it lowercase
				return word;
			}

			// Handle contractions and possessives
			if (word.includes("'")) {
				let parts = word.split("'");
				return parts[0].charAt(0).toUpperCase() + parts[0].slice(1) + "'" + parts[1];
			}

			// Capitalize the first letter of other words
			return word.charAt(0).toUpperCase() + word.slice(1);
		})
		.join(" ");
};

export { capitaliseFirstLetterOfEveryWord };
