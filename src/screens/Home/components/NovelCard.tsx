import { Image, StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { COLORS } from "@src/theme";
import type { NovelCardType } from "@src/utils/types";
import RNText from "@src/components/RNText";
import { useNavigation } from "@react-navigation/native";
import { HomeStackNavigationProp } from "@src/navigation/RootNav";

type NovelCardProps = {
	item: NovelCardType;
};

const NovelCard = ({ item }: NovelCardProps) => {
	const navigation = useNavigation<HomeStackNavigationProp>();

	const handlePress = () => {
		navigation.navigate("Detail", { title: item.title });
	};

	return (
		<Pressable style={styles.container} onPress={handlePress}>
			<Image source={{ uri: item.image }} style={styles.imageStyle} />
			<RNText style={styles.title} ellipsizeMode='tail' numberOfLines={2}>
				{item.title}
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
		objectFit: "cover",
		borderRadius: 10,
	},
	title: {
		marginTop: 10,
		color: COLORS.white,
		fontSize: 16,
		fontWeight: "bold",
		textAlign: "center",
	},
});
