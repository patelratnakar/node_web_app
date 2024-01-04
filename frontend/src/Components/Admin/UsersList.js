import { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./ProductList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import MetaData from "../Layout/Metadata";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { getAllUsers, clearErrors, deleteUser} from "../../Actions/useraction";
import { DELETE_USER_RESET } from "../../Constants/userconstants";

const UsersList = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, users } = useSelector((state) => state.allUsers);
  const { user } = useSelector((state) => state.user);

  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);

  const [open, setopen] = useState(false);

  const CloseDialogToggle = () => {
    setopen(false);
  };

  const deleteUserHandler = (id) => {
    if (user._id === id) {
      setopen(true);
    } else {
      deleteuser(id,false);
    }
  };
  const deleteuser = (id,x) => {
    dispatch(deleteUser(id));
    if(x){
      window.location.reload()
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success(message);
      history.push("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers());
  }, [dispatch, alert, error, deleteError, history, isDeleted, message]);

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },

    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.5,
    },

    {
      field: "role",
      headerName: "Role",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      cellClassName: (params) => {
        return params.getValue(params.id, "role") === "admin"
          ? "greenColor"
          : "redColor";
      },
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteUserHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
            <Dialog
              aria-labelledby="simple-dialog-title"
              open={open}
              onClose={CloseDialogToggle}
            >
              <DialogTitle>You are deleting Yourself!</DialogTitle>
              <DialogContent className="submitDialog">
                You are going to delete yourself! You will no longer have access
                to this site with your details, Are You Sure?
              </DialogContent>
              <DialogActions>
                <Button onClick={CloseDialogToggle} color="secondary">
                  Cancel
                </Button>
                <Button
                  onClick={() => {CloseDialogToggle(); deleteuser(params.getValue(params.id, "id"),true)}}
                  color="primary"
                >
                  Yes
                </Button>
              </DialogActions>
            </Dialog>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.Role,
        email: item.Email,
        name: item.Name,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL USERS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL USERS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default UsersList;
