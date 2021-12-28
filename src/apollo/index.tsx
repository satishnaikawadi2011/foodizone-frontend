import { ApolloClient, InMemoryCache, ApolloProvider, makeVar, createHttpLink,split } from '@apollo/client';
import { setContext } from "@apollo/client/link/context";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import  authStorage from '../utils/storage/auth'

const token = authStorage.get()?.token;
export const isLoggedInVar = makeVar(Boolean(token));
export const authTokenVar = makeVar(token);
export const isDrawerOpen = makeVar(false);

export const logout = () => {
  isDrawerOpen(false);
  authStorage.remove();
  isLoggedInVar(false);
  window.location.href = '/'
}


const wsLink = new WebSocketLink({
  uri:
    process.env.NODE_ENV === "production"
      ? "wss://foodizone.herokuapp.com/graphql"
      : `ws://localhost:4000/graphql`,
  options: {
    reconnect: true,
    connectionParams: {
      "auth-token": authTokenVar() || "",
    },
  },
});


const httpLink = createHttpLink({
  uri:
    process.env.NODE_ENV === "production"
      ? "https://foodizone.herokuapp.com/graphql"
      : "http://localhost:4000/graphql",
});


const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      "auth-token": authTokenVar() || "",
    },
  };
});


const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  authLink.concat(httpLink)
);


const client = new ApolloClient({
	link: splitLink,
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
