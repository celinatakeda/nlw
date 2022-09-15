//const express = require('express');
//Usando o module substituindo o de cima
import express from 'express'
import cors from 'cors'

import { PrismaClient } from '@prisma/client'
import { convetHoursStringToMinutes } from './utils/convert-hour-string-to-minutes';
import { convetMinutesToHourString } from './utils/convert-minutes-to-hour-string';

const app = express()

app.use(express.json());
app.use(cors()); // deixou aberto 

/* Esse seria o correto em produção
- Permite apenas esse domínio fazer requisições no backend

app.use(cors({
  origin: 'http://rocketseat.com.br'
})); 
*/

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

  return response.json(games);
})

app.post('/games/:id/ads', async (request, response) => {
  const gameId = request.params.id;
  const body = request.body;

   // Validação

  const ad = await prisma.ad.create({
    data: {
      gameId,
      name: body.name,
      yearsPlaying: body.yearsPlaying,
      discord: body.discord,
      weekDays: body.weekDays.join(','),
      hoursStart: convetHoursStringToMinutes(body.hoursStart),
      hourEnd:  convetHoursStringToMinutes(body.hourEnd),
      useVoiceChannel: body.useVoiceChannel,
    }
  })

  return response.status(201).json(ad);
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
      weekDays: ad.weekDays.split(','),
      hoursStart: convetMinutesToHourString(ad.hoursStart),
      hourEnd: convetMinutesToHourString(ad.hourEnd),
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