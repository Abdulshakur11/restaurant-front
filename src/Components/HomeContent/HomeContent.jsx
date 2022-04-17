import { Route, Switch } from "react-router-dom";

function HomeContent() {
  return(
    <>
      <div>
        <Switch>
          <Route path="" component={RestaurantsList} />
          <Route path="/" component={RestaurantsList} />
        </Switch>
      </div>
    </>
  )
}

function RestaurantsList() {

}



export default HomeContent;