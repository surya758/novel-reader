import { ActivityIndicator } from "react-native";
import React from "react";
import { COLORS } from "src/theme";

const Loader = () => {
	return <ActivityIndicator size='large' color={COLORS.lightGrey} />;
};

export default Loader;
