import type { TextFieldProps } from "@mui/material";
import { TextField } from "@mui/material";

type Props = TextFieldProps & {
    errorMessage?: string;
};

const Input = ({ errorMessage, ...rest }: Props) => {
    return (
        <TextField
            fullWidth
            variant="outlined"
            error={!!errorMessage}
            helperText={errorMessage}
            {...rest}
        />
    );
};

export default Input;