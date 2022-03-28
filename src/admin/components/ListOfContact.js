import React, { useState, useEffect, useContext } from "react";
import parse from 'html-react-parser';

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { AiFillEye, AiFillDelete } from "react-icons/ai";
import Modal from "../../shared/components/Overlay/Modal";
import Loading from "../../shared/components/Loading";
import Button from "../../shared/components/UIElements/Button";
import { useHttpClient } from "../../shared/hooks/http-hook";
import GoBack from "../../shared/components/UIElements/GoBack";

import "./ListOfContact.css";
import "./ListsOfPost.css";
import { AdminContext } from "../../shared/contexts/AdminContext";

const ListOfContact = () => {
  const { isLoading, error, sendRequest } = useHttpClient();
  const [loadedLists, setLoadedLists] = useState();
  const [showPreview, setShowPreview] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const admin = useContext(AdminContext);
  const [target, setTarget] = useState({
    id: "",
    title: "",
    name: "",
    message: "",
    email: "",
  });

  const fetchRequest = async () => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/contact`,"GET",null, {
          Authorization: "Bearer " + admin.token
        }
      );
      setLoadedLists(responseData.contacts);
    } catch (err) {
      console.log(error);
      setLoadedLists(null);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  const deleteWarningHandler = (id, title, name) => {
    setShowConfirm(true);
    setTarget((prev) => ({
      ...prev,
      id: id,
      title: title,
      name: name,
    }));
  };

  const showPreviewHandler = (id, title, name, message, email) => {
    setShowPreview(true);
    setTarget((prev) => ({
      ...prev,
      id: id,
      title: title,
      name: name,
      message: message,
      email: email,
    }));
  };

  const cancelDeleteHandler = () => {
    setShowConfirm(false);
  };

  const cancelPreviewHandler = () => {
    setShowPreview(false);
  };

  const confirmDeleteHandler = async () => {
    try {
       await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/contact/${target.id}`,
        "DELETE", null, {
          Authorization: "Bearer " + admin.token
        }
      );
    } catch (err) {
      console.log(error);
    }
    await fetchRequest();
    setShowConfirm(false);
  };

  return (
    <React.Fragment>
      <GoBack to = "/admin" />
      <div className="list-of-post">
        <Modal
          show={showConfirm}
          onCancel={cancelDeleteHandler}
          header={`Are you sure you want to delete "${target.title}" by ${target.name} ?`}
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
        <Modal
          show={showPreview}
          onCancel={cancelPreviewHandler}
          header={`Preview for ${target.title} by ${target.name}`}
        >
          <div className="contact-preview">
            <div className="contact-message">{parse(target.message)}</div>
            <p className="contact-email">Email: {target.email}</p>
          </div>
        </Modal>
        <div className="list-of-post-header">
          <h2 className="list-of-post-title">Contact</h2>
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
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">Title</TableCell>
                  <TableCell align="left">Posted At</TableCell>
                  <TableCell align="left">ID</TableCell>
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
                        <TableCell>{post.name}</TableCell>
                        <TableCell>{post.title}</TableCell>
                        <TableCell>{post.postedAt}</TableCell>
                        <TableCell>{post.id}</TableCell>
                        <TableCell align="right" sx={{ width: "5%" }}>
                          <button
                            className="view-button"
                            onClick={() => {
                              deleteWarningHandler(
                                post.id,
                                post.title,
                                post.name
                              );
                            }}
                          >
                            <AiFillDelete className="crud-icon" />
                          </button>
                        </TableCell>
                        <TableCell align="right" sx={{ width: "5%" }}>
                          <button
                            className="view-button"
                            onClick={() => {
                              showPreviewHandler(
                                post.id,
                                post.title,
                                post.name,
                                post.message,
                                post.email
                              );
                            }}
                          >
                            <AiFillEye className="crud-icon" />
                          </button>
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

export default ListOfContact;
