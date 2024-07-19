import { create } from "zustand";
import { Chapter, Content, Novel } from "@src/utils/types";
import axios from "axios";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BACKEND_URL = "https://novel-app-server.vercel.app/api/v1";
interface NovelStore {
	novels: Novel[];
	selectedNovelId: string | null;
	chapters: Chapter[];
	currentChapterId: string | null;
	isLoading: boolean;
	error: string | null;
	novelReadingProgress: { novelId: string; chapterId: string }[];
	setNovelReadingProgress: (novelId: string, chapterId: string) => void;
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
	novelReadingProgress: [],
	isLoading: false,
	error: null,

	setNovels: (novels) => set({ novels }),

	selectNovel: (novelId: string) => set({ selectedNovelId: novelId, currentChapterId: null }),

	setChapters: (chapters) =>
		set(() => ({
			chapters: chapters,
		})),

	selectChapter: (chapterId) => set({ currentChapterId: chapterId }),

	setNovelReadingProgress: (novelId, chapterId) => {
		set((state) => {
			const existingProgressIndex = state.novelReadingProgress.findIndex(
				(progress) => progress.novelId === novelId
			);

			if (existingProgressIndex !== -1) {
				// If an entry for this novel exists, update it
				const updatedProgress = [...state.novelReadingProgress];
				updatedProgress[existingProgressIndex] = { novelId, chapterId };
				return { novelReadingProgress: updatedProgress };
			} else {
				// If no entry exists for this novel, add a new one
				return {
					novelReadingProgress: [...state.novelReadingProgress, { novelId, chapterId }],
				};
			}
		});
	},

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
	const response = await axios.get(`${BACKEND_URL}/chapters/${chapterId}`);
	const parsedContent = JSON.parse(response.data.content);
	return parsedContent;
}

async function fetchNovels(): Promise<Novel[]> {
	const response = await axios.get(`${BACKEND_URL}/novels`);
	return response.data;
}

async function fetchAllChaptersTitles(novelId: string): Promise<Chapter[]> {
	const response = await axios.get(`${BACKEND_URL}/novels/${novelId}/title`);
	return response.data;
}

export default useNovelStore;
