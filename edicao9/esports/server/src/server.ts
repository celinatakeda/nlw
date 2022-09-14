//const express = require('express');
//Usando o module substituindo o de cima
import express from 'express'
import { PrismaClient } from '@prisma/client'

const app = express()
const prisma = new PrismaClient({
  log: ['query']
})

// HTTP methods / API RESTful / HTTP Codes

app.get('/games', async (request, response) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        }
      }
    }
  })

  return response.json([games]);
})

app.post('/ads', (request, response) => {
  return response.status(201).json([]);
})

// concatenação de recursos
app.get('/games/:id/ads', async (request, response) => {
  const gameId = request.params.id;

  //return response.send(gameId);

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hoursStart: true,
      hourEnd: true,      
    },
    where: {
      gameId,
    },
    orderBy: {
      createAt: 'desc',
    }
  })

  return response.json(ads.map(ad => {
    return { 
      ...ad,
      weekDays: ad.weekDays.split(',')
    }
  }))
})

app.get('/ads/:id/discord', async (request, response) => {
  const adId = request.params.id;

  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      id: adId,
    }
  })

  return response.json({
    discord: ad.discord,
  })
})

app.listen(3333)