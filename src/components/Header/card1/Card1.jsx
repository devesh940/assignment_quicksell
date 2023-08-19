import React from "react";
import { Card, Grid, Avatar, Chip } from "@mui/material";
import { deepOrange, deepPurple } from "@mui/material/colors";
import {
  MoreHoriz as MoreHorizIcon,
  Error as ErrorIcon,
  SignalCellularAlt1Bar as SignalCellularAlt1BarIcon,
  SignalCellularAlt2Bar as SignalCellularAlt2BarIcon,
  SignalCellularAlt as SignalCellularAltIcon,
  RotateLeft as RotateLeftIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
  HourglassBottom as HourglassBottomIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";

const statusIcons = {
  Todo: <RadioButtonUncheckedIcon />,
  "In progress": <HourglassBottomIcon />,
  Backlog: <RotateLeftIcon />,
  Done: <CheckCircleIcon />,
  Canceled: <CancelIcon />,
};

const priorityIcons = {
  0: <MoreHorizIcon />,
  1: <SignalCellularAlt1BarIcon />,
  2: <SignalCellularAlt2BarIcon />,
  3: <SignalCellularAltIcon />,
  4: <ErrorIcon color="disabled" />,
};

const Card1 = (props) => {
  const renderStatusOrUserAvatar = () => {
    if (props.type === "user") return null;

    const userInitial = props.user.split(" ")[0][0];
    const avatarColor =
      props.type === "status" ? deepPurple[500] : deepOrange[500];

    return (
      <Avatar sx={{ bgcolor: avatarColor, width: "25px", height: "25px" }}>
        <span>{userInitial}</span>
      </Avatar>
    );
  };

  const renderPriorityIcons = () => (
    <Grid item xs={2}>
      {priorityIcons[props.priority]}
    </Grid>
  );

  return (
    <Card style={{ margin: "8px", padding: "8px" }}>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          {props.id}
        </Grid>
        <Grid item xs={2}>
          {renderStatusOrUserAvatar()}
        </Grid>
      </Grid>

      {props.type === "status" ? (
        <p>
          <b>{props.title}</b>
        </p>
      ) : (
        <>
          <span>{statusIcons[props.status]}</span>
          <span>{props.title}</span>
        </>
      )}

      {(props.type === "status" || props.type === "user") && (
        <Grid container spacing={2} style={{ marginTop: "1px" }}>
          {renderPriorityIcons()}
          <Grid item xs={10}>
            {props.tag.map((item, index) => (
              <Chip label={item} variant="outlined" key={index} />
            ))}
          </Grid>
        </Grid>
      )}

      {props.type === "priority" && (
        <div>
          {props.tag.map((item, index) => (
            <Chip
              label={item}
              variant="outlined"
              key={index}
              style={{ marginTop: "2px" }}
            />
          ))}
        </div>
      )}
    </Card>
  );
};

export default Card1;
