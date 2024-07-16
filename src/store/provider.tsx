import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";

type QueryProviderProps = PropsWithChildren<{}>;

const queryClient = new QueryClient();

const QueryProvider = ({ children }: QueryProviderProps) => {
	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default QueryProvider;
