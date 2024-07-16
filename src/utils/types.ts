type NovelCardType = {
	title: string;
	image: string;
};

type Chapter = {
	title: string;
};

type HomeStackParamList = {
	Home: undefined;
	Chapter: undefined;
	Detail: { title: string };
};

export { NovelCardType, HomeStackParamList, Chapter };
