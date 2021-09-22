import { createUseStyles } from "react-jss";
import colors from "../../../Styles/Color";

const useStyles = createUseStyles({
  root: {
    padding: "40px 20px",
    marginBottom: "40px",
    "&.card-shadow": {
      borderRadius: "10px",
      "box-shadow": "0px 13px 26px rgb(109,184,241, 0.16)",

      "& .title": {
        color: "#2d3748",
        fontWeight: "600",
      },
      "& .description": {
        color: "#718096",
        fontWeight: "600",
        maxWidth: "500px",
      },
      "& .button-primary": {
        background: " #38d9a9",
        border: 0,
        borderRadius: "10px",
        fontWeight: 600,
        color: "#fff !important",
        padding: "8px 20px !important",
        "&:not([disabled]):hover": {
          background: "#0ca678",
        },
      },
      "& .button-secondary": {
        background: " #f06595",
        border: 0,
        borderRadius: "10px",
        fontWeight: 600,
        color: "#fff !important",
        padding: "8px 20px !important",
        "&:not([disabled]):hover": {
          background: "#c2255c",
        },
      },
      "& .boxs": {
        display: "flex",
        flexFlow: "row wrap",
        justifyContent: "center",
        width: "80%",
        margin: "auto",
        "& .img": {
          maxWidth: "500px",
          maxHeight: "500px",
        },
        "& .imgii": {
          maxWidth: "35px",
          maxHeight: "35px",
          marginRight: "50px",
        },
        "& .title": {
          color: "#2d3748",
          fontWeight: "600",
        },
        "& .description": {
          color: "#718096",
          fontWeight: "600",
          maxWidth: "500px",
        },
      },
    },
  },

  "& .form-link": {
    "& a": {
      color: colors["text-gray-700"],
      "& span": {
        fontWeight: 500,
      },
    },
  },
});

export default useStyles;
