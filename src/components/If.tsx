import React, { PropsWithChildren } from "react";

type IfProps = PropsWithChildren<{
	condition: boolean;
	otherwise?: React.ReactNode;
}>;

const If = ({ condition, otherwise = null, children }: IfProps) => {
	return condition ? <>{children}</> : <>{otherwise}</>;
};

export default If;
