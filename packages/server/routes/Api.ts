import { Router } from 'express'

import { forumMessageRoute } from '../services/ForumMessage'
import { forumSectionRoute } from '../services/ForumSection'
import { forumTopicRoute } from '../services/ForumTopic'
import { proxyMiddleware } from '../middlewares'
import { errorHandler } from '../middlewares/errorHandler'

export const apiRoute = Router()

apiRoute
  .use('/forum/section', forumSectionRoute)
  .use('/forum/topic', forumTopicRoute)
  .use('/forum/message', forumMessageRoute)
  .use('/', proxyMiddleware)
  .use(errorHandler)
