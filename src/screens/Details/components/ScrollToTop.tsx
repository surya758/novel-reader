import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "src/theme";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RNText } from "src/components";
import { LinearGradient } from "expo-linear-gradient";

type ScrollToTopProps = {
	onPress: () => void;
	isLoading: boolean;
};

const ScrollToTop = ({ onPress, isLoading }: ScrollToTopProps) => {
	return (
		<LinearGradient colors={["#4c669f", "#3b5998", "#192f6a"]} style={styles.container}>
			<Pressable onPress={onPress} style={styles.lowerContainer} disabled={isLoading}>
				<RNText style={{ color: COLORS.darkGrey, fontFamily: "Lora-Bold" }}>Back to top</RNText>
				<Ionicons name='caret-up' size={30} color={COLORS.darkGrey} />
			</Pressable>
		</LinearGradient>
	);
};

export default ScrollToTop;

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		bottom: 80,
		alignSelf: "center",
		height: 50,
		width: 150,
		borderRadius: 30,
	},
	lowerContainer: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
});
