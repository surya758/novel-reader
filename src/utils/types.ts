type NovelCardType = {
	title: string;
	image: string;
};

interface Novel {
	id: number;
	title: string;
	imageUrl: string;
	chaptersCount: number;
}

interface Chapter {
	id: number;
	title: string;
	content?: string;
}

// type Chapter = {
// 	title: string;
// };

type HomeStackParamList = {
	Home: undefined;
	Chapter: { title: string };
	Detail: { title: string };
};

export { NovelCardType, HomeStackParamList, Chapter, Novel };
