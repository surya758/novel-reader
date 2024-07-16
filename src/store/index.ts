import { create } from "zustand";
import { persist } from "zustand/middleware";
import { devtools, createJSONStorage } from "zustand/middleware";
import { Chapter, Novel } from "@src/utils/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface NovelStore {
	novels: Novel[];
	selectedNovelId: number | null;
	chapters: Chapter[];
	currentChapterId: number | null;
	isLoading: boolean;
	error: string | null;
	setNovels: (novels: Novel[]) => void;
	selectNovel: (novelId: number) => void;
	setChapters: (chapters: Chapter[]) => void;
	selectChapter: (chapterId: number) => void;
	fetchChapterContent: (novelId: number, chapterId: number) => Promise<void>;
}

const useNovelStore = create<NovelStore>()(
	devtools(
		persist(
			(set, get) => ({
				novels: [
					{
						id: 1,
						title: "The Beginning After The End",
						imageUrl: "https://cdn.pixabay.com/photo/2017/09/01/00/15/png-2702691_640.png",
						chaptersCount: 5,
					},
					{
						id: 2,
						title: "The Beginning After The End",
						imageUrl:
							"https://w7.pngwing.com/pngs/927/515/png-transparent-diamond-isolated-transparent-diamond-isolated-diamond-png-images-png-diamond-transparent-background-thumbnail.png",
						chaptersCount: 5,
					},
				],
				selectedNovelId: null,
				chapters: [],
				currentChapterId: null,
				isLoading: false,
				error: null,

				setNovels: (novels) => set({ novels }),

				selectNovel: (novelId: number) => set({ selectedNovelId: novelId, currentChapterId: null }),

				setChapters: (chapters) =>
					set((state) => ({
						chapters: chapters,
					})),

				selectChapter: (chapterId) => set({ currentChapterId: chapterId }),

				fetchChapterContent: async (novelId, chapterId) => {
					set({ isLoading: true, error: null });
					try {
						const content = await fetchChapterContentFromAPI(novelId, chapterId);
						set((state) => ({
							chapters: state.chapters.map((chapter) => {
								return chapter.id === chapterId ? { ...chapter, content } : chapter;
							}),
							isLoading: false,
						}));
					} catch (error: any) {
						set({ error: error, isLoading: false });
					}
				},
			}),
			{
				name: "novel-store",
				storage: createJSONStorage(() => AsyncStorage),
				partialize: (state) => ({
					novels: state.novels,
					chapters: state.chapters,
					selectedNovelId: state.selectedNovelId,
					currentChapterId: state.currentChapterId,
				}),
			}
		)
	)
);

