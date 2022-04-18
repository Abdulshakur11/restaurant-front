import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Provider } from "./Context/Context";

const client = new ApolloClient({
	uri: "https://lastexam-backend.herokuapp.com/graphql",
	cache: new InMemoryCache(),
});

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<ApolloProvider client={client}>
				<Provider>
					<App />
				</Provider>
			</ApolloProvider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById("root")
);
