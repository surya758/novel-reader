import "./gesture-handler";
import RootNav from "@src/navigation/RootNav";
import QueryProvider from "@src/store/provider";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["Sending"]);

export default function App() {
	return (
		<QueryProvider>
			<RootNav />
		</QueryProvider>
	);
}