// Mock function for fetching chapter content
async function fetchChapterContentFromAPI(novelId: number, chapterId: number): Promise<string> {
	// In a real app, this would be an API call
	const chapterData = `Zhang Wei's eyes turned sharp as he slowly crept his hand above Feng Xinyue's ethereal white dress, ready to tear it apart completely.

He had already devised a plan to handle things with Yu Lei afterwards.
	
	Since Feng Xinyue's powers were restricted in this world, this might be the perfect opportunity to tame her.
	
	The Sky God was not to be feared, as there were no communication devices on her body, at least that's what the system had told him.
	
	Zhang Wei pulled his hands with all his might, trying to tear her clothes at once, but to his surprise, nothing happened.
	
	Not even a scratch appeared on the fabric. "What the hell? Is it made of steel?" he muttered.
	
	He tried once again, channeling his Qi through his hands to strengthen them, but the result was the same.
	
	[... Host, you had better give up. Her dress is made of special fibers enhanced by layers of techniques. Unless she wants to take it off herself, it would be impossible for you to undress her], the system informed Zhang Wei.
	
	Zhang Wei closed his eyes in deep thought, "If you already knew that, why didn't you tell me?" he questioned.
	
	[Host doesn't ask. How can the system tell?] the system retorted, leaving Zhang Wei speechless.
	
	He sighed, realizing that in matters concerning Feng Xinyue, the system would offer little to no help.
	
	He then browsed through the system shop in search of an item that could undress her, but he was disappointed to find that there were none.
	
	Perhaps an item would become available once he upgraded the system to the next level.
	
	Zhang Wei noticed Feng Xinyue's current state and gulped, feeling a mouthful of saliva in his mouth.
	
	He moved his hands through her silver hair, feeling its smoothness. Her eyes seemed to be carved by the gods themselves.
	
	"You won't open it?" he asked once again, but Feng Xinyue only blinked in response.
	
	Sensing her ignorance, Zhang Wei grew irritated. He moved his hand towards his pants and took them off, throwing away his undergarments.
	
	"You brought this upon yourself, little princess!"
	
	He lifted her petite body up with his hands and sat on the sofa while making her sit on top of him.
	
	Feng Xinyue flinched as she felt something hot and big hitting against her body.
	
	She instinctively reached out and grabbed it with her small hand.
	
	Zhang Wei groaned in pleasure, feeling a soft touch on his manhood.
	
	His breathing became rough due to the unexpected attack.
	
	"Brother, what is this?" Feng Xinyue asked curiously with a hint of fear in her eyes.
	
	The object in front of her was too large to be held by her hand, making her feel worried and scared.
	
	She gently traced her fingers above his manhood, making Zhang Wei tremble in pleasure.
	
	He couldn't help but wonder what would happen if he had sex with her, if her hands alone were so pleasurable.
	
	Unconsciously, her face started to redden, and she began to feel hot sensations all over her body, which were both comfortable and pleasurable.
	
	Zhang Wei chuckled at her innocent question and reassured her, "Don't worry, you will soon learn what it is." Feng Xinyue nodded in response.
	
	Zhang Wei could tell that Feng Xinyue was in a defensive state against everyone, except with him. She operated with a trust or distrust mentality, with no middle ground.
	
	As for why she trusted him, Zhang Wei didn't care. Since she trusted him, he felt that he should take advantage of it.
	
	=======
	
	Mission:
	
	Teach Feng Xinyue a lesson!
	
	Description:
	
	The villain should not be underestimated or trifled with. Teach the celestial princess a lesson while she is helpless and earn villain points along with a thunder-based technique.
	
	Rewards:
	
	The host can earn 100-2000 villain points, and the more evil actions they perform, the more villain points they will receive.
	
	=======
	
	Zhang Wei's eyes shone with imaginary stars as he looked at his little villain points extractor sitting in his lap.
	
	"System, did you issue this mission?" he asked to confirm.
	
	[I didn't initiate it. I can issue quests in exceptional circumstances, but mostly the quests are issued randomly.]
	
	"Good," Zhang Wei nodded, not wanting the system to have control over his choices. The best part was that there was no penalty attached to it.
	
	His eyes lingered on the red lips of Feng Xinyue. Zhang Wei was never one to have morals, and knowing that this Nizi was old enough to be called his ancestor, he did not hesitate to lean his head and cover her small lips with his.
	
	Feng Xinyue was stunned by his action and tried to struggle free, but her strength was not enough.
	
	Zhang Wei felt a jolt of electricity run down his body, and a sweet lingering smell entered his nostrils, making his lust skyrocket.
	
	His little brother started screaming as blood rushed to it with full might.
	
	Zhang Wei noticed Feng Xinyue's eyes staring at him with confusion and resentment, but there was no fear or anger.
	
	She only looked angry because Zhang Wei was forcing her to do something she did not want to do.
	
	However, her hands betrayed her looks, and climbed above his chest.
	
	Feng Xinyue's lips were extremely soft, so Zhang Wei stuck out his tongue and started licking her delicate lips.
	
	He tasted a sweet flavor that assaulted his taste buds, making him even more excited.
	
	Feng Xinyue struggled and moved her body to get away.
	
	"Pa!"
	
	Zhang Wei suddenly slapped her bottom and glared at her. "Stay like this!" he commanded.
	
	"Humph!" Feng Xinyue pouted her mouth in anger and looked away.
	
	"What happened to her? Where did all her fear go?"
	
	Zhang Wei felt bewildered by her attitude. Shouldn't this girl feel scared of him and follow him? Why is she trying to revolt?
	
	[Host, she earlier felt scared seeing you, as she thought she might have done something to make you furious. But now, you are pushing her to do something that makes her feel uncomfortable, so she is only angry but not scared by your glare.]
	
	In simple words, she doesn't want to make Zhang Wei mad, but that's limited to when he's not pushing her against her will.
	
	She was behaving like a child, not wanting to make her parents mad, but rebelling when forced to do something she doesn't want to do.
	
	Understanding her psychology, Zhang Wei found it easy to comprehend her actions.
	
	Regardless, even if she was going to rebel, he wasn't going to change his mind at all.
	
	He caught her chin and forced her to look at him, then kissed her rosy lips again.
	
	With a fierce grip, he grabbed her delicate chin and tilted her face towards his, locking his eyes onto hers.
	
	She tried to pull away, but his grip was too strong.
	
	He leaned in, his hot breath against her skin, and crushed his lips against hers.
	
	The taste of her sweet, rosy lips sent shivers down his spine, and he deepened the kiss, unable to resist the intoxicating sensation.
	
	Out of suffocation, she separated her lips, only to allow Zhang Wei's tongue to enter her mouth.
	
	Her cheeks started to turn red as he explored every corner of her mouth with his tongue.
	
	Zhang Wei was having a mental breakdown. Despite having an intimate relationship with so many women, the feeling of Feng Xinyue's mouth was something else.
	
	He felt like he could eat her like this forever.
	
	Zhang Wei struggled to keep his composure, his mind reeling from the overwhelming allure of the woman before him.
	
	If not for his practice with the elemental harmony technique, he would surely have succumbed to her charms and lost himself completely.
	
	With trembling hands, he explored her body, tracing his fingers along her back and waist. But it was her perfectly sculpted rear that drew his attention, and he couldn't resist the urge to grab it firmly in his hands and give it a good squeeze. The sensation was indescribable - soft yet firm, tight yet yielding. Zhang Wei was lost in a haze of desire, barely able to contain himself.
	
	"Ngh~" A sweet, muffled moan escaped from Feng Xinyue's lips, sending a shiver down Zhang Wei's spine.
	
	It was the sweetest sound he had ever heard, and it made his heart race with anticipation.
	
	As he reached out to touch her, he was struck by the softness of her skin. He thought nothing could be softer, until his hands finally landed on her breasts.
	
	They were like pillows, and he couldn't resist the urge to squeeze them gently. Yôur f𝒂vorite stories on 𝒏/o/(v)𝒆/lb𝒊n(.)c𝒐m
	
	In that moment, he knew he was in heaven, and he never wanted to leave.
	
	'In the end, if the world burn, let it burn' ideology took over, and he pressed his hand against her breast.
	
	Though there was a thin layer of clothing separating them, it didn't stop Zhang Wei from experiencing heavenly pleasure.
	
	Instantly lost by the pleasure, he shoved Feng Xinyue onto the sofa and climbed on top of her, devouring her lips with reckless abandon.
	
	The taste of her was intoxicating, and he couldn't get enough. Their bodies entwined, and he felt like he was on fire, consumed by desire.
		`;

	const formattedData = chapterData.replace(/\n\t\n\t/g, "\n\n");
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(formattedData);
		}, 500);
	});
}

export default useNovelStore;
