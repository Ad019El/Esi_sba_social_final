import { createUseStyles } from "react-jss";
import colors from "../../../styles/Color";
import {
  CARD_SHADOW,
  BUTTON_PRIMARY,
  INPUT_TEXT,
  SIDEBAR_TITLE,
  POSTITEM_CARD,
  BUTTON_TRANSPARENT,
  LINK_PRIMARY,
} from "../../../styles/Button";

const useStyles = createUseStyles({
  page: {
    padding: "0px 0px 50px 0px",
    marginBottom: "1px",
    "@media screen and (min-width: 992px)": {
      "& .button-primary": BUTTON_PRIMARY,
      "& .link-primary": LINK_PRIMARY,
      "& .BUTTON_TRANSPARENT": BUTTON_TRANSPARENT,
    },
    "&.card-shadow": CARD_SHADOW,
    "&> .title": {
      color: colors.primary,
    },
    "& .subone": {
      color: colors["primary-hover"],
    },
    "& .accepted": {
      color: colors.success,
    },
    "& .refused": {
      color: colors.danger,
    },
    "& .container": {
      width: "100%",
    },
    "& .subtitle": {
      color: colors["text-gray-700"],
      fontWeight: "400",
    },

    "& .card-shadow": CARD_SHADOW,
    "& .sidebar-title": SIDEBAR_TITLE,
    "& .messageitem": {
      ...POSTITEM_CARD,
      "& .icon": {
        fontSize: "60px",
        color: colors["text-gray-700"],
      },
      "& .user": {
        fontWeight: "600",
        color: colors["text-gray-700"],
      },
      "& .message": {
        color: colors["text-gray-700"],
      },
      "& .message-date": {
        fontWeight: "500",
        fontSize: "14px",
        color: colors["text-gray-500"],
      },
      "& .unread-icon": {
        fontSize: "10px",
        color: colors.danger,
      },
    },
    "& .link-primary": LINK_PRIMARY,
    "& .conversation-messages": {
      "& .other-user-details": {
        "& .icon": {
          fontSize: "36px",
          color: colors["text-gray-700"],
        },
        "& .username": {
          fontWeight: "600",
          color: colors["text-gray-700"],
        },
      },

      "& .messages": {
        width: "100%",
        "& .message": {
          marginBottom: "1rem",
        },
        "& .message-left": {
          justifyContent: "flex-start",
          display: "flex",
          textAlign: "left",
          "& .content": {
            background: colors["text-gray-100"],
          },
        },
        "& .message-right": {
          justifyContent: "flex-end",
          display: "flex",
          textAlign: "right",
          "& .content": {
            background: colors.primary,
            color: colors["text-white"],
          },
        },
        "& .content": {
          padding: ".5rem 1rem",
          marginBottom: ".25rem",
          borderRadius: "12px",
          fontWeight: "500",
          maxWidth: "500px",
        },
        "& .date": {
          padding: "0 1rem",
          fontWeight: 500,
          fontSize: "14px",
        },
        "& .icon": {
          fontSize: "28px",
          color: colors["text-gray-700"],
        },
      },
    },
    "& .message-form": {
      "& .message-input": {
        ...INPUT_TEXT,
      },
      "& .button-primary": BUTTON_PRIMARY,
    },
  },
});

export default useStyles;
