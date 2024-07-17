import { StyleSheet, View } from "react-native";
import React from "react";
import RNText from "./RNText";
import { COLORS } from "src/theme";

const NoData = () => {
	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<RNText
				style={{
					fontSize: 20,
					color: COLORS.grey,
				}}
			>
				Nothing to show...
			</RNText>
		</View>
	);
};

export default NoData;

const styles = StyleSheet.create({});
