import React from "react";
import {
  ThailandAddressTypeahead,
  ThailandAddressValue,
} from "react-thailand-address-typeahead";
const App = () => {
  const [val, setVal] =
    React.useState <
    ThailandAddressValue >
    ThailandAddressValue.fromDatasourceItem({
      d: "Khongteoy",
      p: "Bangkok",
      po: "10110",
      s: "Khongteoy",
    });
  return (
    <ThailandAddressTypeahead
      value={val}
      onValueChange={(val) => setVal(val)}
      datasouce={customDatasource}
    >
      <ThailandAddressTypeahead.SubdistrictInput placeholder="Tumbon" />
      <ThailandAddressTypeahead.DistrictInput placeholder="Amphoe" />

      {/** you can put any customizable layout like below */}
      <div>
        <ThailandAddressTypeahead.ProvinceInput placeholder="Province" />
        <ThailandAddressTypeahead.PostalCodeInput placeholder="Postal Code" />
      </div>

      <ThailandAddressTypeahead.Suggestion />
      {/** or custom our own suggestion with CustomSuggestion */}
    </ThailandAddressTypeahead>
  );
};
