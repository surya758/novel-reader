import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "@src/screens/Home";
import ChapterScreen from "src/screens/Chapter";
import NovelDetailScreen from "src/screens/Details";

const Stack = createStackNavigator();

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
