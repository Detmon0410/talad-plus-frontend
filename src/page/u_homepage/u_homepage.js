import React, { useEffect } from "react";
import Appbar from "../componenet/AppbarUser";
import Tabs from "../componenet/Tabbar_Home";
import { postGetAllMaket } from "./u_homepage-service";
import { selectUserReducer } from "../../redux/user/selector";
import { useSelector } from "react-redux";
import "../App.css";
function Homepage() {
  const userSelector = useSelector(selectUserReducer);
  const [marketList, setMarketList] = React.useState([]);
  // useEffect(() => {
  //   console.log("log");
  // }, [nameInput]);
  useEffect(() => {
    postGetAllMaket(userSelector).then((res) => setMarketList(res));
  }, []);

  return (
    <div className="App">
      <Tabs marketlist={marketList}></Tabs>
    </div>
  );
}

export default Homepage;
