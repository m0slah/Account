import React, { useState } from 'react'

import classes from '../Home/Home.module.css'

import Card from '../UI/Card'

function Home() {
  return (
    <Card className={classes.home}>Welcome Back!</Card>
  )
}

export default Home