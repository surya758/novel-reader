type NovelCardType = {
	title: string;
	image: string;
};

interface Novel {
	_id: string;
	title: string;
	imageUrl: string;
	chaptersCount: number;
}

interface Content {
	id: number;
	content: string;
	wordCount: number;
}

interface Chapter {
	_id: string;
	novelId: string;
	chapterNumber: number;
	title: string;
	content?: Content[];
}

type HomeStackParamList = {
	Home: undefined;
	Chapter: { title: string };
	Detail: { title: string };
};

export { NovelCardType, HomeStackParamList, Chapter, Novel, Content };