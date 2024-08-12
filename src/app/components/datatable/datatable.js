import React from "react";

function DataTable({ data }) {
  return (
    <div className="overflow-scroll max-h-[32vh] px-5">
      <table className="table rounded-3xl">
        <thead
          className="bg-[#5799FD] text-white sticky top-0 gap-x-20 text-[0.9rem]"
          style={{ borderRadius: "11px" }}
        >
          <tr>
            <th className="text-center">DOJ</th>
            <th className="text-center">Name</th>
            <th className="text-center">Id</th>
            <th className="text-center">Coupons</th>
            <th className="text-center">Phone</th>
            <th className="text-center">Email</th>
            <th className="text-center">Status</th>
            <th className="text-center">D.Coupons</th>
            <th className="text-center">Submit</th>
            <th className="text-center">
              <label>
                <input
                  type="checkbox"
                  style={{ borderRadius: "7px" }}
                  className=" text-2xl outline-none  focus:outline-none text-emerald-400 border-none shadow-none px-[0.7rem] py-[0.7rem] focus:ring-0 "
                />
              </label>
            </th>
          </tr>
        </thead>
        <tbody className="my-10">
          {data.map((i, index) => {
            return (
              <tr
                key={index}
                className="font-semibold text-[0.8rem] text-black my-10 "
              >
                <td className="text-center">{i.joinDate}</td>
                <td className="text-center text-indigo-600">{i.name} </td>
                <td className="text-center">{i.id} </td>
                <td className="text-center">{i.coupons} </td>
                <td className="text-center">{i.phone} </td>
                <td className="text-center">{i.email}</td>
                <td className="text-center">{i.status}</td>
                <td>
                  <input
                    placeholder="Coupons"
                    className="w-20 h-7 text-center bg-slate-300 rounded-[7px] focus:ring-1 focus:ring-teal-500"
                  />
                </td>

                <td>
                  <button className="bg-[#40A2D8] px-3 py-1 text-white  rounded-lg">
                    Submit
                  </button>
                </td>

                <td>
                  <label>
                    <input
                      type="checkbox"
                      style={{ borderRadius: "7px" }}
                      className=" text-2xl outline-none  focus:outline-none text-emerald-400 border-none shadow-none px-[0.7rem] py-[0.7rem] focus:ring-0 bg-slate-300"
                    />
                  </label>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
