import "./gesture-handler";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import RootNav from "@src/navigation/RootNav";
import QueryProvider from "@src/store/provider";
import { LogBox } from "react-native";
import { PaperProvider } from "react-native-paper";
import { useEffect } from "react";

LogBox.ignoreLogs(["Sending"]);

SplashScreen.preventAutoHideAsync();

export default function App() {
	const [loaded, error] = useFonts({
		"Lora-Regular": require("./assets/fonts/Lora-Regular.ttf"),
		"Lora-Bold": require("./assets/fonts/Lora-Bold.ttf"),
		"Lora-SemiBoldItalic": require("./assets/fonts/Lora-SemiBoldItalic.ttf"),
		"Lora-MediumItalic": require("./assets/fonts/Lora-MediumItalic.ttf"),
	});

	useEffect(() => {
		if (loaded || error) {
			SplashScreen.hideAsync();
		}
	}, [loaded, error]);

	if (!loaded && !error) {
		return null;
	}
	return (
		<PaperProvider>
			<QueryProvider>
				<RootNav />
			</QueryProvider>
		</PaperProvider>
	);
}
