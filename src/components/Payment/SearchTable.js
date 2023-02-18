import { CCol, CRow } from "@coreui/react";
import React, { useState } from "react";

function SearchableTable(props) {
  const [query, setQuery] = useState("");

  const data = props.data.filter((item) => {
    return (
      item.account_detail.account_name.toLowerCase().includes(query) ||
      item.account_detail.account_number.toLowerCase().includes(query) ||
      item.account_detail.bank_name.toLowerCase().includes(query) ||
      item.amount.toString().toLowerCase().includes(query) ||
      item.reference.toLowerCase().includes(query) ||
      item.status.toLowerCase().includes(query)
    );
  });

  return (
    <div >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value.toLowerCase())}
        placeholder="Search..."
      />
      <hr style={{ width: "70vw", padding: "20px" }} />

      <table style={{ width: "80vw" }}>
        <thead>
          <tr>
            <th style={{ padding: '20px' }}>Account Name</th>
            <th style={{ padding: '20px' }}>Account Number</th>
            <th style={{ padding: '20px' }}>Bank Name</th>
            <th style={{ padding: '20px' }}>Amount</th>
            <th style={{ padding: '20px' }} >Reference</th>
            <th style={{ padding: '20px' }}>Status</th>
          </tr>
        </thead>
        <tbody>

          {data.map((item) => (
            <tr key={item._id} style={{ borderTop: '1px solid black', borderBottom: '1px solid black' }}>
              <td style={{ padding: '20px' }}>{item.account_detail.account_name}</td>
              <td style={{ padding: '10px' }}>{item.account_detail.account_number}</td>
              <td style={{ padding: '10px' }}>{item.account_detail.bank_name}</td>
              <td style={{ padding: '10px' }}>{item.amount}</td>
              <td style={{ padding: '10px' }}>{item.reference}</td>
              <td style={{ padding: '10px' }}>{item.status}</td>


            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SearchableTable;
