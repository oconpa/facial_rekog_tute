import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  text: {
      fontSize: '12px'
  },
  nope: {
    padding: 20
  }
}));

export default function SimpleAccordion(props) {
  console.log(props.data)
  const classes = useStyles();

  return (
      props.data ?
    <div className={classes.root}>
     {props.data.map((element, index) => {
         return (
           <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>Face Detection {index + 1}</Typography>
            </AccordionSummary>
            
            <AccordionDetails style={{fontSize: "10px"}}>
              <Typography className={classes.text}>
                Confidence: {element.Confidence}<br />
                Location: 
                    <li>Height: {element.BoundingBox.Height}</li>
                    <li>Left: {element.BoundingBox.Left}</li>
                    <li>Top: {element.BoundingBox.Top}</li>
                    <li>Width: {element.BoundingBox.Width}</li>
                { (element.Emotions.length > 0) ?
                    <p>
                    Emotion:
                        <li>Type: {element.Emotions[0].Type}</li>
                        <li>Confidence: {element.Emotions[0].Confidence}</li>
                    </p>
                    :
                    null
                }
                <p>
                Smile: 
                    <li>{element.Smile.Value.toString()}</li>
                    <li>Confidence: {element.Smile.Confidence}</li>
                </p>
                <p>
                MouthOpen: 
                    <li>{element.MouthOpen.Value.toString()}</li>
                    <li>Confidence: {element.MouthOpen.Confidence}</li>
                </p>
                <p>
                Mustache: 
                    <li>{element.Mustache.Value.toString()}</li>
                    <li>Confidence: {element.Mustache.Confidence}</li>
                </p>
                <p>
                EyesOpen:
                    <li>{element.EyesOpen.Value.toString()}</li>
                    <li>Confidence: {element.EyesOpen.Confidence}</li>
                </p>
                <p>
                Sunglasses: 
                    <li>{element.Sunglasses.Value.toString()}</li>
                    <li>Confidence: {element.Sunglasses.Confidence}</li>
                </p>
              </Typography>
            </AccordionDetails>
           </Accordion>
         )
     })}
    </div>
    :
    <div className={classes.nope}>No facial detections in the selected image</div>
  );
}
