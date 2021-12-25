import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// const token = localStorage.getItem(LOCALSTORAGE_TOKEN);
// export const isLoggedInVar = makeVar(Boolean(token));
// export const authTokenVar = makeVar(token);

const client = new ApolloClient({
	uri: 'http://localhost:4000/graphql',
	cache: new InMemoryCache()
});

export const AppApolloProvider: React.FC = ({ children }) => {
	return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
