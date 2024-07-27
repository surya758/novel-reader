import React, { PropsWithChildren } from "react";
import {
	SafeAreaView,
	StyleSheet,
	View,
	StyleProp,
	ViewStyle,
	ScrollView,
	ScrollViewProps,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	Keyboard,
	Platform,
} from "react-native";
import { COLORS } from "src/theme";

type LayoutProps = PropsWithChildren<{
	style?: StyleProp<ViewStyle>;
	type?: "view" | "scroll";
	refreshControl?: React.ReactElement;
}> &
	({ type?: "view" } | ({ type: "scroll" } & Omit<ScrollViewProps, "style" | "refreshControl">));

const Layout = ({ children, style, type = "view", refreshControl, ...rest }: LayoutProps) => {
	const renderContent = () => {
		if (type === "view") {
			return (
				<KeyboardAvoidingView
					behavior={Platform.OS === "ios" ? "padding" : "height"}
					style={styles.keyboardAvoidingView}
				>
					<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
						<View style={styles.innerContainer}>{children}</View>
					</TouchableWithoutFeedback>
				</KeyboardAvoidingView>
			);
		} else {
			return (
				<ScrollView
					showsVerticalScrollIndicator={false}
					refreshControl={refreshControl}
					keyboardShouldPersistTaps='handled'
					{...rest}
				>
					<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
						<View style={styles.innerContainer}>{children}</View>
					</TouchableWithoutFeedback>
				</ScrollView>
			);
		}
	};

	return <SafeAreaView style={[styles.container, style]}>{renderContent()}</SafeAreaView>;
};

export default Layout;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.darkGrey,
	},
	keyboardAvoidingView: {
		flex: 1,
	},
	innerContainer: {
		flex: 1,
	},
});
