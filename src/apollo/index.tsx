import { ApolloClient, InMemoryCache, ApolloProvider, makeVar, createHttpLink } from '@apollo/client';
import { setContext } from "@apollo/client/link/context";
import  authStorage from '../utils/storage/auth'

const token = authStorage.get()?.token;
export const isLoggedInVar = makeVar(Boolean(token));
export const authTokenVar = makeVar(token);
console.log(token)


const httpLink = createHttpLink({
  uri:"http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      "auth-token": authTokenVar() || "invalid",
    },
  };
});


const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          isLoggedIn: {
            read() {
              return isLoggedInVar();
            },
          },
          token: {
            read() {
              return authTokenVar();
            },
          },
        },
      },
    },
  }),
});

export const AppApolloProvider: React.FC = ({ children }) => {
	return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
