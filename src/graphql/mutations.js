/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCatalogItem = /* GraphQL */ `
  mutation CreateCatalogItem(
    $input: CreateCatalogItemInput!
    $condition: ModelcatalogItemConditionInput
  ) {
    createCatalogItem(input: $input, condition: $condition) {
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
export const updateCatalogItem = /* GraphQL */ `
  mutation UpdateCatalogItem(
    $input: UpdateCatalogItemInput!
    $condition: ModelcatalogItemConditionInput
  ) {
    updateCatalogItem(input: $input, condition: $condition) {
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
export const deleteCatalogItem = /* GraphQL */ `
  mutation DeleteCatalogItem(
    $input: DeleteCatalogItemInput!
    $condition: ModelcatalogItemConditionInput
  ) {
    deleteCatalogItem(input: $input, condition: $condition) {
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
