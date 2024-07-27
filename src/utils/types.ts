import { z } from "zod";

type NovelCardType = {
	title: string;
	image: string;
};

interface Character {
	_id?: string;
	name: string;
	imageUrl: string;
}

type ReqNovel = {
	title: string;
	genre: string;
	description?: string;
	imageUrl: string;
};
interface Novel {
	_id: string;
	title: string;
	genre: string;
	description: string;
	imageUrl: string;
	chaptersCount: number;
	isArchieved: boolean;
	characters: Character[];
}

interface Content {
	id: number;
	content: string;
	wordCount: number;
}

type ReqChapter = {
	novel_id: string;
	h4_content: string[];
	p_content: string[];
};

interface Chapter {
	_id?: string;
	novelId: string;
	chapterNumber: number;
	title: string;
	content?: Content[];
}

type HomeStackParamList = {
	Home: undefined;
	ChapterDrawer: undefined;
	Detail: { title: string };
};

export {
	NovelCardType,
	HomeStackParamList,
	Chapter,
	Novel,
	Content,
	Character,
	ReqChapter,
	ReqNovel,
};
