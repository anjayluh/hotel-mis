import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { chunkArray } from "../utils/arrayHelpers";
import DataLabel from "./DataLabel";
import DataValue from "./DataValue";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%"
    },
    row: {
      marginLeft: 0,
      paddingLeft: 0,
      paddingBottom: theme.spacing(2)
    },
    col: {
      marginLeft: 0,
      paddingLeft: 0,
      paddingBottom: theme.spacing(1)
    },
    label: {
      margin: 0,
      paddingLeft: 0,
      paddingRight: theme.spacing(2),
      width: "auto"
    },
    value: {
      width: "100%"
    },
    simpleCol: {
      marginLeft: 0,
      paddingLeft: 0,
      paddingBottom: "unset"
    },
    contacts: {
      position: "relative"
    },
    contactActions: {
      position: "absolute",
      top: "0px",
      right: "0px"
    }
  })
);

export interface IRec {
  label: any;
  value: any;
}

interface IProps {
  data: IRec[];
  columns?: number;
  useGrid?: boolean;
  bold?: boolean;
  noColon?: boolean;
  handleClickedItem?: (method: string, item: any) => any;
  editButton: any;
  deleteButton?: any;
}

const TableView = (props: IProps) => {
  const classes = useStyles();
  const [canEdit, setCanEdit] = useState<boolean>(false);
  const [canDelete, setCanDelete] = useState<boolean>(false);

  const handleEntered = () => {
    setCanEdit(true);
    setCanDelete(true);
  };
  const handleLeave = () => {
    setCanEdit(false);
    setCanDelete(false);
  };
  const handleEdit = () => {
    if (props.handleClickedItem) {
      props.handleClickedItem("edit", props.data);
    }
  };
  const handleDelete = (itemData: any) => {
    if (props.handleClickedItem) {
      props.handleClickedItem("delete", props.data);
    }
  };
  if (props.useGrid)
    return (
      <Grid container spacing={0}>
        {props.data.map(it => (
          <Grid item xs={12} key={it.value}>
            <Box display="flex" pb={0}>
              {props.bold ? (
                <Box flexGrow={1}>
                  <Typography variant="body1" noWrap>
                    {it.value}
                  </Typography>
                  <Typography variant="caption">
                    <b>{it.label}</b>
                  </Typography>
                </Box>
              ) : (
                <Box flexGrow={1}>
                  <Typography variant="body1" noWrap>
                    {it.value}
                  </Typography>
                  <Typography variant="caption">{it.label}</Typography>
                </Box>
              )}
            </Box>
          </Grid>
        ))}
      </Grid>
    );
  return (
    <Box
      pl={1}
      className={classes.contacts}
      onMouseEnter={handleEntered}
      onMouseLeave={handleLeave}
    >
      <table className={classes.root}>
        <tbody>
          {props.data[0] && (
            <tr key={props.data[0].value} className={classes.row}>
              <td className={clsx(classes.simpleCol, classes.value)}>
                <DataValue>{props.data[0].value}</DataValue>
              </td>
            </tr>
          )}
          {props.data[1] && (
            <tr key={props.data[1].label} className={classes.row}>
              <td className={clsx(classes.col, classes.label)}>
                <DataLabel noColon={true} bold={props.bold} noWrap={false}>
                  {props.data[1].value}
                </DataLabel>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <Box className={classes.contactActions} display="flex">
        {props.editButton && (
          <Box onClick={handleEdit}>{canEdit && props.editButton}</Box>
        )}
        {props.deleteButton && (
          <Box onClick={handleDelete}>{canDelete && props.deleteButton}</Box>
        )}
      </Box>
    </Box>
  );
};

const DetailView = ({
  data,
  columns,
  useGrid,
  bold,
  editButton,
  deleteButton,
  handleClickedItem
}: IProps) => {
  if (columns) {
    const parts = chunkArray(data, columns);
    const size: any = 12 / columns;
    return (
      <Grid container>
        {parts.map((it, index) => (
          <Grid item xs={size} key={index}>
            <TableView
              data={it}
              useGrid={useGrid}
              bold={bold}
              editButton={editButton}
              deleteButton={deleteButton}
              handleClickedItem={handleClickedItem}
            />
          </Grid>
        ))}
      </Grid>
    );
  } else {
    return (
      <TableView
        data={data}
        useGrid={useGrid}
        bold={bold}
        editButton={editButton}
        deleteButton={deleteButton}
        handleClickedItem={handleClickedItem}
      />
    );
  }
};

export default DetailView;

export const DetailViewX = ({ data }: IProps) => {
  return (
    <Box>
      {data.map((rec, index) => (
        <Box display="flex" key={rec.value} pb={1}>
          <Box width="40%">
            <DataLabel>{rec.label}</DataLabel>
          </Box>
          <Box width="70%">
            <DataValue>{rec.value}</DataValue>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export const BoldTableView = ({ data }: IProps) => {
  const classes = useStyles();
  return (
    <table className={classes.root}>
      <tbody>
        {data.map(row => (
          <tr key={row.value}>
            <td style={{ width: 100 }}>
              <DataLabel>{row.label}</DataLabel>
            </td>
            <td style={{ padding: 3 }}>
              <DataValue>{row.value}</DataValue>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
