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

  return response.json([ads])
})

app.get('/ads/:id/discord', (request, response) => {
  //const adId = request.params.id;

  return response.json([])
})

app.listen(3333)