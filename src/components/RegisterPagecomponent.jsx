import { Alert, Grid, TextField } from "@mui/material";

const mustFields = [
  "firstName",
  "lastName",
  "phone",
  "email",
  "password",
  "country",
  "city",
  "street",
  "houseNumber",
];

const RegisterPageComponent = ({
  item,
  inputState,
  inputsErrorState,
  onChange
}) => {
  const isRequired = mustFields.includes(item);
  if (item === "biz") return;
  return isRequired ? (
    <Grid item xs={12} sm={6}>
      <TextField
        required
        name={item}
        fullWidth
        id={item}
        label={item}
        value={inputState ? inputState[item] : ""}
        onChange={onChange}
      />
      {inputsErrorState && inputsErrorState[item] && (
        <Alert severity="warning">
          {inputsErrorState[item].map((item) => (
            <div key={"{item}-errors" + item}>{item}</div>
          ))}
        </Alert>
      )}
    </Grid>
  ) : (
    <Grid item xs={12} sm={6}>
      <TextField
        name={item}
        fullWidth
        id={item}
        label={item}
        value={inputState[item] ? inputState[item] : ""}
        onChange={onChange}
      />
      {inputsErrorState && inputsErrorState[item] && (
        <Alert severity="warning">
          {inputsErrorState[item].map((item) => (
            <div key={"{item}-errors" + item}>{item}</div>
          ))}
        </Alert>
      )}
    </Grid>
  );
};
export default RegisterPageComponent;
