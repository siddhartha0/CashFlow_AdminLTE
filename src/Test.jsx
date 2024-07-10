import { useDispatch, connect } from "react-redux";
import { useGetAllBanksQuery } from "./slices/api/admin/finance/BankApi";

import { Component } from "react";

function Test1() {
  const { data, isLoading, isError } = useGetAllBanksQuery();

  if (!isLoading && !isError) {
    return data;
  }
}

const BanksWrapper = () => {
  const { data, error, isError, isLoading } = useGetAllBanksQuery();

  return (
    <Test data={data} error={error} isLoading={isLoading} isError={isError} />
  );
};

export default BanksWrapper;

class Test extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { data, error, isLoading, isError } = this.props;
    return (
      <div>
        {isLoading ? (
          <div>Data is loading...</div>
        ) : isError ? (
          <div>{error.data.message}</div>
        ) : (
          data?.entities?.map((value) => (
            <div key={value.id}>{value.bankName}</div>
          ))
        )}
      </div>
    );
  }
}

connect()(Test);

// export default class Test extends Component {
//   render() {
//     const {} = useGetAllBanksQuery();
//     return <div>Hello</div>;
//   }
// }
// export default function Test() {
//   const dispatch = useDispatch();

//   const { data, isLoading, isError, error } = get();
//   console.log(data?.entities);
//   console.log("errr", error);
//   console.log(isLoading);

//   return (
// <div>
//   {isLoading ? (
//     <div>Data is loading...</div>
//   ) : isError ? (
//     <div>{error.data.message}</div>
//   ) : (
//     data?.entities?.map((value) => (
//       <div key={value.id}>{value.bankName}</div>
//     ))
//   )}
// </div>
//   );
// }
