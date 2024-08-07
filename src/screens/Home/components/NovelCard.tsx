import { StyleSheet, Pressable, ActivityIndicator, Alert } from "react-native";
import React from "react";
import { COLORS } from "@src/theme";
import type { Novel, NovelCardType } from "@src/utils/types";
import RNText from "@src/components/RNText";
import { useNavigation } from "@react-navigation/native";
import { HomeStackNavigationProp } from "@src/navigation/RootNav";
import useNovelStore from "src/store";
import { capitaliseFirstLetterOfEveryWord } from "@src/utils/helpers";
import { Image } from "@rneui/themed";

type NovelCardProps = {
	novel: Novel;
};

const NovelCard = ({ novel }: NovelCardProps) => {
	const navigation = useNavigation<HomeStackNavigationProp<"Home">>();
	const { selectNovel, updateNovel, novels, setMode } = useNovelStore();

	const handlePress = () => {
		selectNovel(novel._id);
		navigation.navigate("Detail", { title: novel.title });
		setMode(null);
	};

	const handleLongPress = () => {
		const checkIfAlreadyAlerted = (novelId: string) => {
			const novel = novels.find((novel) => novel._id === novelId);
			return novel?.isArchieved;
		};

		const alert = {
			title: checkIfAlreadyAlerted(novel._id) ? "Unarchieve" : "Archieve",
			message: checkIfAlreadyAlerted(novel._id)
				? "Are you sure you want to unarchieve this novel?"
				: "Are you sure you want to archieve this novel?",
		};
		Alert.alert(alert.title, alert.message, [
			{
				text: "Cancel",
				onPress: () => console.log("Cancel"),
			},
			{
				text: "Yes",
				onPress: () =>
					updateNovel(novel._id, {
						...novel,
						isArchieved: checkIfAlreadyAlerted(novel._id) ? false : true,
					}),
			},
		]);
	};

	return (
		<Pressable style={styles.container} onPress={handlePress} onLongPress={handleLongPress}>
			<Image
				source={{ uri: novel.imageUrl }}
				style={styles.imageStyle}
				PlaceholderContent={<ActivityIndicator />}
			/>
			<RNText style={styles.title} ellipsizeMode='tail' numberOfLines={2}>
				{capitaliseFirstLetterOfEveryWord(novel.title)}
			</RNText>
		</Pressable>
	);
};

export default NovelCard;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "space-between",
		alignItems: "center",
		margin: 10,
	},
	imageStyle: {
		width: "100%",
		height: 175,
		aspectRatio: 2 / 3,
		objectFit: "cover",
		borderRadius: 10,
	},
	title: {
		marginTop: 10,
		color: COLORS.white,
		fontSize: 12,
		fontWeight: "bold",
		textAlign: "center",
		fontFamily: "Lora-Regular",
	},
});
