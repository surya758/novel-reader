import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { TextInput, Button } from "react-native-paper";
import { RNText } from "src/components";
import { COLORS } from "src/theme";
import useNovelStore from "src/store";
import { z } from "zod";
import Octicons from "react-native-vector-icons/Octicons";

const allowedGenres = [
	"Fantasy",
	"Mystery",
	"Romance",
	"Eastern Fantasy",
	"Western",
	"Harem",
	"Green",
] as const;

const novelSchema = z.object({
	title: z.string().min(1, "Title is required"),
	author: z.string().min(1, "Author is required"),
	imageUrl: z.string().min(1, "").url("Invalid image URL"),
	genre: z.enum(allowedGenres).optional().default("Harem"),
});

type Novel = z.infer<typeof novelSchema>;

const AddNovel = () => {
	const { addNovel, setMode, selectedNovelId } = useNovelStore();
	const [formData, setFormData] = useState<Novel>({
		title: "",
		author: "",
		imageUrl: "",
		genre: "Harem",
	});
	const [errors, setErrors] = useState<Partial<Novel>>({});

	const handleChange = (field: keyof Novel, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
		setErrors((prev) => ({ ...prev, [field]: undefined }));
	};

	const handleSubmit = () => {
		try {
			const validatedData = novelSchema.parse(formData);
			addNovel(validatedData);
			setFormData({ title: "", author: "", imageUrl: "", genre: "Harem" });
			setErrors({});
			setMode(null);
		} catch (error) {
			if (error instanceof z.ZodError) {
				const errorMap = error.flatten().fieldErrors;
				setErrors(errorMap as Partial<Novel>);
			}
		}
	};

	return (
		<View style={styles.container}>
			<RNText style={styles.headerTitle}>Create Novel</RNText>
			<Octicons
				name='x-circle-fill'
				size={24}
				color={COLORS.lightGrey}
				style={styles.crossIcon}
				onPress={() => setMode(null)}
			/>
			<TextInput
				autoCorrect={false}
				autoComplete='off'
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
				autoCorrect={false}
				autoComplete='off'
				label={<RNText style={styles.inputTitle}>Author</RNText>}
				value={formData.author}
				style={styles.input}
				contentStyle={{ fontFamily: "Lora-Regular" }}
				onChangeText={(text) => handleChange("author", text)}
				activeUnderlineColor={COLORS.tertiary}
				textColor={COLORS.tertiary}
				multiline
				error={!!errors.author}
			/>
			{errors.author && <RNText style={styles.errorText}>{errors.author}</RNText>}
			<TextInput
				autoCorrect={false}
				autoComplete='off'
				label={<RNText style={styles.inputTitle}>Image URL</RNText>}
				value={formData.imageUrl}
				style={styles.input}
				contentStyle={{ fontFamily: "Lora-Regular" }}
				onChangeText={(text) => handleChange("imageUrl", text)}
				activeUnderlineColor={COLORS.tertiary}
				textColor={COLORS.tertiary}
				multiline
				error={!!errors.imageUrl}
			/>
			{errors.imageUrl && <RNText style={styles.errorText}>{errors.imageUrl}</RNText>}
			<TextInput
				autoCorrect={false}
				autoComplete='off'
				label={<RNText style={styles.inputTitle}>Genre</RNText>}
				value={formData.genre}
				style={styles.input}
				contentStyle={{ fontFamily: "Lora-Regular" }}
				onChangeText={(text) => handleChange("genre", text)}
				activeUnderlineColor={COLORS.tertiary}
				textColor={COLORS.tertiary}
				multiline
				error={!!errors.genre}
			/>
			{errors.genre && <RNText style={styles.errorText}>{errors.genre}</RNText>}
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

export default AddNovel;

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
		height: 35,
	},
	crossIcon: { position: "absolute", right: 10, top: 5 },
	errorText: {
		color: "red",
		alignSelf: "flex-start",
		marginBottom: 5,
	},
});
