import { create } from "zustand";
import { persist } from "zustand/middleware";
import { devtools, createJSONStorage } from "zustand/middleware";
import { Chapter, Content, Novel } from "@src/utils/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

interface NovelStore {
	novels: Novel[];
	selectedNovelId: string | null;
	chapters: Chapter[];
	currentChapterId: string | null;
	isLoading: boolean;
	error: string | null;
	setNovels: (novels: Novel[]) => void;
	selectNovel: (novelId: string) => void;
	setChapters: (chapters: Chapter[]) => void;
	selectChapter: (chapterId: string) => void;
	fetchAllNovels: () => Promise<void>;
	fetchChapterContent: (chapterId: string) => Promise<void>;
	fetchAllChaptersTitles: (novelId: string) => Promise<void>;
}

const useNovelStore = create<NovelStore>()((set, get) => ({
	novels: [],
	selectedNovelId: null,
	chapters: [],
	currentChapterId: null,
	isLoading: false,
	error: null,

	setNovels: (novels) => set({ novels }),

	selectNovel: (novelId: string) => set({ selectedNovelId: novelId, currentChapterId: null }),

	setChapters: (chapters) =>
		set(() => ({
			chapters: chapters,
		})),

	selectChapter: (chapterId) => set({ currentChapterId: chapterId }),

	fetchAllNovels: async () => {
		set({ isLoading: true, error: null });
		try {
			const novels = await fetchNovels();
			set({ novels, isLoading: false });
		} catch (error: any) {
			set({ error: error, isLoading: false });
		}
	},

	fetchChapterContent: async (chapterId) => {
		set({ isLoading: true, error: null });
		try {
			const content = await fetchChapterContent(chapterId);
			set((state) => ({
				chapters: state.chapters.map((chapter) => {
					return chapter._id === chapterId ? { ...chapter, content } : chapter;
				}),
				isLoading: false,
			}));
		} catch (error: any) {
			set({ error: error, isLoading: false });
		}
	},

	fetchAllChaptersTitles: async (novelId) => {
		set({ isLoading: true, error: null });
		try {
			const chapters = await fetchAllChaptersTitles(novelId);
			set({ chapters, isLoading: false });
		} catch (error: any) {
			set({ error: error, isLoading: false });
		}
	},
}));

async function fetchChapterContent(chapterId: string): Promise<Content[]> {
	const response = await axios.get(`http://localhost:3000/api/v1/chapters/${chapterId}`);
	const parsedContent = JSON.parse(response.data.content);
	return parsedContent;
}

async function fetchNovels(): Promise<Novel[]> {
	const response = await axios.get("http://localhost:3000/api/v1/novels");
	return response.data;
}

async function fetchAllChaptersTitles(novelId: string): Promise<Chapter[]> {
	const response = await axios.get(`http://localhost:3000/api/v1/novels/${novelId}/title`);
	return response.data;
}

export default useNovelStore;
