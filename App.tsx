import "./gesture-handler";
import RootNav from "@src/navigation/RootNav";
import QueryProvider from "@src/store/provider";

export default function App() {
	return (
		<QueryProvider>
			<RootNav />
		</QueryProvider>
	);
}
