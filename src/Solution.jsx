import {
  Label,
  TableColumn,
  TableRow,
  TableCell,
  Table,
  Badge,
  Button,
} from "@ui5/webcomponents-react";
import { useState } from "react";
import { fullTableData } from "./utils/data";
import AddRowDialog from "./Components/AddRowDialog";

const Status = {
  Completed: 8,
  "In Progress": 1,
  "Not Started": 6,
  Blocked: 2,
};

const getStatus = (obj, data) => {
  for (const property in obj) {
    if (property == data) {
      return obj[property];
    }
  }
};

function Solution() {
  const [tableData, setTableData] = useState(fullTableData);

  const addNewRow = (data) => {
    setTableData((prev) => [
      ...prev,
      {
        id: prev[prev.length - 1].id + 1,
        title: data.title,
        status: data.status,
      },
    ]);
  };

  const deleteRow = (id) => {
    const updatedRows = tableData.filter((data) => data.id !== id);
    setTableData(updatedRows);
  };

  const rows = tableData.map((data) => (
    <TableRow key={data.id}>
      <TableCell>
        <Label>{data.id}</Label>
      </TableCell>
      <TableCell>
        <Label>{data.title}</Label>
      </TableCell>
      <TableCell>
        <Badge colorScheme={getStatus(Status, data.status)}>
          {data.status}
        </Badge>
      </TableCell>
      <TableCell>
        <Button icon="sys-cancel" onClick={() => deleteRow(data.id)} />
      </TableCell>
    </TableRow>
  ));

  return (
    <div style={{ height: "480px", overflow: "auto" }}>
      <AddRowDialog addNewRow={addNewRow} />
      <Table
        growing="Scroll"
        columns={
          <>
            <TableColumn>
              <Label>ID</Label>
            </TableColumn>
            <TableColumn>
              <Label>Title</Label>
            </TableColumn>
            <TableColumn>
              <Label>Status</Label>
            </TableColumn>
            <TableColumn>
              <Label>Action</Label>
            </TableColumn>
          </>
        }
      >
        {rows}
      </Table>
    </div>
  );
}

export default Solution;
