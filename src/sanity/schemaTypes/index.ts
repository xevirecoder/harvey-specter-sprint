import { type SchemaTypeDefinition } from 'sanity'
import { portfolioType } from './portfolioType'
import { testimonialType } from './testimonialType'
import { newsType } from './newsType'
import { serviceType } from './serviceType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [portfolioType, testimonialType, newsType, serviceType],
}
