
import { objectAccessor } from "./object-helpers";

export const formikCaption = (key: string, formik: any) => {
  return formik.errors[key] && formik.touched[key] ? formik.errors[key] : "";
};
export const formikError = (key: string, formik: any) => {
  return formik.errors[key] && formik.touched[key] ? true : false;
};

export function getFormikTextFieldHelperText(
  formik: any,
  key: string,
  helperText?: string
) {
  return !!objectAccessor(formik.touched, key) &&
    objectAccessor(formik.errors, key)
    ? objectAccessor(formik.errors, key)
    : helperText;
}

export function getFormikTextFieldError(formik: any, key: string) {
  return (
    !!objectAccessor(formik.touched, key) &&
    !!objectAccessor(formik.errors, key)
  );
}

/**
 *
 * @param {*} formik
 * @param {*} key
 * @returns
 */
export function getFormikTextFieldHelperTextAndErrorProps(
  formik: any,
  key: string,
  helperText?: string
) {
  return {
    error: getFormikTextFieldError(formik, key),
    helperText: getFormikTextFieldHelperText(formik, key, helperText),
  };
}

/**
 * @param {*} formik
 * @param {*} key
 * @returns
 */
export function getFormikTextFieldProps(
  formik: any,
  key: string,
  helperText?: string
) {
  return {
    ...formik.getFieldProps(key),
    ...getFormikTextFieldHelperTextAndErrorProps(formik, key, helperText),
  };
}

export function getFormikCheckFieldProps(
  formik: any,
  key: string,
  checkedValue = true
  // unCheckedValue = false
) {
  const textFieldProps = getFormikTextFieldProps(formik, key);

  const value =
    typeof checkedValue === "boolean"
      ? !!textFieldProps.value
      : textFieldProps.value;
  return {
    ...textFieldProps,
    value: value,
    checked: value === checkedValue,
  };
  // return {
  //   checked: !!formik.values[key],
  //   onChange: (e) => formik.setFieldValue(key, e.target.checked),
  // };
}
