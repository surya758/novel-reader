import "./gesture-handler";
import RootNav from "@src/navigation/RootNav";
import QueryProvider from "@src/store/provider";
import { LogBox } from "react-native";
import { PaperProvider } from "react-native-paper";

LogBox.ignoreLogs(["Sending"]);

export default function App() {
	return (
		<PaperProvider>
			<QueryProvider>
				<RootNav />
			</QueryProvider>
		</PaperProvider>
	);
}
