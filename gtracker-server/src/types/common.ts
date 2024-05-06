export type Point = {
    lat: number,
    lng: number,
}

export enum DeliveryStatus {
    open = "open",
    pickedUp = "picked-up",
    inTransit = "in-transit",
    delivered = "delivered",
    failed = "failed"
  }