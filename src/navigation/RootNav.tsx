import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";
import { NavigationContainer, RouteProp, useNavigation } from "@react-navigation/native";
import HomeScreen from "@src/screens/Home";
import ChapterScreen from "src/screens/Chapter";
import NovelDetailScreen from "src/screens/Details";
import { HomeStackParamList } from "@src/utils/types";
import { COLORS } from "src/theme";
import { TouchableOpacity, View, Text, StyleSheet, Dimensions } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import useNovelStore from "src/store";
import { capitaliseFirstLetterOfEveryWord } from "src/utils/helpers";

const Stack = createStackNavigator<HomeStackParamList>();

export type HomeStackNavigationProp<T extends keyof HomeStackParamList> = StackNavigationProp<
	HomeStackParamList,
	T
>;
export type HomeStackRouteProp<T extends keyof HomeStackParamList> = RouteProp<
	HomeStackParamList,
	T
>;

const WINDOW_WIDTH = Dimensions.get("window").width;

const RootNav = () => {
	function CustomHeader({ title }: { title: string }) {
		const navigation = useNavigation();
		const { currentChapterId, selectedNovelId, novels } = useNovelStore();
		const chapterNumber = useNovelStore(
			(state) => state.chapters.find((chapter) => chapter._id === currentChapterId)!.chapterNumber
		);
		const novelTitle = novels.find((novel) => novel._id === selectedNovelId)!.title;

		return (
			<View style={styles.header}>
				<View style={styles.lowerContainer}>
					<TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
						<Ionicons name='caret-back-circle' size={24} color={COLORS.lightGrey} />
					</TouchableOpacity>
					<View style={styles.titleBox}>
						<Text style={styles.headerTitle} numberOfLines={1} ellipsizeMode='tail'>
							{capitaliseFirstLetterOfEveryWord(novelTitle)}
						</Text>
						<FontAwesome name='angle-double-right' size={12} color={COLORS.lightGrey} />
						<Text style={styles.headerTitle} numberOfLines={1} ellipsizeMode='tail'>
							Chapter {chapterNumber}: {capitaliseFirstLetterOfEveryWord(title)}
						</Text>
					</View>
				</View>
				<View />
			</View>
		);
	}

	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName='Home'
				screenOptions={{
					headerShown: false,
				}}
			>
				<Stack.Screen name='Home' component={HomeScreen} />
				<Stack.Screen
					name='Chapter'
					component={ChapterScreen}
					options={{
						headerShown: true,
						gestureEnabled: false,
						header({ route }) {
							return <CustomHeader title={(route.params as { title: string }).title} />;
						},
					}}
				/>
				<Stack.Screen name='Detail' component={NovelDetailScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default RootNav;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	lowerContainer: { flexDirection: "row", alignItems: "center", justifyContent: "center" },
	header: {
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "flex-end",
		padding: 10,
		backgroundColor: COLORS.darkGrey,
		height: 90,
	},
	titleBox: {
		maxWidth: WINDOW_WIDTH * 0.9,
		flexDirection: "row",
		gap: 5,
		alignItems: "center",
		justifyContent: "center",
	},
	backButton: {
		marginRight: 10,
	},
	headerTitle: {
		fontSize: 13,
		color: COLORS.grey,
		maxWidth: WINDOW_WIDTH * 0.4,
		fontFamily: "Lora-MediumItalic",
	},
});
