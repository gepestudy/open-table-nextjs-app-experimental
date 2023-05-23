import TextField from "@mui/material/TextField";

interface IProps {
  inputs: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    city: string;
    password: string;
  };
  handleChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  signin: boolean | undefined;
}

const AuthModalInput = ({ inputs, handleChangeInput, signin }: IProps) => {
  return (
    <div>
      {signin ? null : (
        <div className="my-3 flex justify-between gap-2 text-sm">
          <TextField
            value={inputs.firstName}
            label="First Name"
            size="small"
            fullWidth
            autoFocus
            onChange={handleChangeInput}
            name="firstName"
          />
          <TextField
            value={inputs.lastName}
            label="Last Name"
            size="small"
            fullWidth
            onChange={handleChangeInput}
            name="lastName"
          />
        </div>
      )}
      <div className="my-3 flex justify-between gap-2 text-sm">
        <TextField
          value={inputs.email}
          label="Email"
          size="small"
          fullWidth
          onChange={handleChangeInput}
          name="email"
        />
      </div>
      {signin ? null : (
        <div className="my-3 flex justify-between gap-2 text-sm">
          <TextField
            value={inputs.phone}
            label="Phone"
            size="small"
            fullWidth
            type="number"
            inputProps={{ inputMode: "numeric", patern: "[0-9]*" }}
            onChange={handleChangeInput}
            name="phone"
          />
          <TextField
            value={inputs.city}
            label="City"
            size="small"
            fullWidth
            onChange={handleChangeInput}
            name="city"
          />
        </div>
      )}
      <div className="my-3 flex justify-between gap-2 text-sm">
        <TextField
          value={inputs.password}
          label="Password"
          type="password"
          size="small"
          fullWidth
          autoComplete="new-password"
          onChange={handleChangeInput}
          name="password"
        />
      </div>
    </div>
  );
};
export default AuthModalInput;
