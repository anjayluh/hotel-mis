import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Widget from "../../widgets";
import EditIcon from "@material-ui/icons/EditRounded";
import AddIcon from "@material-ui/icons/AddCircle";
import SlideOutDrawer from "../../../../components/SlideOutDrawer";
import ServiceCategoryForm from "../forms/ServiceCategoryForm";
import Details from "./Details";
import Loading from "../../../../components/Loading";
import Button from "@material-ui/core/Button";
import ErrorBoundary from "../../../../components/ErrorBoundary/ErrorBoundary";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    pageHeading: {
      display: "flex",
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: "33.33%",
      flexShrink: 0,
    },
    filterPaper: {
      borderRadius: 0,
      padding: theme.spacing(2),
    },
    add: {
      "& .MuiSvgIcon-root": {
        marginTop: 3,
        color: "#1a76d3",
      },
    },
    cancel: {
      position: "fixed",
      bottom: "15px",
    },
    closeButton: {
      padding: "4px 30px",
      backgroundColor: "rgba(38, 50, 56, 0.04)",
    },
    submitButton: {
      padding: "4px 30px",
    },
    submit: {
      position: "fixed",
      bottom: "15px",
      right: "28px",
      marginLeft: "auto",
    },
    icon: {
      backgroundColor: "#a6a6a6",
      borderRadius: 40,
      width: 20,
      height: 20,
      color: "#d9d9d9",
      "&:hover": {
        color: "#e0e0e0",
      },
      padding: 2,
    },
  })
);
type Anchor = "top" | "left" | "bottom" | "right";

interface IProps {
  serviceCategories: any[];
}

const Category = ({ serviceCategories }: IProps) => {
  const classes = useStyles();
  const [anchor, setAnchor] = useState<Anchor>("right");
  const [openSlideOut, setOpenSlideOut] = useState(false);
  const [details, setDetails] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>({});

  const handleAdd = () => {
    setOpenSlideOut(true);
    setDetails(false);
  };
  const viewDetails = (values: any) => {
    setDetailsLoading(true);
    setOpenSlideOut(true);
    setDetails(true);
    setSelectedItem(values);
    setDetailsLoading(false);
  };
  function handleToggleDrawer(id?: any) {
    setOpenSlideOut(!openSlideOut);
    setAnchor("right");
  }

  return (
    <Grid container>
      {serviceCategories.map((item, index) => (
        <Box pr={1} mt={0} key={index}>
          <ErrorBoundary>
            <Widget
              label={item.name}
              editIcon={<EditIcon className={classes.icon} />}
              handleIconClick={viewDetails}
              values={item}
            />
          </ErrorBoundary>
        </Box>
      ))}
      <Box pl={1} className={classes.add}>
        <AddIcon onClick={handleAdd} fontSize={"large"} />
      </Box>
      <SlideOutDrawer
        handleToggleDrawer={handleToggleDrawer}
        open={openSlideOut}
        anchor={anchor}
        title={details ? null : "Add New Service Category"}
      >
        {detailsLoading && <Loading />}
        {!detailsLoading && !details && (
          <ErrorBoundary>
            <ServiceCategoryForm closeSlideOut={handleToggleDrawer} />
          </ErrorBoundary>
        )}
        {!detailsLoading && details && (
          <div>
            <ErrorBoundary>
              <Details
                data={selectedItem}
                closeSlideOut={handleToggleDrawer}
                loading={detailsLoading}
              ></Details>
            </ErrorBoundary>
            <Grid item xs={12}>
              <Box p={1} mt={16}>
                <Grid container spacing={1}>
                  <Grid item className={classes.cancel}>
                    <Button
                      className={classes.closeButton}
                      onClick={handleToggleDrawer}
                      variant="text"
                      color="default"
                      size="small"
                    >
                      Close
                    </Button>
                  </Grid>
                  <Grid item className={classes.submit}>
                    <Button
                      className={classes.submitButton}
                      color="secondary"
                      variant="contained"
                      size="small"
                    >
                      Edit
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </div>
        )}
      </SlideOutDrawer>
    </Grid>
  );
};

export default Category;
