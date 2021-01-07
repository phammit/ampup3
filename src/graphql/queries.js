/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCatalogItem = /* GraphQL */ `
  query GetCatalogItem($id: ID!) {
    getCatalogItem(id: $id) {
      id
      title
      description
      reservePriceEnabled
      image
      createdAt
      updatedAt
    }
  }
`;
export const listCatalogItems = /* GraphQL */ `
  query ListCatalogItems(
    $filter: ModelcatalogItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCatalogItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        description
        reservePriceEnabled
        image
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
