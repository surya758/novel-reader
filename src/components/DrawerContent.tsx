import { StyleSheet, View } from "react-native";
import React, { useCallback, useRef } from "react";
import { COLORS } from "src/theme";
import { FlashList } from "@shopify/flash-list";
import useNovelStore from "src/store";
import { DrawerNavigationHelpers } from "@react-navigation/drawer/lib/typescript/src/types";
import Chapter from "./Chapter";
import { Chapter as ChapterProps } from "src/utils/types";
import { useFocusEffect } from "@react-navigation/native";

const DrawerContent = ({ navigation }: { navigation: DrawerNavigationHelpers }) => {
	const { chapters, novelReadingProgress, selectedNovelId } = useNovelStore();
	const flashListRef = useRef<FlashList<ChapterProps>>(null);

	useFocusEffect(
		useCallback(() => {
			if (chapters.length > 0 && novelReadingProgress.length > 0) {
				const currentNovel = novelReadingProgress.find(
					(novel) => novel.novelId === selectedNovelId
				);
				const indexOfReadingChapter = chapters.findIndex(
					(chapter) => chapter._id === currentNovel?.chapterId
				);

				if (indexOfReadingChapter < 15) return;

				if (indexOfReadingChapter === 0) return;

				if (indexOfReadingChapter !== -1 && flashListRef.current) {
					// Use setTimeout to ensure this runs after the current render cycle
					setTimeout(() => {
						flashListRef.current?.scrollToIndex({
							index: indexOfReadingChapter,
							animated: indexOfReadingChapter > 100 ? false : true,
							viewPosition: 0.2,
						});
					}, 300);
				}
			}
		}, [chapters, novelReadingProgress, selectedNovelId])
	);

	return (
		<View style={styles.container}>
			<FlashList
				data={chapters}
				ref={flashListRef}
				keyExtractor={(item) => item._id}
				renderItem={({ item }) => {
					return <Chapter chapter={item} navigation={navigation} />;
				}}
				estimatedItemSize={500}
			/>
		</View>
	);
};

export default DrawerContent;

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: COLORS.darkGrey },
});
