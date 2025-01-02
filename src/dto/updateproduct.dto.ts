// /src/dto/updateproduct.dto.ts
// this file is just a simple type export for product data object that aids in data to object mapping and enables updation on the product collection
export type updateproductdto={
    name?:string,
    description?:string,
    currentLocation?:string,
    sourceLocation?:string,
    destinationLocation?:string
}