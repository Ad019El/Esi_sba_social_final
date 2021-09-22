import { createUseStyles } from "react-jss";
import colors from "../../../Styles/Color";
import { BUTTON_PRIMARY, INPUT_TEXT } from "../../../Styles/Button";

const useStyles = createUseStyles({
  root: {
    padding: "40px 20px",
    marginBottom: "40px",
    "&.card-shadow": {
      borderRadius: "10px",
      "box-shadow": "0px 13px 26px rgb(109,184,241, 0.16)",
    },

    "& .title": {
      color: "#2d3748",
    },
    "& .subtitle": {
      color: "#4a5568",
      fontWeight: "900",
    },

    "& .button-primary": BUTTON_PRIMARY,
    "& .input-text": INPUT_TEXT,
    "& .form-link": {
      "& a": {
        color: colors["text-gray-700"],
        "& span": {
          fontWeight: 500,
          fontSize: 16,
        },
      },
    },
  },
});

export default useStyles;
