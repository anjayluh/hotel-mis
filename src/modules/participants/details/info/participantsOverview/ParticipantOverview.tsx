import React, { useEffect, useState } from "react";
import { get } from "../../../../../utils/ajax";
import { IContactPerson } from "../../../types";
import { IParticipant } from "../../../types";
import { remoteRoutes } from "../../../../../data/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  participantsConstants,
  IParticipantsState
} from "../../../../../data/redux/participants/reducer";
import { fakeContactPersons } from "../../../fakeData";
import {
  EditIconButton,
  AddIconButton,
  DeleteIconButton
} from "../../../../../components/EditIconButton";
import DetailView, { IRec } from "../../../../../components/DetailView";
import DetailViewSimple from "../../../../../components/DetailViewSimple";
import PersonIcon from "@material-ui/icons/PermIdentity";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Loading from "../../../../../components/Loading";
import SectionTitle from "../../info/SectionTitle";
import ContactPersonForm from "./forms/ContactPersonForm";
import SlideOutDrawer from "../../../../../components/SlideOutDrawer";
import { IState, Anchor } from "../../../../../data/types";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

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
    },
  })
);
const setValue = (value: any) => {
  if (!value || value === "" || value === " ") {
    return "-";
  } else return value;
};
// <<<<<<< Updated upstream
// const officialContactInfo = (data: IParticipant): IRec[] => {
// ||||||| merged common ancestors
// const generalContactInfoOne = (data: IParticipant): IRec[] => {
// =======
const officialContactInfo = (data: IParticipant): IRec[] => {
  const officialEmail = data.emails.filter(email => email.isPrimary === false);
  const officialPhone = data.phones.filter(phone => phone.isPrimary === false);

  return [
    {
      label: "Official Email",
      value: officialPhone.length > 0 && setValue(officialEmail[0].value)
    },
    {
      label: "Phone Number",
      value: officialEmail.length > 0 && setValue(officialPhone[0].value)
    }
    // {
    //   label: "Phone Number",
    //   value: !data.emails[0].isPrimary && setValue(data.phones[0].value)
    // }
  ];
};

