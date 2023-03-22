import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import { postCreateStall } from "./m_control-service";
import { postMyMarket } from "../m_profiles/m_profile-service";
import Tabbar from "../componenet/Tabbar_MarketManager";
import { selectUserReducer } from "../../redux/user/selector";
import { useSelector } from "react-redux";

function CreateStall() {
  const userSelector = useSelector(selectUserReducer);
  const [marketDetail, setMarketDetail] = React.useState([]);
  const [createStall, setCreateStall] = React.useState([]);
  useEffect(
    () => {
      console.log(marketDetail);
    },
    [marketDetail],
    [createStall]
  );
  useEffect(() => {
    postMyMarket(userSelector).then((res) => {
      setMarketDetail([...res]);
      console.log(res);
    });
  }, []);
  useEffect(() => {
    postCreateStall(userSelector).then((res) => {
      setCreateStall([...res]);
      console.log(res);
    });
  }, []);

  return (
    <div className="App">
      <React.Fragment>
        <CssBaseline />

        {marketDetail.map((mname) => (
          <Typography
            variant="h1"
            component="h2"
            label={mname.name}
            style={{ fontSize: "2rem" }}
          >
            {mname.name}
          </Typography>
        ))}

        <Tabbar></Tabbar>
      </React.Fragment>
    </div>
  );
}

export default CreateStall;
