import { ApolloClient, InMemoryCache, ApolloProvider ,makeVar} from '@apollo/client';
import  authStorage from '../utils/storage/auth'

const token = authStorage.get()?.token;
export const isLoggedInVar = makeVar(Boolean(token));
export const authTokenVar = makeVar(token);

const client = new ApolloClient({
	uri: 'http://localhost:4000/graphql',
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