const primaryContactInfo = (data: IParticipant): IRec[] => {
  const primaryEmail = data.emails.filter(email => email.isPrimary);
  const primaryPhone = data.phones.filter(phone => phone.isPrimary);

  return [
    {
      label: "Primary Email",
      value: primaryEmail.length > 0 && setValue(primaryEmail[0].value)
    },
    {
      label: "Phone Number",
      value: primaryPhone.length > 0 && setValue(primaryPhone[0].value)
    }
  ];
};
const contactToRecords = (data: IContactPerson): IRec[] => {
  return [
    {
      label: "",
      value: setValue(data.name) + ` (${setValue(data.role)})`
    },
    {
      label: "",
      value: setValue(data.phone.value) + ` / (${setValue(data.email)})`
    }
  ];
};
const ParticipantOverview = ({ data }: IProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [anchor, setAnchor] = useState<Anchor>("right");
  const [selected, setSelected] = useState<any | null>(null);
  const [openSlideOut, setOpenSlideOut] = useState(false);
  const { contactPersons }: IParticipantsState = useSelector(
    (state: IState) => state.participants
  );
  const spacing = 5;
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
      `${remoteRoutes.contactPersons}`,
      resp =>
        dispatch({
          type: participantsConstants.contactPersonsFetchAll,
          payload: generateContactPersons(2)
        }),
      undefined,
      () => {
        dispatch({
          type: participantsConstants.contactPersonsFetchAll,
          payload: generateContactPersons(2)
        });
      }
    );
  }, [dispatch]);
  function generateContactPersons(length: number) {
    let tempcontactPersons = [];
    while (length > 0) {
      tempcontactPersons.push(fakeContactPersons());
      length = length - 1;
    }
    return tempcontactPersons;
  }
  function handleToggleDrawer(methodType?: string, actionData?: any) {
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
      const contact = contactPersons.filter(function(contact) {
        return (
          contact.name !==
          actionData[0].value.substring(0, actionData[0].value.indexOf("(") - 1)
        );
      });
      dispatch({
        type: participantsConstants.participantsDeleteContactPerson,
        payload: contact[0]
      });
    } else {
      setOpenSlideOut(!openSlideOut);
      setAdd(true);
      setFormData(null);
      setEdit(false);
      setDeleteItem(false);
    }
  }

  const officialContactColumn = officialContactInfo(data);
  const primaryContactColumn = primaryContactInfo(data);
  const contactPersonsColumns: IRec[][] = [];
  contactPersons.forEach(contact => {
    contactPersonsColumns.push(contactToRecords(contact));
  });
  const bold = false;
  const noColon = true;
  return (
      <Grid container direction="row" spacing={5} justify="space-between" style={{ marginBottom: 15 }}>
        <Grid container item xs={12} lg={6}>
          <Grid item xs={12} style={{ paddingLeft: 8, paddingRight: 8 }}>
            <Grid style={{ paddingLeft: 0 }}>
              <SectionTitle
                  title="General Contact Overview"
                  icon={<PersonIcon fontSize="inherit" />}
              />
            </Grid>
            <Divider />
          </Grid>
          <Grid item container direction="row" justify="space-between" xs={8} md={10} lg={12}>
            <Grid item xs={6} style={{ overflowWrap: 'anywhere'}}>
             <Box style={{ paddingLeft: 8 }}>
              <DetailView data={officialContactColumn} noColon={noColon} />
             </Box>
           </Grid>
            <Grid item xs={6} style={{ overflowWrap: 'anywhere'}}>
              <Box style={{ paddingLeft: 8 }}>
                 <DetailView data={primaryContactColumn} noColon={noColon} />
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid container item  xs={12} lg={6}>
          <Grid item xs={12} style={{ paddingLeft: 8, paddingRight: 8 }}>
            <Grid>
               <SectionTitle
                  title="Contact Persons"
                  addButton={
                    contactPersons.length < 2 ? (
                      <AddIconButton onClick={handleToggleDrawer} />
                    ) : null
                  }
                  icon={<FormatListBulletedIcon fontSize="inherit" />}
                />
            </Grid>
            <Divider />
          </Grid>
          <Grid item container direction="row" justify="space-between" xs={8} md={10}  lg={12}>
            {contactPersons.length ? (
               contactPersonsColumns.map((contactPerson: any, index: number) => (
                 <Grid
                   container
                   item
                   xs={6}
                   style={{ paddingLeft: 0 }}
                   direction="row"
                   key={index}
                 >
                   <DetailViewSimple
                     data={contactPerson}
                     noColon={noColon}
                     bold={bold}
                     editButton={<EditIconButton />}
                     deleteButton={
                       contactPersons.length > 1 ? <DeleteIconButton /> : null
                     }
                     handleClickedItem={handleToggleDrawer}
                   />
                 </Grid>
               ))
             ) : (
               <Loading />
            )}
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
  // return (
  //   <Grid container style={{ marginBottom: 15 }}>
  //     <Grid item xs={12}>
  //       <Grid item xs={12} lg={12} md={12}>
  //         <Grid container spacing={spacing}>
  //           <Grid item lg={12} xs={12}>
  //             <Grid container spacing={1}>
  //               <Grid
  //                 item
  //                 container
  //                 direction="row"
  //                 justify="space-evenly"
  //                 spacing={5}
  //               >
  //                 <Grid item xs={6} lg={6} md={6} style={{ paddingLeft: 25 }}>
  //                   <Grid style={{ paddingLeft: 0 }}>
  //                     <SectionTitle
  //                       title="General Contact Overview"
  //                       icon={<PersonIcon fontSize="inherit" />}
  //                     />
  //                   </Grid>
  //                   <Divider />
  //                 </Grid>
  //                 <Grid item xs={6} lg={6} md={6} style={{ paddingLeft: 28, paddingRight: 36, marginRight: -12,}} >
  //                   <Grid>
  //                     <SectionTitle
  //                       title="Contact Persons"
  //                       addButton={
  //                         contactPersons.length < 2 ? (
  //                           <AddIconButton onClick={handleToggleDrawer} />
  //                         ) : null
  //                       }
  //                       icon={<FormatListBulletedIcon fontSize="inherit" />}
  //                     />
  //                   </Grid>
  //                   <Divider />
  //                 </Grid>
  //               </Grid>
  //             </Grid>
  //           </Grid>
  //         </Grid>
  //       </Grid>
  //     </Grid>
  //     <Grid container direction="row" style={{ paddingTop: 5 }} spacing={5} justify="space-between">
  //       <Grid item xs={6} container direction="row" justify="space-between">
  //         <Grid item xs={6} style={{ overflowWrap: 'anywhere'}}>
  //           <Box style={{ paddingLeft: 8 }}>
  //             <DetailView data={officialContactColumn} noColon={noColon} />
  //           </Box>
  //         </Grid>
  //         <Grid item xs={6} style={{ overflowWrap: 'anywhere'}}>
  //           <Box>
  //             <DetailView data={primaryContactColumn} noColon={noColon} />
  //           </Box>
  //         </Grid>
  //       </Grid>
  //       <Grid item xs={6} container direction="row">
  //         {contactPersons.length ? (
  //           contactPersonsColumns.map((contactPerson: any, index: number) => (
  //             <Grid
  //               container
  //               item
  //               xs={6}
  //               style={{ paddingLeft: index === 0 ? 8 : 0 }}
  //               direction="row"
  //               key={index}
  //             >
  //               <DetailViewSimple
  //                 data={contactPerson}
  //                 noColon={noColon}
  //                 bold={bold}
  //                 editButton={<EditIconButton />}
  //                 deleteButton={
  //                   contactPersons.length > 1 ? <DeleteIconButton /> : null
  //                 }
  //                 handleClickedItem={handleToggleDrawer}
  //               />
  //             </Grid>
  //           ))
  //         ) : (
  //           <Loading />
  //         )}
  //       </Grid>
  //     </Grid>
  //     {!deleteItem && (
  //       <SlideOutDrawer
  //         handleToggleDrawer={handleToggleDrawer}
  //         open={openSlideOut}
  //         anchor={anchor}
  //         title={add ? "New Contact Person" : "Edit Contact Person"}
  //       >
  //         <ContactPersonForm
  //           closeSlideOut={handleToggleDrawer}
  //           initialData={formData}
  //         ></ContactPersonForm>
  //       </SlideOutDrawer>
  //     )}
  //   </Grid>
  // );
};
export default ParticipantOverview;
