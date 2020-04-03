import React, {Fragment} from 'react';
import {Grid} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import DetailView, {IRec} from "../../../../../../components/DetailView";
import {printDateTime, printDate} from "../../../../../../utils/dateHelpers";
import  {printFormattedMoney} from "../../../../../../utils/numberHelpers";
import {IPaymentDetails} from "../../../../types";


interface IProps {
    data: IPaymentDetails
}

const Summary = ({data}: IProps) => {
    const fields: IRec[] = [
        {
            label: 'Payment Date',
            value: printDateTime(data.paymentDate)
        },
        {
            label: 'Payment Type',
            value: data.paymentType
        },
        {
            label: 'Amount',
            value: printFormattedMoney(data.amount)
        },
        {
            label: 'Date of Entry',
            value: printDateTime(data.dateOfEntry)
        },
        {
            label: 'Entered By',
            value: data.enteredBy
        },
        {
            label: 'Ref.Number',
            value: data.referenceNumber
        },

    ]

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <div>
                    <DetailView data={fields}/>
                </div>
            </Grid>

        </Grid>
    );
}



export default Summary;
