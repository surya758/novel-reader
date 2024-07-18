import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Pressable } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { COLORS } from "@src/theme";

type ChapterMovementProps = {
	icon: string;
	onPress: () => void;
};

const ChapterMovement = ({ icon, onPress }: ChapterMovementProps) => {
	return (
		<Pressable
			onPress={onPress}
			hitSlop={{
				top: 10,
				left: 10,
				bottom: 10,
				right: 10,
			}}
		>
			<Icon name={icon} size={50} color={COLORS.grey} />
		</Pressable>
	);
};

export default ChapterMovement;

const styles = StyleSheet.create({});
