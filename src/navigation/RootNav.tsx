import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import HomeScreen from "@src/screens/Home";
import ChapterScreen from "src/screens/Chapter";
import NovelDetailScreen from "src/screens/Details";
import { HomeStackParamList } from "@src/utils/types";

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
	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName='Home'
				screenOptions={{
					headerShown: false,
				}}
			>
				<Stack.Screen name='Home' component={HomeScreen} />
				<Stack.Screen name='Chapter' component={ChapterScreen} />
				<Stack.Screen name='Detail' component={NovelDetailScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default RootNav;
