import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Container,
  Stack,
  Button,
  Card,
  Divider,
  InputBase,
  SvgIcon,
  IconButton,
  TablePagination,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import PropTypes from "prop-types";
import NewEmployee from "../componets/forms/NewEmployee";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteEmployee, getData } from "../api/api";
import EditEmployee from "../componets/forms/EditEmployee";
import toast, { Toaster } from "react-hot-toast";
const OrdersTable = ({
  count,
  items,
  onPageChange,
  page,
  rowsPerPage,
  onRowsPerPageChange,
  handleEdit,
  handleDelete,
  onSort,
  sort,
}) => {
  const handleSort = (column) => {
    onSort(column);
  };

  return (
    <Box className="mt-4">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 800 }}>
          <TableHead className="bg-trueGray-100">
            <TableRow>
              {["Unique Id", "Image", "Name", "Email", "Mobile No", "Designation", "Gender", "Courses", "Create Date"].map((header, index) => (
                <TableCell
                  key={index}
                  onClick={() => handleSort(header.toLowerCase().replace(/\s/g, ""))}
                >
                  {header}
                  {header === "Name" && (
                    <span>
                      {sort.column === "name" && (sort.direction === "asc" ? " ↑" : " ↓")}
                    </span>
                  )}
                  {header === "Email" && (
                    <span>
                      {sort.column === "email" && (sort.direction === "asc" ? " ↑" : " ↓")}
                    </span>
                  )}
                  {header === "Unique Id" && (
                    <span>
                      {sort.column === "_id" && (sort.direction === "asc" ? " ↑" : " ↓")}
                    </span>
                  )}
                </TableCell>
              ))}
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((i, index) => (
              <TableRow hover key={i._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  {i.image ? (
                    <img
                      src={i.image}
                      alt={i.name}
                      style={{ width: 50, height: 50 }}
                    />
                  ) : (
                    "No Image"
                  )}
                </TableCell>
                <TableCell>{i.name}</TableCell>
                <TableCell>{i.email}</TableCell>
                <TableCell>{i.phone}</TableCell>
                <TableCell>{i.designation}</TableCell>
                <TableCell>{i.gender}</TableCell>
                <TableCell>{i.course ? i.course.join(", ") : ""}</TableCell>
                <TableCell>{new Date(i.createdAt).toDateString()}</TableCell>
                <TableCell align="right">
                  <Box display="flex" flexDirection="row">
                    <IconButton onClick={() => handleEdit(i._id)}>
                      <SvgIcon fontSize="small">
                        <EditIcon />
                      </SvgIcon>
                    </IconButton>
                    <IconButton onClick={() => handleDelete(i._id)}>
                      <SvgIcon fontSize="small">
                        <DeleteIcon />
                      </SvgIcon>
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Divider />
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </Box>
  );
};

OrdersTable.propTypes = {
  count: PropTypes.number.isRequired,
  items: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  sort: PropTypes.shape({
    column: PropTypes.string,
    direction: PropTypes.string,
  }).isRequired,
};

function Employees() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [employee, setEmployee] = useState([]);
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState({ column: "", direction: "asc" });

  useEffect(() => {
    const fetch = async () => {
      const data = await getData();
      setEmployee(data);
    };
    fetch();
  }, [editModal, isModalOpen]);
  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);
  const handleEdit = (id) => {
    setEditId(id);
    setEditModal(true);
  };
  const handleEditClose = () => setEditModal(false);
  const handleSearchChange = (event) => setSearchTerm(event.target.value);
  const handleSort = (column) => {
    setSort((prevSort) => ({
      column,
      direction: prevSort.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleDelete = async (id) => {
    const res = await deleteEmployee(id);
    if (res) {
      setEmployee(res.data);
      toast.success(res.message);
    }
  };
  const filteredEmployees = employee.data?.filter((e) => {
    return (
      e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e._id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const sortedEmployees = filteredEmployees?.sort((a, b) => {
    if (sort.column) {
      if (sort.direction === "asc") {
        return a[sort.column] > b[sort.column] ? 1 : -1;
      } else {
        return a[sort.column] < b[sort.column] ? 1 : -1;
      }
    }
    return 0; 
  });

  return (
    <Box sx={{ flexGrow: 1, py: 3 }}>
      <Container maxWidth="xl">
        <Stack spacing={3}>
          <Stack
            alignItems="flex-start"
            direction="row"
            justifyContent="space-between"
            spacing={3}
          >
            <Typography variant="h4" gutterBottom>
              Employees
            </Typography>
            <Button
              color="success"
              size="large"
              variant="contained"
              onClick={handleOpenModal}
            >
              Create Employee
            </Button>
          </Stack>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              backgroundColor: "background.paper",
              borderRadius: 1,
              boxShadow: 1,
              padding: 2,
              mt: 2,
            }}
          >
            <SvgIcon fontSize="small" sx={{ mr: 1 }}>
              <MagnifyingGlassIcon />
            </SvgIcon>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search Employees"
              inputProps={{ "aria-label": "search employees" }}
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <Button
              className="text-[#1f851f]"
              size="large"
              startIcon={
                <SvgIcon fontSize="small" className="text-[#1f851f]">
                  <AdjustmentsHorizontalIcon />
                </SvgIcon>
              }
              sx={{ order: 3 }}
            >
              <span className="text-[#1f851f]">Filter</span>
            </Button>
          </Box>
        </Stack>
        <Card>
          <OrdersTable
            items={sortedEmployees || []}
            count={sortedEmployees?.length || 0}
            rowsPerPage={10}
            page={0}
            handleEdit={handleEdit}
            onSort={handleSort}
            handleDelete={handleDelete}
            sort={sort}  // Pass the sort state to OrdersTable
          />
        </Card>
      </Container>
      <Toaster />
      <NewEmployee isOpen={isModalOpen} onClose={handleCloseModal} />
      <EditEmployee isOpen={editModal} onClose={handleEditClose} editId={editId} employee={employee.data} />
    </Box>
  );
}


export default Employees;
