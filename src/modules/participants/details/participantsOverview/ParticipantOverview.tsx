import React, { useEffect, useState } from "react";
import { get } from "../../../../utils/ajax";
import { IParticipant } from "../../types";
import { remoteRoutes } from "../../../../data/constants";
import { useDispatch, useSelector } from "react-redux";
import { participantsConstants } from "../../../../data/redux/participants/reducer";
import { fakeContactPersons } from "../../fakeData";
import {
  EditIconButton,
  AddIconButton,
  DeleteIconButton
} from "../../../../components/EditIconButton";
import DetailView, { IRec } from "../../../../components/DetailView";
import DetailViewSimple from "../../../../components/DetailViewSimple";
import PersonIcon from "@material-ui/icons/PermIdentity";
import EditDialog from "../../../../components/EditDialog";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import SectionTitle from "../info/SectionTitle";
import ContactPersonForm from "./forms/ContactPersonForm";
import SlideOutDrawer from "../../../../components/SlideOutDrawer";
import { Anchor } from "../../../../data/types";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import DataLabel from "../../../../components/DataLabel";
import DataValue from "../../../../components/DataValue";
import clsx from "clsx";

interface IProps {
  data: IParticipant;
}

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
const setValue = (value: any) => {
  if (!value || value === "" || value === " ") {
    return "-";
  } else return value;
};
const generalContactInfoOne = (data: IParticipant): IRec[] => {
  return [
    {
      label: "Official Email",
      value: setValue(data.officialEmail)
    },
    {
      label: "Phone Number",
      value: setValue(data.phoneNumber[0].value)
    }
  ];
};
const generalContactInfoTwo = (data: IParticipant): IRec[] => {
  return [
    {
      label: "Primary Email",
      value: setValue(data.primaryEmail)
    },
    {
      label: "Phone Number",
      value: setValue(data.phoneNumber[1].value)
    }
  ];
};
const contactPersonsOne = (data: Array<any>): IRec[] => {
  return [
    {
      label: "",
      value: setValue(data[0].name) + ` (${setValue(data[0].role)})`
    },
    {
      label: "",
      value: setValue(data[0].phone.value) + ` / (${setValue(data[0].email)})`
    }
  ];
};
const contactPersonsTwo = (data: Array<any>): IRec[] => {
  return [
    {
      label: "",
      value: setValue(data[0].name) + ` (${setValue(data[0].role)})`
    },
    {
      label: "",
      value: setValue(data[0].phone.value) + ` / (${setValue(data[0].email)})`
    }
  ];
};
const ParticipantOverview = ({ data }: IProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [anchor, setAnchor] = useState<Anchor>("right");
  const [selected, setSelected] = useState<any | null>(null);
  const [openSlideOut, setOpenSlideOut] = useState(false);
  const contactPersons: any = useSelector(
    (state: any) => state.participants.contactPersons
  );
  const spacing = 5;
  const [dialog, setDialog] = useState(false);
  const [add, setAdd] = useState(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [deleteItem, setDeleteItem] = useState<boolean>(false);
  const [formData, setFormData] = useState<any | null>({
    name: "",
    role: "",
    phone: "",
    email: ""
  });
  const { id = "" } = data;
  useEffect(() => {
    get(
      `${remoteRoutes.contactPersons}/${data.id}`,
      resp =>
        dispatch({
          type: participantsConstants.contactPersonsFetchAll,
          payload: callContactPersons(2)
        }),
      undefined,
      () => {
        dispatch({
          type: participantsConstants.contactPersonsFetchAll,
          payload: callContactPersons(2)
        });
      }
    );
  }, [anchor]);
  function callContactPersons(length: number) {
    let tempcontactPersons = [];
    while (length > 0) {
      tempcontactPersons.push(fakeContactPersons());
      length = length - 1;
    }
    return tempcontactPersons;
  }
  function handleToggleDrawer(methodType?: string, actionData?: any) {
    setAnchor("right");
    if (methodType === "edit") {
      setOpenSlideOut(!openSlideOut);
      setFormData({
        name: actionData[0].value.substring(
          0,
          actionData[0].value.indexOf("(") - 1
        ),
        role: actionData[0].value.substring(
          actionData[0].value.indexOf("(") + 1,
          actionData[0].value.indexOf(")")
        ),
        phone: actionData[1].value.substring(
          0,
          actionData[1].value.indexOf("/") - 1
        ),
        email: actionData[1].value.substring(
          actionData[1].value.indexOf("(") + 1,
          actionData[1].value.length - 1
        )
      });
      setEdit(true);
      setAdd(false);
      setDeleteItem(false);
    } else if (methodType === "delete") {
      setDeleteItem(true);
      setFormData(null);
      setAdd(false);
      setEdit(false);
      dispatch({
        type: participantsConstants.participantsDeleteContactPerson,
        payload: callContactPersons(2)
      });
    } else {
      setOpenSlideOut(!openSlideOut);
      setAdd(true);
      setFormData(null);
      setEdit(false);
      setDeleteItem(false);
    }
  }

  const handleClose = () => {
    setDialog(false);
  };
  const generalContactColumnOne = generalContactInfoOne(data);
  const generalContactColumnTwo = generalContactInfoTwo(data);
  const contactPersonsColumns = [
    contactPersonsOne(callContactPersons(1)),
    contactPersonsTwo(callContactPersons(1))
  ];
  const bold = false;
  const noColon = true;
  return (
    <Grid container spacing={1} style={{ marginBottom: 15 }}>
      <Grid item xs={12}>
        <Grid item xs={12} lg={12} md={12}>
          <Grid container spacing={spacing}>
            <Grid item lg={12} xs={12}>
              <Grid container spacing={1}>
                <Grid
                  item
                  container
                  direction="row"
                  lg={12}
                  justify="space-evenly"
                  spacing={5}
                >
                  <Grid item xs={6} lg={6} md={6} style={{ paddingLeft: 30 }}>
                    <Grid style={{ paddingLeft: 8 }}>
                      <SectionTitle
                        title="General Contact Overview"
                        icon={<PersonIcon fontSize="inherit" />}
                      />
                    </Grid>
                    <Divider />
                  </Grid>
                  <Grid item xs={6} lg={6} md={6} style={{ paddingLeft: 28 }}>
                    <SectionTitle
                      title="Contact Persons"
                      addButton={
                        contactPersons.length < 2 ? (
                          <AddIconButton onClick={handleToggleDrawer} />
                        ) : null
                      }
                      icon={<FormatListBulletedIcon fontSize="inherit" />}
                    />
                    <Divider />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container direction="row" style={{ paddingTop: 5 }}>
        <Grid item xs={6} container direction="row">
          <Grid item xs={6}>
            <Box style={{ paddingLeft: 30 }}>
              <DetailView data={generalContactColumnOne} noColon={noColon} />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box pl={5}>
              <DetailView data={generalContactColumnTwo} noColon={noColon} />
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={6} container direction="row">
          {contactPersonsColumns.map((contactPerson: any, index: number) => (
            <Grid
              container
              item
              xs={6}
              style={{ paddingLeft: index === 0 ? 8 : 0 }}
              direction="row"
              key={index}
            >
              <DetailViewSimple
                data={contactPerson}
                noColon={noColon}
                bold={bold}
                editButton={<EditIconButton />}
                deleteButton={<DeleteIconButton />}
                handleClickedItem={handleToggleDrawer}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
      {!deleteItem && (
        <SlideOutDrawer
          handleToggleDrawer={handleToggleDrawer}
          open={openSlideOut}
          anchor={anchor}
          title={add ? "New Contact Person" : "Edit Contact Person"}
        >
          <ContactPersonForm
            closeSlideOut={handleToggleDrawer}
            initialData={formData}
          ></ContactPersonForm>
        </SlideOutDrawer>
      )}
    </Grid>
  );
};
export default ParticipantOverview;
