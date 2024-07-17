import { StyleSheet, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import Layout from "@src/components/Layout";
import NovelCard from "./components/NovelCard";
import { FlashList } from "@shopify/flash-list";
import useNovelStore from "@src/store";
import { If, Loader, NoData } from "src/components";
import { COLORS } from "src/theme";
import Icon from "react-native-vector-icons/Ionicons";

const HomeScreen = () => {
	const { novels, fetchAllNovels, isLoading } = useNovelStore();
	const [refreshing, setRefreshing] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");

	const filteredNovels = novels.filter((novel) =>
		novel.title.toLowerCase().includes(searchQuery.toLowerCase())
	);

	useEffect(() => {
		fetchAllNovels();
	}, []);

	const handleRefresh = () => {
		setRefreshing(true);
		fetchAllNovels();
		setRefreshing(false);
	};

	const searchBox = () => {
		return (
			<View style={styles.searchContainer}>
				<Icon style={styles.searchIcon} name='search-outline' size={24} color={COLORS.darkGrey} />
				<TextInput
					style={styles.searchBox}
					placeholder='Search for a novel'
					value={searchQuery}
					onChangeText={setSearchQuery}
				/>
			</View>
		);
	};

	return (
		<Layout>
			{searchBox()}
			<If condition={!isLoading} otherwise={<Loader />}>
				<FlashList
					onRefresh={handleRefresh}
					refreshing={refreshing}
					contentContainerStyle={styles.flashlistContent}
					data={filteredNovels}
					renderItem={({ item }) => <NovelCard novel={item} />}
					ListEmptyComponent={<NoData />}
					keyExtractor={(item) => item._id}
					estimatedItemSize={10}
					numColumns={3}
				/>
			</If>
		</Layout>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	flashlistContent: {
		padding: 10,
	},
	searchContainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	searchIcon: {
		position: "absolute",
		left: 30,
		zIndex: 1,
	},
	searchBox: {
		backgroundColor: COLORS.lightGrey,
		padding: 10,
		paddingLeft: 40,
		paddingVertical: 15,
		marginVertical: 10,
		marginHorizontal: 20,
		borderRadius: 10,
		width: "90%",
	},
});
