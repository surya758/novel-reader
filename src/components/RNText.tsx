import { StyleSheet, Text, TextProps } from "react-native";
import React, { PropsWithChildren } from "react";

type RNTextProps = PropsWithChildren<TextProps>;

const RNText = ({ children, ...rest }: RNTextProps) => {
	return (
		<Text style={styles.text} {...rest}>
			{children}
		</Text>
	);
};

export default RNText;

const styles = StyleSheet.create({
	text: {
		fontFamily: "Segoe-UI",
	},
});
