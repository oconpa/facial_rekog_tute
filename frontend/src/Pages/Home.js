import React from 'react'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import Course from './Course'

const Home = () => {
    const courses = ['1', 'next']
    
    return (
        <div>
            <div>
                <TextField style={{padding: 24}}
                    id="searchInput"
                    placeholder="Search for Courses"   
                    margin="normal"
                    />
                <Grid container spacing={24} style={{padding: 24}}>
                    { courses.map(currentCourse => (
                        <Grid item xs={12} sm={6} lg={4} xl={3}>
                            <Course course={currentCourse} />
                        </Grid>
                    ))}
                </Grid>
            </div>
        </div>
    )
}

export default Home;