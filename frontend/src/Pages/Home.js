import React from 'react'
import Typography from '@material-ui/core/Typography';

const Home = () => {
    return (
        <div style={{padding: 25}}>
            <Typography variant="h4" gutterBottom>
              Home
            </Typography>
            Home content can go here. Go free.
            <img alt='Home' style={{width: '96%', padding: '2%'}} src={'https://assets.entrepreneur.com/content/3x2/2000/20190914102314-CYBER22.jpeg'}/>
        </div>
    )
}

export default Home;