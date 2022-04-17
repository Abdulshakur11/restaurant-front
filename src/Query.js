import { gql } from "@apollo/client";

const CATEGORIES = gql`
	query {
		getCategories {
			id
			category_name
		}
	}
`;

const ALLRESTAURANTS = gql`
	query {
		getAllRestaurants {
			id
			restaurant_name
		}
	}
`;

const RESTAURANTS = gql`
	query getRestaurants($categoryId: ID!) {
		getRestaurants(categoryId: $categoryId) {
			id
			restaurant_name
		}
	}
`;

const BRANCHES = gql`
	query getBranches($restaurantId: ID!) {
		getBranches(restaurantId: $restaurantId) {
			id
			branche_name
		}
	}
`;

const MENUS = gql`
	query getMenus($branchId: ID!) {
		getMenus(branchId: $branchId) {
			id
			food
			price
		}
	}
`;

const ORDERS = gql`
	mutation  newOrder($username: String! $location: String! $phone_number: String! $food_name: String! $food_price: Int! $food_count: Int!){
		newOrder(username: $username location: $location phone_number: $phone_number food_name: $food_name food_price: $food_price food_count: $food_count) {
			id
			username
			location
			phone_number
			food_name
		}
	}
`;

export { CATEGORIES, RESTAURANTS, ALLRESTAURANTS, BRANCHES, MENUS, ORDERS };
