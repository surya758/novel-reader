import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import HomeScreen from "@src/screens/Home";
import ChapterScreen from "src/screens/Chapter";
import NovelDetailScreen from "src/screens/Details";
import { HomeStackParamList } from "@src/utils/types";
import { createDrawerNavigator, DrawerNavigationProp } from "@react-navigation/drawer";
import { DetailHeader, ChapterHeader, DrawerContent } from "src/components";

const Drawer = createDrawerNavigator();

const Stack = createStackNavigator<HomeStackParamList>();

export type HomeStackNavigationProp<T extends keyof HomeStackParamList> = StackNavigationProp<
	HomeStackParamList,
	T
>;
export type HomeStackRouteProp<T extends keyof HomeStackParamList> = RouteProp<
	HomeStackParamList,
	T
>;

export type ChapterDrawerNavigationProp = DrawerNavigationProp<HomeStackParamList, "ChapterDrawer">;

export type ChapterDrawerRouteProp = RouteProp<HomeStackParamList, "ChapterDrawer">;

const RootNav = () => {
	const ChapterDrawer = () => {
		return (
			<Drawer.Navigator
				initialRouteName='Chapter'
				screenOptions={{
					overlayColor: "transparent",
				}}
				drawerContent={({ navigation }) => <DrawerContent navigation={navigation} />}
			>
				<Drawer.Screen
					name='Chapter'
					component={ChapterScreen}
					options={{
						headerShown: false,
					}}
				/>
			</Drawer.Navigator>
		);
	};

	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName='Home'
				screenOptions={{
					gestureEnabled: false,
					headerShown: false,
				}}
			>
				<Stack.Screen name='Home' component={HomeScreen} />
				<Stack.Screen
					name='ChapterDrawer'
					component={ChapterDrawer}
					options={{
						headerShown: true,
						header() {
							return <ChapterHeader />;
						},
					}}
				/>
				<Stack.Screen
					name='Detail'
					component={NovelDetailScreen}
					options={{
						headerShown: true,
						header({ route }) {
							return <DetailHeader title={(route.params as { title: string }).title} />;
						},
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default RootNav;
