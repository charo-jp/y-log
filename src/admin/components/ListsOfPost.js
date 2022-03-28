import React, { useState, useEffect, useContext } from "react";
import { useLocation, Link } from "react-router-dom";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { AiFillEye, AiTwotoneEdit, AiFillDelete } from "react-icons/ai";

import Modal from "../../shared/components/Overlay/Modal";
import Loading from "../../shared/components/Loading";
import CreateButton from "./CreateButton";
import Button from "../../shared/components/UIElements/Button";
import { useHttpClient } from "../../shared/hooks/http-hook";
import GoBack from "../../shared/components/UIElements/GoBack";
import nameCategoryHandler from "../../shared/functions/nameCategory";
import "./ListsOfPost.css";
import { AdminContext } from "../../shared/contexts/AdminContext";

const ListOfPost = () => {
  const location = useLocation();
  const path = location.pathname;
  const admin = useContext(AdminContext);
  const {name, category} = nameCategoryHandler(path);
  
  const [showConfirm, setShowConfirm] = useState(false);
  const [loadedLists, setLoadedLists] = useState();
  const [target, setTarget] = useState({
    name: "",
    id: "",
    title: "",
  });
  const { isLoading, error, sendRequest } = useHttpClient();

  const editPostHandler = (name0, id) => {
    setTarget((prev) => ({
      ...prev,
      name: name0,
      id: id,
      title: "",
    }));
  };

  const deleteWarningHandler = (name1, id, title) => {
    setShowConfirm(true);
    setTarget((prev) => ({
      ...prev,
      name: name1,
      id: id,
      title: title,
    }));
  };

  const cancelDeleteHandler = () => {
    setShowConfirm(false);
  };

  const fetchRequest = async () => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/${name}/${category}`
      );

      if (name === "portfolio") {
        setLoadedLists(responseData.portfolios);
      }
      if (name === "blog") {
        setLoadedLists(responseData.blogs);
      }
    } catch (err) {
      console.log(error);
      setLoadedLists(null);
    }
  };

  const confirmDeleteHandler = async () => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/${name}/${target.id}`,
        "DELETE",null, {
          Authorization: "Bearer " + admin.token
        }
      );
    } catch (err) {
      console.log(error);
    }

    fetchRequest();
    setShowConfirm(false);
  };

  const capitalize = (value) => {
    if(value === "nba") return "NBA";
    const capitalizing = value.charAt(0).toUpperCase() + value.slice(1);
    const capitalized = capitalizing.replace("related", "Related");
    return capitalized.replace("-", " ");
  };
  useEffect(() => {
    fetchRequest();
  }, [sendRequest]);

  return (
    <React.Fragment>
      <GoBack to = "/admin" />
      <div className="list-of-post">
        <Modal
          show={showConfirm}
          onCancel={cancelDeleteHandler}
          header={`Are you sure you want to delete "${target.title}" ?`}
        >
          <div className="lower-modal">
            <Button
              text="Cancel"
              cName="cancel-button"
              onClick={cancelDeleteHandler}
            />
            <Button
              text="Delete"
              cName="delete-button"
              onClick={confirmDeleteHandler}
            />
          </div>
        </Modal>
        <div className="list-of-post-header">
          <h2 className="list-of-post-title">{capitalize(category)}</h2>
          <CreateButton
            name={name}
            category={category}
            type={`create-${name}`}
          />
        </div>
        <div className="database-container">
          {isLoading && (
            <div className="center">
              <Loading />
            </div>
          )}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left">No.</TableCell>
                  <TableCell align="left">Title</TableCell>
                  <TableCell align="left">Created At</TableCell>
                  <TableCell align="left">ID</TableCell>
                  <TableCell align="right">Edit</TableCell>
                  <TableCell align="right">Delete</TableCell>
                  <TableCell align="right">View</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!isLoading &&
                  loadedLists &&
                  loadedLists.map((post, index) => {
                    return (
                      <TableRow key={post.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{post.title}</TableCell>
                        <TableCell>{post.createdAt}</TableCell>
                        <TableCell>{post.id}</TableCell>
                        <TableCell align="right" sx={{ width: "5%" }}>
                          <CreateButton
                            name={name}
                            category={category}
                            type={`edit-${name}`}
                            id={post.id}
                            onClick={editPostHandler}
                          >
                            <AiTwotoneEdit className="crud-icon" />
                          </CreateButton>
                        </TableCell>
                        <TableCell align="right" sx={{ width: "5%" }}>
                          <button
                            className="view-button"
                            onClick={() => {
                              deleteWarningHandler(name, post.id, post.title);
                            }}
                          >
                            <AiFillDelete className="crud-icon" />
                          </button>
                        </TableCell>
                        <TableCell align="right" sx={{ width: "5%" }}>
                          <Link
                            className="view-button"
                            to={`/${name}/${category}/${post.id}`}
                            target="_blank"
                          >
                            <AiFillEye className="crud-icon" />
                          </Link>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ListOfPost;
