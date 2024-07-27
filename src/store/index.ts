import { create } from "zustand";
import { Chapter, Content, Novel, Character, ReqChapter, ReqNovel } from "@src/utils/types";
import axios from "axios";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BACKEND_URL = "https://novel-app-server.vercel.app/api/v1";

export enum Mode {
	ADD_NOVEL = "ADD_NOVEL",
	ADD_CHAPTER = "ADD_CHAPTER",
	ADD_CHARACTER = "ADD_CHARACTER",
	DELETE_NOVEL = "DELETE_NOVEL",
	DELETE_CHAPTER = "DELETE_CHAPTER",
}
interface NovelStore {
	novels: Novel[];
	selectedNovelId: string | null;
	chapters: Chapter[];
	currentChapterId: string | null;
	isLoading: boolean;
	error: string | null;
	mode?: Mode | null;
	novelReadingProgress: { novelId: string; chapterId: string }[];
	chaptersToDelete: string[] | null;
	addNovel: (novel: ReqNovel) => Promise<void>;
	addChapter: (chapter: ReqChapter) => Promise<void>;
	addCharacter: (character: Character) => Promise<void>;
	setNovelReadingProgress: (novelId: string, chapterId: string) => void;
	setNovels: (novels: Novel[]) => void;
	setMode: (mode: Mode | null) => void;
	selectNovel: (novelId: string) => void;
	setChapters: (chapters: Chapter[]) => void;
	selectChapter: (chapterId: string) => void;
	setChapterToDelete: (chapterId: string) => void;
	fetchAllNovels: () => Promise<void>;
	updateNovel: (novelId: string, novel: Novel) => Promise<void>;
	deleteNovel: (novelId: string) => Promise<void>;
	deleteChapters: (chapterIds: string[]) => Promise<void>;
	fetchChapterContent: (chapterId: string) => Promise<void>;
	fetchAllChaptersTitles: (novelId: string) => Promise<void>;
}

const useNovelStore = create<NovelStore>()(
	persist(
		(set, get) => ({
			novels: [],
			selectedNovelId: null,
			chapters: [],
			currentChapterId: null,
			novelReadingProgress: [],
			isLoading: false,
			mode: null,
			error: null,
			chaptersToDelete: null,

			setNovels: (novels) => set({ novels }),

			setMode: (mode: Mode | null) => set({ mode }),

			selectNovel: (novelId: string) => set({ selectedNovelId: novelId, currentChapterId: null }),

			setChapters: (chapters) =>
				set(() => ({
					chapters: chapters,
				})),

			selectChapter: (chapterId) => set({ currentChapterId: chapterId }),

			setChapterToDelete: (chapterId) =>
				set((state) => {
					if (state.chaptersToDelete?.includes(chapterId)) {
						return {
							...state,
							chaptersToDelete: state.chaptersToDelete?.filter((id) => id !== chapterId),
						};
					} else {
						return { ...state, chaptersToDelete: [...(state.chaptersToDelete ?? []), chapterId] };
					}
				}),

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

			updateNovel: async (novelId, novel) => {
				try {
					await updateNovel(novelId, novel);
					// refresh the novels list
					await get().fetchAllNovels();
				} catch (error: any) {
					set({ error: error });
				}
			},

			deleteNovel: async (novelId) => {
				try {
					await deleteNovel(novelId);
					// refresh the novels list
					await get().fetchAllNovels();
				} catch (error: any) {
					set({ error: error });
				}
			},

			deleteChapters: async (chapterIds) => {
				try {
					for (const chapterId of chapterIds) {
						await deleteChapter(chapterId);
					}
					// refresh the chapters list
					await get().fetchAllChaptersTitles(get().selectedNovelId!);
				} catch (error: any) {
					set({ error: error });
				}
			},

			addCharacter: async (character) => {
				set({ isLoading: true, error: null });
				try {
					const novel = get().novels.find((novel) => novel._id === get().selectedNovelId);
					if (novel) {
						const updatedNovel = { ...novel, characters: [...novel.characters, character] };
						await updateNovel(get().selectedNovelId!, updatedNovel);
						await get().fetchAllNovels();
					}
				} catch (error: any) {
					set({ error: error, isLoading: false });
				}
			},

			addChapter: async (chapter) => {
				set({ isLoading: true, error: null });
				try {
					await addChapter(chapter);
					await get().fetchAllChaptersTitles(get().selectedNovelId!);
				} catch (error: any) {
					set({ error: error, isLoading: false });
				}
			},

			addNovel: async (novel) => {
				set({ isLoading: true, error: null });
				try {
					await addNovel(novel);
					await get().fetchAllNovels();
				} catch (error: any) {
					set({ error: error, isLoading: false });
				}
			},
		}),

		{
			name: "novel-storage",
			storage: createJSONStorage(() => AsyncStorage),
			partialize(state) {
				return {
					novelReadingProgress: state.novelReadingProgress,
				};
			},
		}
	)
);

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

async function updateNovel(novelId: string, novel: Novel): Promise<void> {
	await axios.put(`${BACKEND_URL}/novels/${novelId}`, novel);
}

async function deleteNovel(novelId: string): Promise<void> {
	await axios.delete(`${BACKEND_URL}/novels/${novelId}`);
}

async function deleteChapter(chapterId: string): Promise<void> {
	await axios.delete(`${BACKEND_URL}/chapters/${chapterId}`);
}

async function addChapter(chapter: ReqChapter): Promise<void> {
	try {
		await axios.post(`${BACKEND_URL}/chapters`, chapter);
	} catch (e) {
		console.error(e);
	}
}
async function addNovel(novel: ReqNovel): Promise<void> {
	try {
		await axios.post(`${BACKEND_URL}/novels`, novel);
	} catch (e) {
		console.error(e);
	}
}

export default useNovelStore;
