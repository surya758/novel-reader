import { StyleSheet, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import Layout from "@src/components/Layout";
import NovelCard from "./components/NovelCard";
import { FlashList } from "@shopify/flash-list";
import useNovelStore from "@src/store";
import { If, Loader, NoData } from "src/components";
import { COLORS } from "src/theme";
import Icon from "react-native-vector-icons/Ionicons";
import { Tab, TabView } from "@rneui/themed";

const HomeScreen = () => {
	const { novels, fetchAllNovels, isLoading } = useNovelStore();
	const [refreshing, setRefreshing] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [index, setIndex] = useState(0);

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

	const renderFlashList = (isArchieved: boolean) => {
		return (
			<If condition={!isLoading} otherwise={<Loader />}>
				<FlashList
					onRefresh={handleRefresh}
					refreshing={refreshing}
					contentContainerStyle={styles.flashlistContent}
					data={
						isArchieved
							? filteredNovels.filter((novel) => novel.isArchieved)
							: filteredNovels.filter((novel) => !novel.isArchieved)
					}
					renderItem={({ item }) => <NovelCard novel={item} />}
					ListEmptyComponent={<NoData />}
					keyExtractor={(item) => item._id}
					estimatedItemSize={10}
					numColumns={3}
				/>
			</If>
		);
	};

	return (
		<Layout>
			{searchBox()}
			<Tab
				value={index}
				onChange={(e) => setIndex(e)}
				indicatorStyle={{
					backgroundColor: "white",
					height: 3,
				}}
				variant='default'
			>
				<Tab.Item
					title='Reading'
					titleStyle={{ fontSize: 12, fontFamily: "Lora-Regular" }}
					icon={{ name: "book", type: "ionicon", color: index === 0 ? COLORS.white : COLORS.grey }}
				/>
				<Tab.Item
					title='Archieved'
					titleStyle={{ fontSize: 12, fontFamily: "Lora-Regular" }}
					icon={{
						name: "archive",
						type: "ionicon",
						color: index === 1 ? COLORS.white : COLORS.grey,
					}}
				/>
			</Tab>

			<TabView value={index} onChange={setIndex} animationType='spring'>
				<TabView.Item style={{ width: "100%" }}>{renderFlashList(false)}</TabView.Item>
				<TabView.Item style={{ width: "100%" }}>{renderFlashList(true)}</TabView.Item>
			</TabView>
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
