import React from 'react'
import {Card, CardContent, Typography} from '@material-ui/core'
import './App.css'

function InfoBox({title,isRed, active, cases, total, ...props}) {
    return (
            <Card className={`InfoBox__main ${active && 'InfoBox--selected'} ${isRed && 'InfoBox--red'}`} onClick={props.onClick}>
                <CardContent> <Typography className="InfoBox__title" color="textSecondary">{title}</Typography> 
                <h2 className={`InfoBox__cases ${!isRed && 'InfoBox--cases--green'}`}>+ {cases}</h2>
                <Typography className="InfoBox__total" color="textPrimary" >{total}</Typography> </CardContent>   
            </Card>
    )
}
export default InfoBox
