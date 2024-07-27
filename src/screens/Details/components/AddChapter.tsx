import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { TextInput, Button } from "react-native-paper";
import { RNText } from "src/components";
import { COLORS } from "src/theme";
import useNovelStore, { Mode } from "src/store";
import { z } from "zod";

const chapterSchema = z.object({
	title: z.string().min(1, "Title is required"),
	content: z.string().min(1, "Content is required"),
});

type Chapter = z.infer<typeof chapterSchema>;

const AddChapter = () => {
	const { addChapter, setMode, selectedNovelId, chapters } = useNovelStore();
	const [formData, setFormData] = useState<Chapter>({
		title: "",
		content: "",
	});
	const [errors, setErrors] = useState<Partial<Chapter>>({});

	const handleChange = (field: keyof Chapter, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
		setErrors((prev) => ({ ...prev, [field]: undefined }));
	};

	const handleSubmit = () => {
		try {
			const validatedData = chapterSchema.parse(formData);

			function formatChapterContent(largeString: string) {
				// Normalize spaces
				const normalizedString = largeString.replace(/\u3000/g, " ");

				// Split the string into paragraphs
				const paragraphs = normalizedString.split(/\n\s*\n/);

				// Process each paragraph
				return paragraphs.flatMap((paragraph, index) => {
					// Trim each paragraph to remove leading/trailing whitespace
					paragraph = paragraph.trim();

					if (paragraph === "") {
						return ["\n"];
					}

					// Split dialogue and narrative
					const parts = paragraph.split(/(".*?")/).filter(Boolean);

					return parts.flatMap((part) => {
						if (part.startsWith('"') && part.endsWith('"')) {
							return [part.trim() + "\n"];
						} else {
							// Narrative: split into sentences, accounting for multiple space types
							const sentences = part
								.split(/(?<=[.!?])\s+(?=[A-Z])/)
								.map((sentence) => sentence.trim())
								.filter((sentence) => sentence !== "")
								.map((sentence) => sentence + "\n");
							return sentences;
						}
					});
				});
			}

			function formatChapterTitle(inputString: string) {
				if (inputString.startsWith("Chapter")) {
					return [inputString];
				}
				const newString = `Chapter ${chapters.length + 1}: ${inputString.trim()}`;
				return [newString];
			}

			const chapterData = {
				novel_id: selectedNovelId!,
				h4_content: formatChapterTitle(validatedData.title),
				p_content: formatChapterContent(validatedData.content),
			};

			addChapter(chapterData);

			setFormData({ title: "", content: "" });
			setErrors({});
			setMode(null);
		} catch (error) {
			if (error instanceof z.ZodError) {
				const errorMap = error.flatten().fieldErrors;
				setErrors(errorMap as Partial<Chapter>);
			}
		}
	};

	return (
		<View style={styles.container}>
			<RNText style={styles.headerTitle}>Create Chapter</RNText>
			<TextInput
				label={<RNText style={styles.inputTitle}>Title</RNText>}
				value={formData.title}
				style={styles.input}
				contentStyle={{ fontFamily: "Lora-Regular" }}
				onChangeText={(text) => handleChange("title", text)}
				activeUnderlineColor={COLORS.tertiary}
				textColor={COLORS.tertiary}
				multiline
				error={!!errors.title}
			/>
			{errors.title && <RNText style={styles.errorText}>{errors.title}</RNText>}
			<TextInput
				label={<RNText style={styles.inputTitle}>Content</RNText>}
				value={formData.content}
				style={styles.input}
				contentStyle={{ fontFamily: "Lora-Regular" }}
				onChangeText={(text) => handleChange("content", text)}
				activeUnderlineColor={COLORS.tertiary}
				textColor={COLORS.tertiary}
				multiline
				error={!!errors.content}
			/>
			{errors.content && <RNText style={styles.errorText}>{errors.content}</RNText>}
			<Button
				mode='contained'
				buttonColor={COLORS.tertiary}
				labelStyle={{ fontFamily: "Lora-Regular" }}
				onPress={handleSubmit}
			>
				Create
			</Button>
		</View>
	);
};

export default AddChapter;

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 10,
		alignItems: "center",
	},
	input: {
		backgroundColor: COLORS.lightGrey,
		width: "100%",
		marginVertical: 10,

		maxHeight: 200,
	},
	inputTitle: {
		fontSize: 12,
		fontWeight: "bold",
	},
	headerTitle: {
		fontSize: 20,
		color: COLORS.white,
		fontWeight: "bold",
		fontFamily: "Lora-Regular",
	},
	errorText: {
		color: "red",
		alignSelf: "flex-start",
		marginBottom: 5,
	},
});
