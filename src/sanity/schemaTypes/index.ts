import { type SchemaTypeDefinition } from 'sanity'
import { portfolioType } from './portfolioType'
import { testimonialType } from './testimonialType'
import { newsType } from './newsType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [portfolioType, testimonialType, newsType],
}
