import { Alert, Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import RNText from "./RNText";
import { COLORS } from "src/theme";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Menu, Divider } from "react-native-paper";
import useNovelStore, { Mode } from "src/store";
import If from "./If";

const WINDOW_WIDTH = Dimensions.get("window").width;

function DetailHeader({ title }: { title: string }) {
	const navigation = useNavigation();
	const [visible, setVisible] = useState(false);
	const { updateNovel, novels, deleteNovel, selectedNovelId, setMode, mode } = useNovelStore();
	const novel = novels.find((novel) => novel._id === selectedNovelId);

	const alreadyArchieved = novel?.isArchieved;

	const openMenu = () => setVisible(true);

	const closeMenu = () => setVisible(false);

	const archieveNovelHandler = () => {
		closeMenu();
		const alert = {
			title: alreadyArchieved ? "Unarchieve" : "Archieve",
			message: alreadyArchieved
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
					updateNovel(selectedNovelId!, {
						...novel!,
						isArchieved: alreadyArchieved ? false : true,
					}),
			},
		]);
	};

	const deleteNovelHandler = () => {
		closeMenu();
		Alert.alert("Delete", "Are you sure you want to delete this novel?", [
			{
				text: "Cancel",
				onPress: () => console.log("Cancel"),
			},
			{
				text: "Yes",
				onPress: () => {
					deleteNovel(selectedNovelId!)
						.then(() => {
							navigation.goBack();
						})
						.catch((error) => console.log(error));
				},
			},
		]);
	};
	return (
		<View style={styles.header}>
			<View style={styles.lowerContainer}>
				<TouchableOpacity
					onPress={() => {
						navigation.goBack();
						setMode(null);
					}}
					style={styles.backButton}
				>
					<Ionicons name='arrow-back-circle' size={24} color={COLORS.lightGrey} />
				</TouchableOpacity>
				<RNText style={styles.headerTextTitle} numberOfLines={1} ellipsizeMode='tail'>
					{title}
				</RNText>
				<View style={styles.menu}>
					<Menu
						visible={visible}
						onDismiss={closeMenu}
						contentStyle={styles.menuContentStyle}
						anchor={
							<Ionicons
								name='ellipsis-horizontal-circle-sharp'
								size={24}
								color={COLORS.lightGrey}
								onPress={openMenu}
							/>
						}
					>
						<Menu.Item
							style={styles.menuItem}
							onPress={archieveNovelHandler}
							title={
								<RNText style={styles.menuTitle}>
									{alreadyArchieved ? "Unarchieve" : "Archieve"}
								</RNText>
							}
						/>
						<Divider />

						<Menu.Item
							style={styles.menuItem}
							onPress={deleteNovelHandler}
							title={<RNText style={styles.menuTitle}>Delete Novel</RNText>}
						/>
						<Divider />
						<Menu.Item
							onPress={() => {
								setMode(Mode.DELETE_CHAPTER);
								closeMenu();
							}}
							title={<RNText style={styles.menuTitle}>Delete Chapter(s)</RNText>}
						/>
						<Divider />
						<Menu.Item
							onPress={() => {
								setMode(Mode.ADD_CHARACTER);
								closeMenu();
							}}
							title={<RNText style={styles.menuTitle}>Add Character</RNText>}
						/>
						<Divider />
						<Menu.Item
							onPress={() => {
								setMode(Mode.ADD_CHAPTER);
								closeMenu();
							}}
							title={<RNText style={styles.menuTitle}>Add Chapter</RNText>}
						/>
						<If condition={mode !== null}>
							<Divider />
							<Menu.Item
								onPress={() => {
									setMode(null);
									closeMenu();
								}}
								title={<RNText style={styles.menuTitle}>Cancel</RNText>}
							/>
						</If>
					</Menu>
				</View>
			</View>
			<View />
		</View>
	);
}

export default DetailHeader;

const styles = StyleSheet.create({
	lowerContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
		flex: 1,
	},
	header: {
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "flex-end",
		padding: 10,
		backgroundColor: COLORS.darkGrey,
		height: 90,
	},
	backButton: {
		marginRight: 10,
	},
	menu: {
		position: "absolute",
		right: 0,
		backgroundColor: COLORS.darkGrey,
	},
	menuItem: {},
	menuContentStyle: { backgroundColor: COLORS.darkGrey, marginTop: 2, paddingVertical: -3 },
	menuTitle: { color: COLORS.grey },
	headerTextTitle: {
		fontSize: 14,
		color: COLORS.grey,
		fontFamily: "Lora-SemiBoldItalic",
		maxWidth: WINDOW_WIDTH * 0.7,
	},
});
