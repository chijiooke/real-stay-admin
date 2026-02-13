import * as React from "react";
import {
  Modal,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Stack,
  Box,
  Divider,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getFormikTextFieldProps } from "@/app/utils/formik-helpers";
import { LoadingButton } from "@mui/lab";

export interface InviteAdminFormValues {
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
}

interface InviteAdminModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: InviteAdminFormValues) => void;
  isLoading?: boolean;
}

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  phone_number: Yup.string()
    .min(11, "Minimum 10 digits")
    .max(15, "Maximum 15 digits")
    .required("Phone number is required"),
});

export const InviteAdminModal: React.FC<InviteAdminModalProps> = ({
  open,
  onClose,
  onSubmit,
  isLoading,
}) => {
  const formik = useFormik<InviteAdminFormValues>({
    initialValues: {
      email: "",
      first_name: "",
      last_name: "",
      phone_number: "",
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    //   onClose();
    },
  });

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
        }}
      >
        <Card sx={{ width: 420 }}>
          <CardContent>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              color="secondary"
              gutterBottom
              sx={{ mb: 6 }}
            >
              Invite Admin
            </Typography>
            <Divider />

            <form onSubmit={formik.handleSubmit}>
              <Stack spacing={4}>
                <TextField
                  variant="outlined"
                  label="Email"
                  size="medium"
                  color="secondary"
                  placeholder="enter email"
                  value={formik.values.email}
                  {...getFormikTextFieldProps(formik, "email")}
                />

                <TextField
                  variant="outlined"
                  label="First Name"
                  size="medium"
                  color="secondary"
                  placeholder="enter first name"
                  value={formik.values.first_name}
                  {...getFormikTextFieldProps(formik, "first_name")}
                />

                <TextField
                  variant="outlined"
                  label="Last Name"
                  size="medium"
                  color="secondary"
                  placeholder="enter last name"
                  value={formik.values.last_name}
                  {...getFormikTextFieldProps(formik, "last_name")}
                />

                <TextField
                  variant="outlined"
                  label="Phone Number"
                  size="medium"
                  color="secondary"
                  placeholder="enter phone number"
                  value={formik.values.phone_number}
                  {...getFormikTextFieldProps(formik, "phone_number")}
                />

                <Stack direction="row" spacing={1} pt={1}>
                  <LoadingButton
                    loading={isLoading}
                    type="submit"
                    variant="contained"
                    color="secondary"
                    fullWidth
                    disabled={!formik.isValid }
                  >
                    Send Invite
                  </LoadingButton>

                  <Button
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                </Stack>
              </Stack>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Modal>
  );
};
