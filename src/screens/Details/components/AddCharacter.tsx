import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { TextInput, Button } from "react-native-paper";
import { RNText } from "src/components";
import { COLORS } from "src/theme";
import useNovelStore, { Mode } from "src/store";
import { z } from "zod";

const characterSchema = z.object({
	name: z.string().min(1, "Name is required").max(100, "Name is too long"),
	imageUrl: z.string().min(1, "").url("Invalid image URL"),
});

type Character = z.infer<typeof characterSchema>;

const AddCharacter = () => {
	const { addCharacter, setMode } = useNovelStore();
	const [formData, setFormData] = useState<Character>({
		name: "",
		imageUrl: "",
	});
	const [errors, setErrors] = useState<Partial<Character>>({});

	const handleChange = (field: keyof Character, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
		setErrors((prev) => ({ ...prev, [field]: undefined }));
	};

	const handleSubmit = () => {
		try {
			const validatedData = characterSchema.parse(formData);
			addCharacter(validatedData);
			setFormData({ name: "", imageUrl: "" });
			setErrors({});
			setMode(null);
		} catch (error) {
			if (error instanceof z.ZodError) {
				const errorMap = error.flatten().fieldErrors;
				setErrors(errorMap as Partial<Character>);
			}
		}
	};

	return (
		<View style={styles.container}>
			<RNText style={styles.headerTitle}>Add Character</RNText>
			<TextInput
				label={<RNText style={styles.inputTitle}>Name</RNText>}
				value={formData.name}
				style={styles.input}
				contentStyle={{ fontFamily: "Lora-Regular" }}
				onChangeText={(text) => handleChange("name", text)}
				activeUnderlineColor={COLORS.tertiary}
				textColor={COLORS.tertiary}
				multiline
				error={!!errors.name}
			/>
			{errors.name && <RNText style={styles.errorText}>{errors.name}</RNText>}
			<TextInput
				label={<RNText style={styles.inputTitle}>Image Url</RNText>}
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
			<Button
				mode='contained'
				buttonColor={COLORS.tertiary}
				labelStyle={{ fontFamily: "Lora-Regular" }}
				onPress={handleSubmit}
			>
				Add
			</Button>
		</View>
	);
};

export default AddCharacter;

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 10,
		alignItems: "center",
	},
	input: { backgroundColor: COLORS.lightGrey, width: "100%", marginVertical: 10 },
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
