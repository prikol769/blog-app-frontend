import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

export function Modal({
  open,
  setOpen,
  handleDelete,
  deleteResponse,
  setDeleteResponse,
  navigateTo,
}) {
  const navigate = useNavigate();
  const handleDeleteFunc = () => {
    handleDelete();
  };
  return (
    <Dialog
      className="px-[32px] py-[24px]"
      open={open}
      size={"sm"}
      handler={() => setOpen(true)}
    >
      {!deleteResponse ? (
        <>
          <DialogHeader>
            Are you sure you want to delete this post?
          </DialogHeader>
          <DialogBody>
            This will delete this post permanently. You cannot undo this action.
          </DialogBody>
          <DialogFooter>
            <Button
              variant="outlined"
              onClick={() => setOpen(false)}
              className="mr-6"
            >
              <span>Cancel</span>
            </Button>
            <Button
              className="py-[14px] px-[26px]"
              variant="gradient"
              color="red"
              onClick={handleDeleteFunc}
            >
              <span>Delete</span>
            </Button>
          </DialogFooter>
        </>
      ) : (
        <>
          <DialogHeader>{deleteResponse.message}</DialogHeader>
          {navigateTo && (
            <DialogBody>You will be redirected to the home page.</DialogBody>
          )}
          <DialogFooter>
            <Button
              variant="gradient"
              onClick={() => {
                setOpen(false);
                if (navigateTo) {
                  navigate(navigateTo);
                }
                if (setDeleteResponse) {
                  setDeleteResponse(null);
                }
              }}
              className="mr-6"
            >
              <span>OK</span>
            </Button>
          </DialogFooter>
        </>
      )}
    </Dialog>
  );
}
