import React from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const Course = () => {
    console.log()
    return(
        <div>
            <Card >
                <CardMedia style={{height: 0, paddingTop: '56.25%'}}
                image={'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png'}
                title={'yesy'}
                />
                <CardContent>
                <Typography gutterBottom variant="headline" component="h2">
                    {'google'}
                </Typography>
                <Typography component="p">
                    {'description'}
                </Typography>
                </CardContent>
                <CardActions>
                <Button size="small" color="primary" href={'www.google.com'} target="_blank">
                    Go To Course
                </Button>
                </CardActions>
            </Card>
        </div>
    )
}
export default Course
