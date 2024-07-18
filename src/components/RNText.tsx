import { StyleSheet, Text, TextProps } from "react-native";
import React, { PropsWithChildren } from "react";

type RNTextProps = PropsWithChildren<TextProps>;

const RNText = ({ children, style, ...rest }: RNTextProps) => {
	return (
		<Text style={[styles.text, style]} {...rest}>
			{children}
		</Text>
	);
};

export default RNText;

const styles = StyleSheet.create({
	text: {
		fontFamily: "Lora-Regular",
	},
});
