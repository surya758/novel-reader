import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";
import { NavigationContainer, RouteProp, useNavigation } from "@react-navigation/native";
import HomeScreen from "@src/screens/Home";
import ChapterScreen from "src/screens/Chapter";
import NovelDetailScreen from "src/screens/Details";
import { HomeStackParamList } from "@src/utils/types";
import { COLORS } from "src/theme";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
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

const RootNav = () => {
	function CustomHeader({ title }: { title: string }) {
		const navigation = useNavigation();
		const { currentChapterId } = useNovelStore();
		const chapterNumber = useNovelStore(
			(state) => state.chapters.find((chapter) => chapter._id === currentChapterId)!.chapterNumber
		);

		return (
			<View style={styles.header}>
				<View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
					<TouchableOpacity onPress={() => navigation.goBack()}>
						<Icon name='caret-back-circle' size={24} color={COLORS.lightGrey} />
					</TouchableOpacity>
					<Text style={styles.headerTitle} numberOfLines={1} ellipsizeMode='tail'>
						Chapter {chapterNumber}: {capitaliseFirstLetterOfEveryWord(title)}
					</Text>
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
	header: {
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "flex-end",
		padding: 10,
		backgroundColor: COLORS.darkGrey,
		height: 90,
	},
	headerTitle: {
		fontSize: 13,
		color: COLORS.grey,
	},
});
