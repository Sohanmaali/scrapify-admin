import { CButton, CModal, CModalBody, CModalFooter } from "@coreui/react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import HelperFunctions from "./HelperFunction"; // Import the HelperFunctions class

export const DeleteModal = ({
  moduleName,
  visible,
  setVisible,
  currentPage,
  rowPerPage,
  handleClose,
  userId,
  deletionType,
  isDirectDelete,
  visitedProfileId,
}) => {
  const dispatch = useDispatch();

  if (moduleName) {
    var parts = moduleName.split("/");
    var module = parts.pop();
  }

  const capitalizeFirstLetter = (word) => {
    return word?.charAt(0).toUpperCase() + word?.slice(1);
  };

  const handleDelete = async () => {
    if (deletionType === "trash") {
      console.log("if block");

      const success = await HelperFunctions.trashData(moduleName, userId);
      dispatch({ type: "set", toggleCleared: false });
      dispatch({ type: "set", selectedrows: [] });
      setVisible(false);
      console.log("success", success);

      if (success) {
        const response = await HelperFunctions.getData(
          moduleName,
          currentPage,
          rowPerPage
        );
        dispatch({ type: "set", data: { [`${module}`]: response.data } });
        dispatch({ type: "set", totalCount: response.total });
      }
    } else {
      const success = await HelperFunctions.deleteData(
        moduleName,
        userId,
        visitedProfileId
      );
      console.log("success", success);

      dispatch({ type: "set", toggleCleared: false });
      dispatch({ type: "set", selectedrows: [] });
      setVisible(false);

      if (success?.status === "success") {
        const response = await HelperFunctions.getData(
          `${moduleName}/trash`,
          currentPage,
          rowPerPage
        );
        dispatch({
          type: "set",
          data: {
            [moduleName]: response.data,
          },
        });
        dispatch({ type: "set", totalCount: response.total });
      } else {
        const response = await HelperFunctions.getData(
          moduleName,
          currentPage,
          rowPerPage,
          visitedProfileId
        );
        console.log("response=============>>>.", response);

        dispatch({ type: "set", data: { [`${module}`]: response.data } });
        dispatch({ type: "set", totalCount: response.total });
        // console.log("Module", module);
      }
    }
  };

  return (
    <CModal
      alignment="center"
      visible={visible}
      onClose={handleClose}
      className="delete_item_box"
    >
      <CModalBody className="text-center mt-4">
        <div className="logo_x m-auto mb-3">x</div>
        <span>
          Are you sure you want to delete the{" "}
          {capitalizeFirstLetter(module?.slice(0, -1))} ?
        </span>
      </CModalBody>
      <CModalFooter className="model_footer justify-content-center mb-3 pt-0">
        <CButton
          className="delete_btn model_btn"
          color="danger"
          onClick={handleDelete}
        >
          Yes
        </CButton>
        <CButton
          className="close_btn model_btn"
          color="secondary"
          onClick={handleClose}
        >
          No, cancel
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

DeleteModal.propTypes = {
  visible: PropTypes.bool,
  moduleName: PropTypes.string,
  handleClose: PropTypes.func,
  currentPage: PropTypes.number,
  rowPerPage: PropTypes.number,
  userId: PropTypes.string,
  deletionType: PropTypes.string,
  isDirectDelete: PropTypes.bool,
  visitedProfileId: PropTypes.string,
};
