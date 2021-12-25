import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
	uri: 'http://localhost:4000/graphql',
	cache: new InMemoryCache()
});

export const AppApolloProvider: React.FC = ({ children }) => {
	return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
